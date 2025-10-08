<template>
  <div class="">
    <!-- Hero Section -->
    <section
      class="relative pt-[160px] sm:pt-0 max-h-[800px] min-h-[800px] flex items-center justify-center py-12 lg:py-28 bg-gradient-to-br from-purple-50 to-blue-50 image-bg overflow-hidden"
    >
      <!-- Animated Floating Circles with Background Images -->
      <div class="opacity-30 md:opacity-100">
        <div class="floating-circle floating-circle-1"></div>
        <div class="floating-circle floating-circle-2"></div>
        <div class="floating-circle floating-circle-3"></div>
        <div class="floating-circle floating-circle-4"></div>
        <div class="floating-circle floating-circle-5"></div>
        <div class="floating-circle floating-circle-6"></div>
      </div>

      <!-- Animated Background Blobs -->
      <div
        class="absolute top-20 left-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl blob"
      ></div>
      <div
        class="absolute bottom-20 right-20 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl blob"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-100/50 rounded-full blur-3xl blob"
      ></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="mb-5 sm:mb-8">
          <div
            class="inline-flex items-center px-4 py-2 rounded-full glass-card text-sm font-medium text-purple-700 mb-6"
          >
            <span
              class="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"
            ></span>
            Discover inspiring worship lyrics
          </div>
        </div>

        <h1 class="text-5xl sm:text-6xl lg:text-8xl font-bold mb-5 sm:mb-8">
          <span class="text-gradient">Worship</span>
          <br />
          <span class="text-gray-800">Together</span>
        </h1>

        <p
          class="text-base lg:text-xl mb-12 text-gray-600 max-w-2xl mx-auto leading-relaxed"
          style="animation-delay: 0.2s"
        >
          Connect with believers worldwide through the power of worship music.
          Find lyrics, share songs, and grow in faith together.
        </p>

        <!-- Hero Search -->
        <div class="max-w-2xl mx-auto" style="animation-delay: 0.4s">
          <div class="relative mb-8">
            <input
              v-model="heroSearchQuery"
              placeholder="Search for songs, artists, or lyrics..."
              class="search-input text-lg"
              @keyup.enter="searchFromHero"
            />
            <NuxtLink
              :to="
                heroSearchQuery.trim()
                  ? `/search?q=${encodeURIComponent(heroSearchQuery)}`
                  : '/search'
              "
              class="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-lg glass-button inline-flex items-center justify-center"
            >
              <Icon name="heroicons:magnifying-glass" class="w-5 h-5" />
            </NuxtLink>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              :to="
                heroSearchQuery.trim()
                  ? `/search?q=${encodeURIComponent(heroSearchQuery)}`
                  : '/search'
              "
              class="btn-primary px-8 py-4 text-lg inline-flex items-center justify-center"
            >
              <Icon name="heroicons:magnifying-glass" class="w-5 h-5 mr-2" />
              Discover Lyrics
            </NuxtLink>
            <NuxtLink
              to="https://app.cloudofworship.com/signup?from_lyrics=1"
              class="btn-secondary px-8 py-4 text-lg text-center inline-flex items-center justify-center"
            >
              <Icon name="heroicons:plus" class="w-5 h-5 mr-2" />
              Share a Song
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Recently Added Songs -->
    <section class="py-12 lg:py-18 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-16"
        >
          <div>
            <h2 class="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Recently Added
            </h2>
            <p class="text-gray-600 text-lg">
              Latest worship songs shared by our community
            </p>
          </div>
          <NuxtLink
            to="/search"
            class="btn-secondary mt-6 sm:mt-0 inline-flex items-center"
          >
            Search more
            <Icon name="heroicons:arrow-right" class="w-4 h-4 ml-2" />
          </NuxtLink>
        </div>

        <div v-if="recentSongsLoading" class="grid-responsive">
          <div
            v-for="i in 8"
            :key="i"
            class="glass-card rounded-2xl p-6 h-80 skeleton"
          ></div>
        </div>

        <div v-else-if="recentSongs?.length" class="grid-responsive">
          <div
            v-for="(song, index) in recentSongs"
            :key="song.id"
            class="glass-card rounded-2xl p-6 card-hover"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <SongCard :song="song" />
          </div>
        </div>

        <div v-else class="text-center py-16">
          <div class="glass-card p-12 max-w-md mx-auto">
            <Icon
              name="heroicons:musical-note"
              class="w-16 h-16 text-purple-500 mx-auto mb-6"
            />
            <h3 class="text-2xl font-bold text-gray-800 mb-4">No songs yet</h3>
            <p class="text-gray-600 mb-8">
              Be the first to add a worship song!
            </p>
            <NuxtLink
              to="https://app.cloudofworship.com/signup?from_lyrics=1"
              class="btn-primary inline-flex items-center"
            >
              <Icon name="heroicons:plus" class="w-5 h-5 mr-2" />
              Add First Song
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Artists -->
    <section class="py-12 lg:py-18 relative bg-gray-50">
      <!-- Background decoration -->
      <div
        class="absolute top-10 right-10 w-64 h-64 bg-purple-100 rounded-full blur-3xl"
      ></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-16"
        >
          <div>
            <h2 class="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Popular Artists
            </h2>
            <p class="text-gray-600 text-lg">
              Most beloved worship artists in our community
            </p>
          </div>
          <NuxtLink
            to="/search?filter=popular-artists"
            class="btn-secondary mt-6 sm:mt-0 inline-flex items-center"
          >
            View All Artists
            <Icon name="heroicons:arrow-right" class="w-4 h-4 ml-2" />
          </NuxtLink>
        </div>

        <div v-if="popularArtistsLoading" class="grid-responsive-artists">
          <div
            v-for="i in 12"
            :key="i"
            class="glass-card rounded-2xl p-4 h-48 skeleton"
          ></div>
        </div>

        <div v-else-if="popularArtists?.length" class="grid-responsive-artists">
          <div
            v-for="(artist, index) in popularArtists"
            :key="artist.id"
            class="glass-card rounded-2xl p-4 card-hover text-center"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <ArtistCard :artist="artist" />
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Categories -->
    <section class="py-12 lg:py-18 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Browse by Category
          </h2>
          <p class="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore worship songs organized by themes and occasions
          </p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          <NuxtLink
            v-for="category in categories"
            :key="category.slug"
            :to="`/search?query=${category.slug}`"
            class="group glass-card p-8 card-hover text-center"
          >
            <Icon
              :name="category.icon"
              class="w-12 h-12 text-purple-500 mb-4 mx-auto group-hover:scale-110 transition-transform"
            />
            <h3 class="font-semibold text-gray-800 text-lg mb-2">
              {{ category.name }}
            </h3>
            <p class="text-sm text-gray-600">{{ category.count }} songs</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section
      class="py-12 lg:py-18 relative overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50"
    >
      <!-- Background effects -->
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-200/30 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute top-20 left-20 w-32 h-32 bg-purple-200/50 rounded-full blur-2xl blob"
      ></div>
      <div
        class="absolute bottom-20 right-20 w-40 h-40 bg-blue-200/40 rounded-full blur-2xl blob"
      ></div>

      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <!-- Glass card for CTA content -->
        <div class="glass-card p-12 lg:p-16">
          <div class="mb-8">
            <div
              class="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-sm font-medium text-purple-700 mb-6"
            >
              <span
                class="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"
              ></span>
              Join our community
            </div>
          </div>

          <h2 class="text-4xl lg:text-6xl font-bold mb-8 text-gray-800">
            Share Your
            <span class="gradient-text">Favorite Songs</span>
          </h2>

          <p
            class="text-xl lg:text-2xl mb-12 text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Help grow our community by sharing worship songs that have touched
            your heart and blessed your spirit
          </p>

          <div class="flex flex-col sm:flex-row gap-6 justify-center">
            <NuxtLink
              to="https://app.cloudofworship.com/signup?from_lyrics=1"
              class="btn-primary px-8 py-4 text-lg inline-flex items-center justify-center"
            >
              <Icon name="heroicons:plus-circle" class="w-6 h-6 mr-2" />
              Share a Song
            </NuxtLink>

            <NuxtLink
              to="/search"
              class="btn-secondary px-8 py-4 text-lg inline-flex items-center justify-center"
            >
              <Icon name="heroicons:magnifying-glass" class="w-6 h-6 mr-2" />
              Explore Songs
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta } from "nuxt/app"

