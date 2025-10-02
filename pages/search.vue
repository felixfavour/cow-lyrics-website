<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 relative overflow-hidden"
  >
    <!-- Background Effects -->
    <div
      class="absolute top-20 left-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl blob"
    ></div>
    <div
      class="absolute bottom-20 right-20 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl blob"
    ></div>
    <div
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-100/50 rounded-full blur-3xl blob"
    ></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <!-- Search Header -->
      <section class="mb-16 text-center">
        <div class="mb-8">
          <div
            class="inline-flex items-center px-4 py-2 rounded-full glass-card text-sm font-medium text-purple-700 mb-6"
          >
            <span
              class="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"
            ></span>
            Discover worship songs
          </div>
        </div>

        <h1 class="text-4xl lg:text-6xl font-bold mb-8 text-gray-800">
          Find Your
          <span class="gradient-text">Favorite Songs</span>
        </h1>

        <!-- Search Input -->
        <div class="max-w-3xl mx-auto mb-8">
          <div class="relative mb-6">
            <input
              v-model="searchQuery"
              placeholder="Search songs, artists, lyrics..."
              class="search-input text-lg"
              @keyup.enter="performSearch"
            />
            <button
              @click="performSearch"
              class="absolute right-4 top-1/2 transform -translate-y-1/2 btn-primary px-6 py-3"
            >
              <Icon name="heroicons:magnifying-glass" class="w-5 h-5 mr-2" />
              Search
            </button>
          </div>
        </div>
      </section>

      <!-- Results Section -->
      <section v-if="loading" class="py-12">
        <div class="glass-card p-6 mb-8">
          <div class="flex items-center justify-center">
            <div class="text-center">
              <div
                class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"
              ></div>
              <h2 class="text-xl font-bold text-gray-800 mb-2">Searching...</h2>
              <p class="text-gray-600">
                Finding the perfect worship songs for you
              </p>
            </div>
          </div>
        </div>

        <!-- Loading list skeleton -->
        <div class="space-y-3">
          <div v-for="i in 6" :key="i" class="glass-card p-4">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-gray-200 rounded-lg skeleton"></div>
              <div class="flex-1 space-y-2">
                <div class="h-4 bg-gray-200 rounded skeleton w-3/4"></div>
                <div class="h-3 bg-gray-200 rounded skeleton w-1/2"></div>
                <div class="flex space-x-2">
                  <div class="h-5 bg-gray-200 rounded-full skeleton w-16"></div>
                  <div class="h-5 bg-gray-200 rounded-full skeleton w-20"></div>
                </div>
              </div>
              <div class="w-20 h-8 bg-gray-200 rounded skeleton"></div>
            </div>
          </div>
        </div>
      </section>

      <section v-else-if="searchResults.length > 0" class="py-12">
        <!-- Results Header -->
        <div class="glass-card p-6 mb-8">
          <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div>
              <h2 class="text-2xl font-bold text-gray-800 mb-1">
                Search Results
              </h2>
              <p class="text-gray-600">
                Found {{ totalResults }} results for "{{ searchQuery }}"
              </p>
            </div>
            <div class="flex items-center gap-4">
              <!-- View toggle -->
              <!-- <div class="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  @click="viewMode = 'list'"
                  :class="[
                    'p-2 rounded-md transition-colors text-sm',
                    viewMode === 'list'
                      ? 'bg-white text-purple-600 shadow-sm'
                      : 'text-gray-600 hover:text-purple-600',
                  ]"
                  title="List view"
                >
                  <Icon name="heroicons:bars-3" class="w-4 h-4" />
                </button>
                <button
                  @click="viewMode = 'grid'"
                  :class="[
                    'p-2 rounded-md transition-colors text-sm',
                    viewMode === 'grid'
                      ? 'bg-white text-purple-600 shadow-sm'
                      : 'text-gray-600 hover:text-purple-600',
                  ]"
                  title="Grid view"
                >
                  <Icon name="heroicons:squares-2x2" class="w-4 h-4" />
                </button>
              </div> -->

              <!-- Sort options -->
              <div class="flex items-center gap-2 text-sm">
                <span class="text-gray-500">Sort by:</span>
                <select
                  v-model="filters.sortBy"
                  @change="performSearch"
                  class="glass-button px-3 py-1 text-sm font-medium focus-visible"
                >
                  <option
                    v-for="option in sortOptions"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Results List View -->
        <div v-if="viewMode === 'list'" class="space-y-3 mb-12">
          <NuxtLink
            v-for="(song, index) in searchResults"
            :key="song.id"
            :to="`/songs/${song.id}`"
            class="glass-card hover:shadow-lg transition-all duration-200 cursor-pointer song-list-item block"
            :style="{ animationDelay: `${index * 0.05}s` }"
          >
            <div class="p-4 flex items-center justify-between">
              <!-- Left section: Song info -->
              <div class="flex items-center space-x-4 flex-1 min-w-0">
                <!-- Song artwork/icon -->
                <div
                  class="flex-shrink-0 w-12 h-12 rounded-lg gradient-accent flex items-center justify-center"
                >
                  <Icon
                    v-if="!song.imageUrl"
                    name="heroicons:musical-note"
                    class="w-6 h-6 text-white"
                  />
                  <img
                    v-else
                    :src="song.imageUrl"
                    :alt="song.title"
                    class="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <!-- Song details -->
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-gray-900 truncate text-lg">
                    {{ song.title }}
                  </h3>
                  <p class="text-gray-600 truncate">
                    {{ song.artist }}
                  </p>

                  <!-- Tags -->
                  <div
                    v-if="song.tags && song.tags.length > 0"
                    class="flex items-center gap-1 mt-1"
                  >
                    <span
                      v-for="tag in song.tags.slice(0, 3)"
                      :key="tag"
                      class="inline-block px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full font-medium"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Right section: Actions and metadata -->
              <div class="flex items-center space-x-4">
                <!-- Quick actions -->
                <div class="flex items-center space-x-2">
                  <!-- View song button -->
                  <div
                    class="btn-primary px-4 py-2 text-sm inline-flex items-center"
                  >
                    View
                    <Icon name="heroicons:arrow-right" class="w-3 h-3 ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Results Grid View -->
        <div v-else class="grid-responsive mb-12">
          <div
            v-for="(song, index) in searchResults"
            :key="song.id"
            class="glass-card rounded-2xl p-6 card-hover"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <SongCard :song="song" :search-query="searchQuery" />
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center">
          <div class="glass-card p-4">
            <div class="flex items-center gap-2">
              <button
                v-if="currentPage > 1"
                @click="handlePageChange(currentPage - 1)"
                class="btn-secondary px-4 py-2 inline-flex items-center"
              >
                <Icon name="heroicons:chevron-left" class="w-4 h-4 mr-1" />
                Previous
              </button>

              <span class="px-4 py-2 text-sm font-medium text-gray-700">
                Page {{ currentPage }} of
                {{ Math.ceil(totalResults / pageSize) }}
              </span>

              <button
                v-if="currentPage < Math.ceil(totalResults / pageSize)"
                @click="handlePageChange(currentPage + 1)"
                class="btn-secondary px-4 py-2 inline-flex items-center"
              >
                Next
                <Icon name="heroicons:chevron-right" class="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- No Results State -->
      <section v-else-if="!loading && searchQuery" class="py-20">
        <div class="glass-card p-12 max-w-lg mx-auto text-center">
          <Icon
            name="heroicons:musical-note"
            class="w-16 h-16 text-purple-500 mx-auto mb-6"
          />
          <h3 class="text-2xl font-bold text-gray-800 mb-4">No songs found</h3>
          <p class="text-gray-600 mb-8 text-lg">
            Try searching with different keywords or check your spelling
          </p>
          <NuxtLink
            to="/add-song"
            class="btn-primary px-8 py-4 inline-flex items-center"
          >
            <Icon name="heroicons:plus-circle" class="w-5 h-5 mr-2" />
            Add This Song
          </NuxtLink>
        </div>
      </section>

      <!-- Initial State -->
      <section v-else class="py-20">
        <div class="glass-card p-12 max-w-lg mx-auto text-center">
          <Icon
            name="heroicons:magnifying-glass"
            class="w-16 h-16 text-purple-500 mx-auto mb-6"
          />
          <h3 class="text-2xl font-bold text-gray-800 mb-4">
            Ready to search worship songs?
          </h3>
          <p class="text-gray-600 mb-8 text-lg">
            Enter a song title, artist name, or lyrics to discover amazing
            worship music
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              @click="
                () => {
                  searchQuery = 'Jesus'
                  performSearch()
                }
              "
              class="btn-secondary px-6 py-3 inline-flex items-center"
            >
              Try "Jesus"
            </button>
            <button
              @click="
                () => {
                  searchQuery = 'Amazing Grace'
                  performSearch()
                }
              "
              class="btn-secondary px-6 py-3 inline-flex items-center"
            >
              Try "Amazing Grace"
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO Meta
useSeoMeta({
  title: "Search Songs",
  description:
    "Search through thousands of Christian worship song lyrics. Find songs by title, artist, or lyrics content.",
  ogTitle: "Search Worship Songs | Cloud of Worship Lyrics",
})

