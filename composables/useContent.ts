import type { Song } from '~/types'

export const useContentSongs = () => {
  const { $fetch } = useNuxtApp()

  // // Get recent songs
  // const getRecentSongs = async (limit = 20) => {
  //   try {
  //     const { data } = await $fetch<{ data: any[] }>('/api/songs/recent', {
  //       params: { limit }
  //     })

  //     return data.map(transformContentSong)
  //   } catch (error) {
  //     console.error('Failed to fetch recent songs:', error)
  //     return []
  //   }
  // }

  // // Get song by slug
  // const getSongBySlug = async (slug: string) => {
  //   try {
  //     const song = await $fetch<any>(`/api/songs/${slug}`)

  //     if (!song) {
  //       throw new Error('Song not found')
  //     }

  //     return transformContentSong(song)
  //   } catch (error) {
  //     console.error('Failed to fetch song:', error)
  //     throw error
  //   }
  // }

  // // Search songs
  // const searchSongs = async (params: any) => {
  //   try {
  //     const result = await $fetch<any>('/api/songs/search', {
  //       params
  //     })

  //     return {
  //       data: result.data.map(transformContentSong),
  //       total: result.total,
  //       page: result.page,
  //       limit: result.limit,
  //       totalPages: result.totalPages
  //     }
  //   } catch (error) {
  //     console.error('Failed to search songs:', error)
  //     return {
  //       data: [],
  //       total: 0,
  //       page: 1,
  //       limit: 20,
  //       totalPages: 0
  //     }
  //   }
  // }

  // // Get popular artists (based on song count)
  // const getPopularArtists = async (limit = 10) => {
  //   try {
  //     const artists = await $fetch<any[]>('/api/artists/popular', {
  //       params: { limit }
  //     })

  //     return artists
  //   } catch (error) {
  //     console.error('Failed to fetch popular artists:', error)
  //     return []
  //   }
  // }

  // // Get stats
  // const getStats = async () => {
  //   try {
  //     const stats = await $fetch<any>('/api/stats')
  //     return stats
  //   } catch (error) {
  //     console.error('Failed to fetch stats:', error)
  //     return {
  //       totalSongs: 0,
  //       totalArtists: 0,
  //       totalUsers: 0,
  //       songsThisMonth: 0
  //     }
  //   }
  // }

  // Helper function to transform content song
  const transformContentSong = (song: any): Song => {
    return {
      id: song.id || song._id,
      title: song.title,
      artist: song.artist,
      album: song.album,
      lyrics: song.body?.children ? extractLyricsFromBody(song.body) : '',
      body: song.body,
      slug: song.id || song._path?.replace('/songs/', ''),
      genre: song.genre,
      key: song.key,
      bpm: song.bpm,
      cover: song.cover,
      is_public: song.is_public,
      created_at: song.created_at,
      updated_at: song.updated_at,
      createdAt: song.created_at,
      updatedAt: song.updated_at,
      imageUrl: song.cover,
      tags: song.tags || [],
      _path: song._path,
      _id: song._id
    }
  }

  // Helper function to extract plain text lyrics from Nuxt Content body
  const extractLyricsFromBody = (body: any): string => {
    if (!body || !body.children) return ''

    const extractText = (node: any): string => {
      if (typeof node === 'string') return node
      if (node.type === 'text') return node.value || ''
      if (node.children) {
        return node.children.map(extractText).join('')
      }
      return ''
    }

    return body.children
      .map(extractText)
      .join('\n')
      .replace(/\n\s*\n/g, '\n\n') // Clean up extra whitespace
      .trim()
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

  return {
    getRecentSongs,
    getSongBySlug,
    searchSongs,
    getPopularArtists,
    getStats,
    transformContentSong
  }
}