// SEO Meta
useSeoMeta({
  title: "Home - Discover Christian Worship Song Lyrics",
  description:
    "Discover and share Christian worship song lyrics. Find recently added songs, popular artists, and browse by categories in our growing community of believers.",
  ogTitle: "Cloud of Worship Lyrics - Christian Worship Songs",
  ogDescription:
    "Discover and share Christian worship song lyrics with our community of believers",
  ogType: "website",
  ogUrl: "https://lyrics.cloudofworship.com",
  twitterTitle: "Cloud of Worship Lyrics - Christian Worship Songs",
  twitterDescription:
    "Discover and share Christian worship song lyrics with our community",
})

// Reactive data
const heroSearchQuery = ref("")

// Categories data
const categories = [
  {
    name: "Praise & Worship",
    slug: "praise-worship",
    icon: "i-heroicons-heart",
    count: 450,
  },
  {
    name: "Contemporary",
    slug: "contemporary",
    icon: "i-heroicons-sparkles",
    count: 320,
  },
  {
    name: "Traditional Hymns",
    slug: "hymns",
    icon: "i-heroicons-book-open",
    count: 280,
  },
  { name: "Gospel", slug: "gospel", icon: "i-heroicons-megaphone", count: 190 },
  { name: "Christmas", slug: "christmas", icon: "i-heroicons-gift", count: 85 },
  { name: "Easter", slug: "easter", icon: "i-heroicons-sun", count: 65 },
  { name: "Youth", slug: "youth", icon: "i-heroicons-user-group", count: 120 },
  {
    name: "International",
    slug: "international",
    icon: "i-heroicons-globe-alt",
    count: 95,
  },
]

// Stats data
const stats = ref({
  totalSongs: 1847,
  totalArtists: 342,
  totalUsers: 5621,
  songsThisMonth: 89,
})

