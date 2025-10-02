import Fuse from 'fuse.js'

export const useSongs = () => {
  // Get recent songs from Nuxt Content
  const getRecentSongs = async (limit = 20) => {
    try {
      const songs = await queryContent('songs')
        .where({ is_public: { $ne: false } })
        .sort({ created_at: -1 })
        .limit(limit)
        .find()

      return { data: songs }
    } catch (error) {
      console.error('Failed to fetch recent songs:', error)
      return { data: [] }
    }
  }

  // Get popular artists based on song count
  const getPopularArtists = async (limit = 10) => {
    try {
      const songs = await queryContent('songs')
        .where({ is_public: { $ne: false } })
        .only(['artist'])
        .find()

      // Group by artist and count songs
      const artistCounts = songs.reduce((acc: Record<string, number>, song: any) => {
        acc[song.artist] = (acc[song.artist] || 0) + 1
        return acc
      }, {})

      // Convert to artist objects and sort by song count
      const artists = Object.entries(artistCounts)
        .map(([name, songCount]) => ({
          id: slugify(name),
          name,
          slug: slugify(name),
          songCount,
          imageUrl: `/artists/${slugify(name)}.jpg` // Placeholder
        }))
        .sort((a, b) => b.songCount - a.songCount)
        .slice(0, limit)

      return { data: artists }
    } catch (error) {
      console.error('Failed to fetch popular artists:', error)
      return { data: [] }
    }
  }

  // Search songs with fuzzy search
  const searchSongs = async (params: any) => {
    try {
      const { q = '', page = 1, limit = 20, sortBy = 'relevance' } = params
      
      if (!q.trim()) {
        return {
          data: [],
          total: 0,
          page: 1,
          limit,
          totalPages: 0
        }
      }

      // Get all songs first
      const allSongs = await queryContent('songs')
        .where({ is_public: { $ne: false } })
        .find()

      // Prepare songs for search (add body content for lyrics search)
      const searchableSongs = allSongs.map((song: any) => ({
        ...song,
        lyrics: song.body?.children
          ?.filter((child: any) => child.type === 'text' || (child.children && child.children.some((c: any) => c.type === 'text')))
          .map((child: any) => {
            if (child.type === 'text') return child.value
            return child.children?.filter((c: any) => c.type === 'text').map((c: any) => c.value).join(' ') || ''
          })
          .join(' ') || '',
        searchableContent: `${song.title} ${song.artist} ${song.album || ''} ${song.tags?.join(' ') || ''}`.toLowerCase()
      }))

      // Configure Fuse.js for fuzzy search
      const fuseOptions = {
        includeScore: true,
        includeMatches: true,
        threshold: 0.4, // 0.0 = perfect match, 1.0 = match anything
        keys: [
          {
            name: 'title',
            weight: 0.4
          },
          {
            name: 'artist',
            weight: 0.3
          },
          {
            name: 'lyrics',
            weight: 0.2
          },
          {
            name: 'album',
            weight: 0.05
          },
          {
            name: 'tags',
            weight: 0.05
          }
        ],
        // Advanced options
        ignoreLocation: true,
        findAllMatches: true,
        minMatchCharLength: 2
      }

      const fuse = new Fuse(searchableSongs, fuseOptions)
      const results = fuse.search(q)

      // Extract and sort results
      let searchResults = results.map((result: any) => ({
        ...result.item,
        _score: result.score,
        _matches: result.matches
      }))

      // Apply sorting
      switch (sortBy) {
        case 'newest':
          searchResults.sort((a: any, b: any) => {
            const dateA = new Date(a.created_at || '1970-01-01')
            const dateB = new Date(b.created_at || '1970-01-01')
            return dateB.getTime() - dateA.getTime()
          })
          break
        case 'alphabetical':
          searchResults.sort((a: any, b: any) => a.title.localeCompare(b.title))
          break
        case 'popular':
          // For now, sort by score (relevance) as we don't have popularity data
          searchResults.sort((a: any, b: any) => (a._score || 0) - (b._score || 0))
          break
        case 'relevance':
        default:
          // Already sorted by relevance (Fuse.js score)
          break
      }

      // Apply pagination
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedResults = searchResults.slice(startIndex, endIndex)

      return {
        data: paginatedResults,
        total: searchResults.length,
        page: parseInt(page.toString()),
        limit: parseInt(limit.toString()),
        totalPages: Math.ceil(searchResults.length / limit)
      }
    } catch (error) {
      console.error('Failed to search songs:', error)
      return {
        data: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0
      }
    }
  }

  // Get song by slug
  const getSongBySlug = async (slug: string) => {
    try {
      const song = await queryContent('songs')
        .where({ slug: slug, is_public: { $ne: false } })
        .findOne()

      if (!song) {
        throw new Error('Song not found')
      }

      return song
    } catch (error) {
      console.error('Failed to fetch song:', error)
      throw error
    }
  }

  // Get stats
  const getStats = async () => {
    try {
      const songs = await queryContent('songs')
        .where({ is_public: { $ne: false } })
        .only(['artist', 'created_at'])
        .find()

      const uniqueArtists = new Set(songs.map((song: any) => song.artist))
      const thisMonth = new Date()
      thisMonth.setMonth(thisMonth.getMonth())

      const songsThisMonth = songs.filter((song: any) => {
        const createdAt = new Date(song.created_at)
        return createdAt >= thisMonth
      })

      return {
        totalSongs: songs.length,
        totalArtists: uniqueArtists.size,
        totalUsers: 1, // Static value for content-based approach
        songsThisMonth: songsThisMonth.length
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
      return {
        totalSongs: 0,
        totalArtists: 0,
        totalUsers: 0,
        songsThisMonth: 0
      }
    }
  }

  // Helper function to create URL-friendly slugs
  const slugify = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const addSong = async (songData: any) => {
    // For static content approach, songs need to be added as markdown files
    throw new Error('Adding songs requires creating markdown files in the content/songs directory')
  }

  return {
    getRecentSongs,
    getPopularArtists,
    searchSongs,
    getSongBySlug,
    addSong,
    getStats
  }
}