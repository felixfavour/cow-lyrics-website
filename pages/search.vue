<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Search Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Search Songs</h1>
        
        <!-- Search Input -->
        <div class="flex flex-col md:flex-row gap-4 mb-6">
          <UInput
            v-model="searchQuery"
            placeholder="Search songs, artists, lyrics..."
            icon="i-heroicons-magnifying-glass"
            size="xl"
            class="flex-1"
            @keyup.enter="performSearch"
          />
          <UButton color="primary" size="xl" @click="performSearch">
            Search
          </UButton>
        </div>

        <!-- Filters -->
        <div class="flex flex-wrap gap-4">
          <USelectMenu
            v-model="filters.sortBy"
            :options="sortOptions"
            placeholder="Sort by"
            @change="performSearch"
          />
          <USelectMenu
            v-model="filters.genre"
            :options="genreOptions"
            placeholder="Genre"
            @change="performSearch"
          />
          <UButton
            variant="ghost"
            color="gray"
            @click="clearFilters"
          >
            Clear Filters
          </UButton>
        </div>
      </div>

      <!-- Results -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <USkeleton
          v-for="i in 8"
          :key="i"
          class="h-48 rounded-lg"
        />
      </div>

      <div v-else-if="searchResults.length > 0">
        <div class="mb-6">
          <p class="text-gray-600 dark:text-gray-400">
            Found {{ totalResults }} results for "{{ searchQuery }}"
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          <SongCard
            v-for="song in searchResults"
            :key="song.id"
            :song="song"
            :search-query="searchQuery"
          />
        </div>

        <!-- Pagination -->
        <div class="flex justify-center">
          <UPagination
            v-model="currentPage"
            :page-count="pageSize"
            :total="totalResults"
            @update:model-value="handlePageChange"
          />
        </div>
      </div>

      <div v-else-if="!loading && searchQuery" class="text-center py-12">
        <UIcon name="i-heroicons-musical-note" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-2">No songs found</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Try searching with different keywords or check your spelling
        </p>
        <UButton color="primary" to="/add-song">
          Add This Song
        </UButton>
      </div>

      <!-- Initial State -->
      <div v-else class="text-center py-12">
        <UIcon name="i-heroicons-magnifying-glass" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-2">Search for worship songs</h3>
        <p class="text-gray-600 dark:text-gray-400">
          Enter a song title, artist name, or lyrics to get started
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// URL Query management
const route = useRoute()
const router = useRouter()

// SEO Meta
useSeoMeta({
  title: 'Search Songs',
  description: 'Search through thousands of Christian worship song lyrics. Find songs by title, artist, or lyrics content.',
  ogTitle: 'Search Worship Songs | Cloud of Worship Lyrics'
})

// Reactive data
const searchQuery = ref(route.query.q as string || '')
const loading = ref(false)
const searchResults = ref([])
const totalResults = ref(0)
const currentPage = ref(1)
const pageSize = 20

// Filters
const filters = ref({
  sortBy: 'relevance',
  genre: ''
})

const sortOptions = [
  { label: 'Relevance', value: 'relevance' },
  { label: 'Newest First', value: 'newest' },
  { label: 'A-Z', value: 'alphabetical' },
  { label: 'Most Popular', value: 'popular' }
]

const genreOptions = [
  { label: 'All Genres', value: '' },
  { label: 'Contemporary', value: 'contemporary' },
  { label: 'Traditional', value: 'traditional' },
  { label: 'Gospel', value: 'gospel' },
  { label: 'Hymns', value: 'hymns' }
]

const { searchSongs } = useSongs()

// Methods
const performSearch = async () => {
  if (!searchQuery.value.trim()) return
  
  loading.value = true
  
  try {
    const params = {
      q: searchQuery.value,
      page: currentPage.value,
      limit: pageSize,
      sortBy: filters.value.sortBy,
      genre: filters.value.genre
    }
    
    const response = await searchSongs(params)
    searchResults.value = response.data
    totalResults.value = response.total
    
    // Update URL
    await router.push({
      query: {
        q: searchQuery.value,
        page: currentPage.value > 1 ? currentPage.value : undefined,
        sort: filters.value.sortBy !== 'relevance' ? filters.value.sortBy : undefined,
        genre: filters.value.genre || undefined
      }
    })
  } catch (error) {
    console.error('Search error:', error)
    const toast = useToast()
    toast.add({
      title: 'Search Error',
      description: 'Failed to search songs. Please try again.',
      color: 'red'
    })
  } finally {
    loading.value = false
  }
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  performSearch()
}

const clearFilters = () => {
  filters.value = {
    sortBy: 'relevance',
    genre: ''
  }
  currentPage.value = 1
  performSearch()
}

// Initialize search on mount if query exists
onMounted(() => {
  if (searchQuery.value) {
    // Set filters from URL
    if (route.query.sort) {
      filters.value.sortBy = route.query.sort as string
    }
    if (route.query.genre) {
      filters.value.genre = route.query.genre as string
    }
    if (route.query.page) {
      currentPage.value = parseInt(route.query.page as string)
    }
    
    performSearch()
  }
})
</script>