// Use the songs composable
const { getRecentSongs, getPopularArtists, getStats } = useSongs()

// Fetch data using API
const { data: recentSongsData, pending: recentSongsLoading } =
  await useAsyncData("home-recent-songs", () => getRecentSongs(8), {
    default: () => ({ data: [] }),
  })

const recentSongs = computed(() => recentSongsData.value?.data || [])

// Fetch popular artists
const { data: popularArtistsData, pending: popularArtistsLoading } =
  await useAsyncData("home-popular-artists", () => getPopularArtists(18), {
    default: () => ({ data: [] }),
  })

const popularArtists = computed(() => popularArtistsData.value?.data || [])

// Helper function to create URL-friendly slugs
const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// Update stats periodically
onMounted(async () => {
  if (location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
    useGtag()
  }
  try {
    const fetchedStats = await getStats()
    stats.value = fetchedStats
  } catch (error) {
    console.error("Failed to load stats:", error)
  }
})

// Methods
const searchFromHero = () => {
  if (heroSearchQuery.value.trim()) {
    navigateTo(`/search?q=${encodeURIComponent(heroSearchQuery.value)}`)
  } else {
    navigateTo("/search")
  }
}

// Structured Data for home page
useSchema([
  {
    "@type": "CollectionPage",
    name: "Cloud of Worship Lyrics - Home",
    description:
      "Discover and share Christian worship song lyrics with our community",
    url: "https://lyrics.cloudofworship.com",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: stats.value.totalSongs,
      itemListElement:
        recentSongs.value?.slice(0, 5).map((song: any, index: number) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "MusicRecording",
            name: song.title,
            byArtist: song.artist,
            url: `https://lyrics.cloudofworship.com/songs/${song.id}`,
          },
        })) || [],
    },
  },
])

// Preload critical resources
onMounted(() => {
  // Preload search page for better UX
  preloadRouteComponents("/search")
})
</script>

<style scoped>
/* Custom animations for hero elements */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.hero-decoration {
  animation: float 6s ease-in-out infinite;
}

/* Floating Circles Animations */
@keyframes floatCircle {
  0%,
  100% {
    transform: translate(0px, 0px) rotate(0deg);
  }
  25% {
    transform: translate(20px, -30px) rotate(90deg);
  }
  50% {
    transform: translate(-15px, -20px) rotate(180deg);
  }
  75% {
    transform: translate(-25px, 10px) rotate(270deg);
  }
}

@keyframes floatCircle2 {
  0%,
  100% {
    transform: translate(0px, 0px) rotate(0deg) scale(1);
  }
  33% {
    transform: translate(-30px, 25px) rotate(120deg) scale(1.1);
  }
  66% {
    transform: translate(25px, -20px) rotate(240deg) scale(0.9);
  }
}

@keyframes floatCircle3 {
  0%,
  100% {
    transform: translate(0px, 0px) rotate(0deg);
  }
  20% {
    transform: translate(15px, -25px) rotate(72deg);
  }
  40% {
    transform: translate(-10px, -35px) rotate(144deg);
  }
  60% {
    transform: translate(-30px, 5px) rotate(216deg);
  }
  80% {
    transform: translate(10px, 20px) rotate(288deg);
  }
}

.floating-circle {
  position: absolute;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  opacity: 0.7;
  backdrop-filter: blur(1px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.floating-circle-1 {
  width: 120px;
  height: 120px;
  top: 15%;
  left: 10%;
  background-image: url("https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400&h=400&fit=crop");
  animation: floatCircle 45s ease-in-out infinite;
  animation-delay: 0s;
}

.floating-circle-2 {
  width: 80px;
  height: 80px;
  top: 25%;
  right: 15%;
  background-image: url("https://images.unsplash.com/photo-1438032005730-c779502df39b?w=400&h=400&fit=crop");
  animation: floatCircle2 40s ease-in-out infinite;
  animation-delay: 2s;
}

.floating-circle-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 20%;
  background-image: url("https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop");
  animation: floatCircle3 50s ease-in-out infinite;
  animation-delay: 4s;
}

.floating-circle-4 {
  width: 90px;
  height: 90px;
  top: 60%;
  right: 25%;
  background-image: url("https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400&h=400&fit=crop");
  animation: floatCircle 60s ease-in-out infinite;
  animation-delay: 6s;
}

.floating-circle-5 {
  width: 60px;
  height: 60px;
  top: 40%;
  left: 30%;
  background-image: url("https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=400&h=400&fit=crop");
  animation: floatCircle2 40s ease-in-out infinite;
  animation-delay: 8s;
}

.floating-circle-6 {
  width: 110px;
  height: 110px;
  bottom: 30%;
  right: 10%;
  background-image: url("https://images.unsplash.com/photo-1709370050787-868be42cd19c?w=400&h=400&fit=crop");
  animation: floatCircle3 50s ease-in-out infinite;
  animation-delay: 10s;
}

/* Enhanced focus states */
.focus-visible:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px white, 0 0 0 4px var(--accent-600);
}

.image-bg {
  /* background-image: url("/worship-together.jpeg"); */
  background-size: cover;
  background-position: center;
}
</style>
