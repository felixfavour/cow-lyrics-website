export const useSongs = () => {
  const api = useApi()

  // Get popular artists from API
  const getPopularArtists = async (limit = 10) => {
    try {
      let artists = await api.getFeaturedArtists(limit)
      artists = artists?.data

      // Transform API response to match expected format
      const transformedArtists = artists.map((artist: any) => ({
        id: slugify(artist.artist),
        name: artist.artist,
        slug: slugify(artist.artist),
        songCount: artist.songCount,
      }))

      return { data: transformedArtists }
    } catch (error) {
      console.error('Failed to fetch popular artists:', error)
      return { data: [] }
    }
  }

  // Search songs using API
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

      let songs = await api.fuzzySearchSongs(q, { limit, page })
      songs = songs?.data

      // Transform API response to match expected format
      const transformedSongs = songs?.map((song: any) => ({
        ...song,
        slug: song.id,
        imageUrl: song.cover,
        tags: [],
        created_at: new Date().toISOString(),
        is_public: true
      }))

      return {
        data: transformedSongs,
        total: transformedSongs.length,
        page: parseInt(page.toString()),
        limit: parseInt(limit.toString()),
        totalPages: Math.ceil(transformedSongs.length / limit)
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

  // Get song by slug/id
  const getSongBySlug = async (slug: string) => {
    try {
      let song = await api.getPublicSong(slug)
      song = song?.[0]

      if (!song) {
        throw new Error('Song not found')
      }

      // Transform API response to match expected format
      return {
        ...song,
        slug: song.id,
        imageUrl: song.cover,
        tags: [],
        created_at: new Date().toISOString(),
        is_public: true
      }
    } catch (error) {
      console.error('Failed to fetch song:', error)
      throw error
    }
  }

  // Get recent songs from API (using random endpoint as proxy for recent)
  const getRecentSongs = async (limit = 20) => {
    try {
      let songs = await api.getRandomSongs(limit)
      songs = songs?.data

      // console.log('songs', songs)

      // Transform API response to match expected format
      const transformedSongs = songs.map((song: any) => ({
        ...song,
        slug: song.id,
        imageUrl: song.cover,
        tags: [],
        created_at: new Date().toISOString(),
        is_public: true
      }))

      return { data: transformedSongs }
    } catch (error) {
      console.error('Failed to fetch recent songs:', error)
      return { data: [] }
    }
  }

  const getTopLyricCreators = async (limit = 8) => {
    try {
      let creators = await api.getTopLyricCreators(limit)
      creators = creators?.data

      // console.log('creators', creators)

      return { data: creators }
    } catch (error) {
      console.error('Failed to fetch top lyric creators:', error)
      return { data: [] }
    }
  }

  // Get stats (using featured artists and top creators data)
  const getStats = async () => {
    try {
      let artists = await api.getFeaturedArtists(8) // Get all artists
      artists = artists?.data

      let creators = await api.getTopLyricCreators(8) // Get all creators
      creators = creators?.data

      const totalSongs = artists?.reduce((sum, artist) => sum + artist.songCount, 0)
      const totalArtists = artists.length
      const totalUsers = creators.length

      // Calculate songs this month (approximation since we don't have date info)
      const songsThisMonth = Math.floor(totalSongs * 0.05) // 5% approximation

      return {
        totalSongs,
        totalArtists,
        totalUsers,
        songsThisMonth
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
    throw new Error('Adding songs is not supported via the public API')
  }

  return {
    getRecentSongs,
    getPopularArtists,
    searchSongs,
    getSongBySlug,
    addSong,
    getStats,
    getTopLyricCreators
  }
}