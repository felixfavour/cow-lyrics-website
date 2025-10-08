export const useApi = () => {
  // Helper function to make API calls through our server proxy
  const apiFetch = async <T>(endpoint: string, options?: any): Promise<T> => {
    try {
      const response = await $fetch<T>(endpoint, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers
        }
      })
      return response
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error)
      throw error
    }
  }

  // Get featured artists
  // Response: Array of { songCount: number, artist: string }
  const getFeaturedArtists = async (limit?: number) => {
    try {
      const artists = await apiFetch<Array<{ songCount: number; artist: string }>>(
        '/api/artists/featured',
        { params: limit ? { limit } : undefined }
      )
      return artists
    } catch (error) {
      console.error('Failed to fetch featured artists:', error)
      return []
    }
  }

  // Get top lyric creators
  // Response: Array of { songsCreated: number, userId: string, fullname: string, avatar: string }
  const getTopLyricCreators = async (limit?: number) => {
    try {
      const creators = await apiFetch<Array<{
        songsCreated: number
        userId: string
        fullname: string
        avatar: string
      }>>('/api/creators/top', {
        params: limit ? { limit } : undefined
      })
      return creators
    } catch (error) {
      console.error('Failed to fetch top creators:', error)
      return []
    }
  }

  // Fuzzy search songs
  // Response: Array of song objects
  const fuzzySearchSongs = async (query: string, options?: { limit?: number; page?: number }) => {
    try {
      const songs = await apiFetch<Array<{
        lyrics: string
        title: string
        cover: string
        artist: string
        id: string
        createdBy: string
      }>>('/api/songs/search', {
        params: {
          query,
          ...options
        }
      })
      return songs
    } catch (error) {
      console.error('Failed to search songs:', error)
      return []
    }
  }

  // Get random songs
  // Response: Array of song objects
  const getRandomSongs = async (limit = 20) => {
    try {
      const songs = await apiFetch<Array<{
        lyrics: string
        title: string
        cover: string
        artist: string
        id: string
        createdBy: string
      }>>('/api/songs/recent', {
        params: { limit }
      })
      return songs
    } catch (error) {
      console.error('Failed to fetch random songs:', error)
      return []
    }
  }

  // Get public song by ID
  // Response: Single song object
  const getPublicSong = async (songId: string) => {
    try {
      const song = await apiFetch<{
        lyrics: string
        title: string
        cover: string
        artist: string
        id: string
        createdBy: string
      }>(`/api/songs/${songId}`)
      return song
    } catch (error) {
      console.error(`Failed to fetch song ${songId}:`, error)
      throw error
    }
  }

  return {
    getFeaturedArtists,
    getTopLyricCreators,
    fuzzySearchSongs,
    getRandomSongs,
    getPublicSong,
    apiFetch
  }
}
