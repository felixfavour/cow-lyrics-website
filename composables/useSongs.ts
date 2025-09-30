export const useSongs = () => {
  const { $fetch } = useNuxtApp()
  const config = useRuntimeConfig()
  
  const getRecentSongs = async (limit = 20) => {
    try {
      return await $fetch(`${config.public.apiBaseUrl}/songs/recent`, {
        params: { limit }
      })
    } catch (error) {
      console.error('Failed to fetch recent songs:', error)
      return []
    }
  }
  
  const getPopularArtists = async (limit = 10) => {
    try {
      return await $fetch(`${config.public.apiBaseUrl}/artists/popular`, {
        params: { limit }
      })
    } catch (error) {
      console.error('Failed to fetch popular artists:', error)
      return []
    }
  }
  
  const searchSongs = async (params: any) => {
    try {
      return await $fetch(`${config.public.apiBaseUrl}/songs/search`, {
        params
      })
    } catch (error) {
      console.error('Failed to search songs:', error)
      throw error
    }
  }
  
  const getSongBySlug = async (slug: string) => {
    try {
      return await $fetch(`${config.public.apiBaseUrl}/songs/${slug}`)
    } catch (error) {
      console.error('Failed to fetch song:', error)
      throw error
    }
  }
  
  const addSong = async (songData: any) => {
    try {
      return await $fetch(`${config.public.apiBaseUrl}/songs`, {
        method: 'POST',
        body: songData
      })
    } catch (error) {
      console.error('Failed to add song:', error)
      throw error
    }
  }
  
  return {
    getRecentSongs,
    getPopularArtists,
    searchSongs,
    getSongBySlug,
    addSong
  }
}