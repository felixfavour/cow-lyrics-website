<template>
  <div class="overflow-x-hidden">
    <!-- Hero Section -->
    <section class="relative gradient-bg text-white py-20 lg:py-28 overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute inset-0 bg-black/10"></div>
      <div class="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 fade-in-up">
          Discover Worship Lyrics
        </h1>
        <p class="text-xl lg:text-2xl mb-8 opacity-90 max-w-3xl mx-auto fade-in-up" style="animation-delay: 0.2s">
          Find and share Christian worship song lyrics with our growing community of believers
        </p>
        
        <!-- Hero Search -->
        <div class="max-w-2xl mx-auto fade-in-up" style="animation-delay: 0.4s">
          <div class="relative">
            <UInput
              v-model="heroSearchQuery"
              placeholder="Search for songs, artists, or lyrics..."
              icon="i-heroicons-magnifying-glass"
              size="xl"
              class="mb-6 glass-effect"
              @keyup.enter="searchFromHero"
            />
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <UButton
                color="white"
                variant="solid"
                size="xl"
                class="px-8"
                @click="searchFromHero"
              >
                <UIcon name="i-heroicons-magnifying-glass" class="w-5 h-5 mr-2" />
                Search Lyrics
              </UButton>
              <UButton
                color="white"
                variant="outline"
                size="xl"
                to="/add-song"
                class="px-8"
              >
                <UIcon name="i-heroicons-plus" class="w-5 h-5 mr-2" />
                Add Song
              </UButton>
            </div>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 fade-in-up" style="animation-delay: 0.6s">
          <div class="text-center">
            <div class="text-3xl font-bold">{{ stats.totalSongs.toLocaleString() }}+</div>
            <div class="text-primary-100 text-sm">Songs</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold">{{ stats.totalArtists.toLocaleString() }}+</div>
            <div class="text-primary-100 text-sm">Artists</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold">{{ stats.totalUsers.toLocaleString() }}+</div>
            <div class="text-primary-100 text-sm">Users</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold">{{ stats.songsThisMonth.toLocaleString() }}+</div>
            <div class="text-primary-100 text-sm">This Month</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recently Added Songs -->
    <section class="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <div>
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Recently Added
            </h2>
            <p class="text-gray-600 dark:text-gray-400">
              Latest worship songs added by our community
            </p>
          </div>
          <UButton 
            variant="ghost" 
            to="/search?filter=recent" 
            trailing-icon="i-heroicons-arrow-right"
            class="mt-4 sm:mt-0"
          >
            View All Recent
          </UButton>
        </div>
        
        <div v-if="recentSongsLoading" class="grid-responsive">
          <USkeleton
            v-for="i in 8"
            :key="i"
            class="h-80 rounded-xl"
          />
        </div>
        
        <div v-else-if="recentSongs?.length" class="grid-responsive">
          <SongCard
            v-for="(song, index) in recentSongs"
            :key="song.id"
            :song="song"
            class="fade-in-up card-hover"
            :style="{ animationDelay: `${index * 0.1}s` }"
          />
        </div>
        
        <div v-else class="text-center py-12">
          <UIcon name="i-heroicons-musical-note" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-2">No songs yet</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">Be the first to add a worship song!</p>
          <UButton color="primary" to="/add-song">Add First Song</UButton>
        </div>
      </div>
    </section>

    <!-- Popular Artists -->
    <section class="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <div>
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Popular Artists
            </h2>
            <p class="text-gray-600 dark:text-gray-400">
              Most loved worship artists in our community
            </p>
          </div>
          <UButton 
            variant="ghost" 
            to="/search?filter=popular-artists" 
            trailing-icon="i-heroicons-arrow-right"
            class="mt-4 sm:mt-0"
          >
            View All Artists
          </UButton>
        </div>
        
        <div v-if="popularArtistsLoading" class="grid-responsive-artists">
          <USkeleton
            v-for="i in 12"
            :key="i"
            class="h-48 rounded-xl"
          />
        </div>
        
        <div v-else-if="popularArtists?.length" class="grid-responsive-artists">
          <ArtistCard
            v-for="(artist, index) in popularArtists"
            :key="artist.id"
            :artist="artist"
            class="fade-in-up card-hover"
            :style="{ animationDelay: `${index * 0.1}s` }"
          />
        </div>
      </div>
    </section>

    <!-- Featured Categories -->
    <section class="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Browse by Category
          </h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore worship songs organized by themes and occasions
          </p>
        </div>
        
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          <NuxtLink
            v-for="category in categories"
            :key="category.slug"
            :to="`/search?category=${category.slug}`"
            class="group p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 focus-visible"
          >
            <UIcon 
              :name="category.icon" 
              class="w-12 h-12 text-primary-600 dark:text-primary-400 mb-4 mx-auto group-hover:scale-110 transition-transform" 
            />
            <h3 class="font-semibold text-gray-900 dark:text-white text-center mb-2">
              {{ category.name }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 text-center">
              {{ category.count }} songs
            </p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 lg:py-24 gradient-bg text-white relative overflow-hidden">
      <div class="absolute inset-0 bg-black/10"></div>
      <div class="absolute -top-24 -left-24 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
      <div class="absolute -bottom-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
      
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl lg:text-5xl font-bold mb-6">
          Share Your Favorite Songs
        </h2>
        <p class="text-xl lg:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
          Help grow our community by adding worship songs that have touched your heart
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton 
            color="white" 
            variant="solid" 
            size="xl" 
            to="/add-song"
            class="px-8"
          >
            <UIcon name="i-heroicons-plus-circle" class="w-6 h-6 mr-2" />
            Add a Song
          </UButton>
          <UButton 
            color="white" 
            variant="outline" 
            size="xl" 
            to="/about"
            class="px-8"
          >
            <UIcon name="i-heroicons-information-circle" class="w-6 h-6 mr-2" />
            Learn More
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// SEO Meta
useSeoMeta({
  title: 'Home - Discover Christian Worship Song Lyrics',
  description: 'Discover and share Christian worship song lyrics. Find recently added songs, popular artists, and browse by categories in our growing community of believers.',
  ogTitle: 'Cloud of Worship Lyrics - Christian Worship Songs',
  ogDescription: 'Discover and share Christian worship song lyrics with our community of believers',
  ogType: 'website',
  ogUrl: 'https://lyrics.cloudofworship.com',
  twitterTitle: 'Cloud of Worship Lyrics - Christian Worship Songs',
  twitterDescription: 'Discover and share Christian worship song lyrics with our community'
})

// Reactive data
const heroSearchQuery = ref('')

// Categories data
const categories = [
  { name: 'Praise & Worship', slug: 'praise-worship', icon: 'i-heroicons-heart', count: 450 },
  { name: 'Contemporary', slug: 'contemporary', icon: 'i-heroicons-sparkles', count: 320 },
  { name: 'Traditional Hymns', slug: 'hymns', icon: 'i-heroicons-book-open', count: 280 },
  { name: 'Gospel', slug: 'gospel', icon: 'i-heroicons-megaphone', count: 190 },
  { name: 'Christmas', slug: 'christmas', icon: 'i-heroicons-gift', count: 85 },
  { name: 'Easter', slug: 'easter', icon: 'i-heroicons-sun', count: 65 },
  { name: 'Youth', slug: 'youth', icon: 'i-heroicons-user-group', count: 120 },
  { name: 'International', slug: 'international', icon: 'i-heroicons-globe-alt', count: 95 }
]

// Stats data
const stats = ref({
  totalSongs: 1847,
  totalArtists: 342,
  totalUsers: 5621,
  songsThisMonth: 89
})

// Composables
const { getRecentSongs, getPopularArtists, getStats } = useSongs()

// Fetch data
const { data: recentSongs, pending: recentSongsLoading } = await useAsyncData(
  'home-recent-songs', 
  () => getRecentSongs(8),
  {
    default: () => [],
    transform: (data: any) => data?.data || []
  }
)

const { data: popularArtists, pending: popularArtistsLoading } = await useAsyncData(
  'home-popular-artists', 
  () => getPopularArtists(12),
  {
    default: () => [],
    transform: (data: any) => data?.data || []
  }
)

// Update stats periodically
onMounted(async () => {
  try {
    const statsData = await getStats()
    if (statsData) {
      stats.value = statsData
    }
  } catch (error) {
    console.error('Failed to load stats:', error)
  }
})

// Methods
const searchFromHero = () => {
  if (heroSearchQuery.value.trim()) {
    navigateTo(`/search?q=${encodeURIComponent(heroSearchQuery.value)}`)
  } else {
    navigateTo('/search')
  }
}

// Structured Data for home page
useSchemaOrg([
  {
    '@type': 'CollectionPage',
    name: 'Cloud of Worship Lyrics - Home',
    description: 'Discover and share Christian worship song lyrics with our community',
    url: 'https://lyrics.cloudofworship.com',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: stats.value.totalSongs,
      itemListElement: recentSongs.value?.slice(0, 5).map((song: any, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'MusicRecording',
          name: song.title,
          byArtist: song.artist,
          url: `https://lyrics.cloudofworship.com/songs/${song.slug}`
        }
      })) || []
    }
  }
])

// Preload critical resources
onMounted(() => {
  // Preload search page for better UX
  preloadRouteComponents('/search')
})
</script>

<style scoped>
/* Custom animations for hero elements */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.hero-decoration {
  animation: float 6s ease-in-out infinite;
}

/* Enhanced focus states */
.focus-visible:focus-visible {
  @apply outline-none ring-2 ring-white ring-offset-2 ring-offset-primary-600;
}
</style>