// URL Query management
const route = useRoute()
const router = useRouter()

// Reactive data
const searchQuery = ref((route.query.q as string) || "")
const loading = ref(false)
const searchResults = ref<any[]>([])
const totalResults = ref(0)
const currentPage = ref(1)
const pageSize = 20
const viewMode = ref("list") // 'list' or 'grid'

// Filters
const filters = ref({
  sortBy: "relevance",
  genre: "",
})

const sortOptions = [
  { label: "Relevance", value: "relevance" },
  { label: "Newest First", value: "newest" },
  { label: "A-Z", value: "alphabetical" },
  { label: "Most Popular", value: "popular" },
]

const genreOptions = [
  { label: "All Genres", value: "" },
  { label: "Contemporary", value: "contemporary" },
  { label: "Traditional", value: "traditional" },
  { label: "Gospel", value: "gospel" },
  { label: "Hymns", value: "hymns" },
]

// Use the actual songs composable

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
      genre: filters.value.genre,
    }

    const { searchSongs } = useSongs()
    const response = await searchSongs(params)
    searchResults.value = response.data
    totalResults.value = response.total

    // Update URL
    await navigateTo({
      path: "/search",
      query: {
        q: searchQuery.value,
        page: currentPage.value > 1 ? currentPage.value : undefined,
        sort:
          filters.value.sortBy !== "relevance"
            ? filters.value.sortBy
            : undefined,
        genre: filters.value.genre || undefined,
      },
    })
  } catch (error) {
    console.error("Search error:", error)
    // Simple error handling without toast for now
    alert("Failed to search songs. Please try again.")
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
    sortBy: "relevance",
    genre: "",
  }
  currentPage.value = 1
  performSearch()
}

// Helper methods for the list view
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

const quickPreview = (song: any) => {
  // TODO: Implement quick preview modal
  console.log("Quick preview for:", song.title)
}

const addToFavorites = (song: any) => {
  // TODO: Implement add to favorites
  console.log("Add to favorites:", song.title)
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

<style scoped>
/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Floating Blob Animations */
@keyframes blob {
  0%,
  100% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.blob {
  animation: blob 7s infinite;
}

.blob:nth-child(2) {
  animation-delay: 2s;
}

.blob:nth-child(3) {
  animation-delay: 4s;
}

/* Custom focus states */
.focus-visible:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px white, 0 0 0 4px var(--accent-600);
}

/* List view styles */
.song-list-item {
  opacity: 0;
  transform: translateY(10px);
  animation: slideInList 0.3s ease-out forwards;
}

@keyframes slideInList {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.song-list-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 25px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Enhanced skeleton animation */
.skeleton {
  animation: pulse 1.5s ease-in-out infinite;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite linear;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Responsive adjustments for list view */
@media (max-width: 640px) {
  .song-list-item .flex {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .song-list-item .flex > div:last-child {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
