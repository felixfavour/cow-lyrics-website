export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const config = useRuntimeConfig()

  try {
    const params = new URLSearchParams()

    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null) {
        params.append(key, String(value))
      }
    }

    const url = `${config.public.apiBaseUrl}/api/v1/public-songs/random${params.toString() ? '?' + params.toString() : ''}`

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
    return { error: 'Failed to fetch recent songs', details: error instanceof Error ? error.message : 'Unknown error' }
  }
})