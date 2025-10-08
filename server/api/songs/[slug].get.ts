export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const config = useRuntimeConfig()

  if (!slug) {
    return { error: 'Song ID is required' }
  }

  try {
    const url = `${config.public.apiBaseUrl}/api/v1/public-songs/${slug}`

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    return { error: 'Failed to fetch song', details: error instanceof Error ? error.message : 'Unknown error' }
  }
})