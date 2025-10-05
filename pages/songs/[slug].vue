<template>
  <div v-if="song">
    <!-- Song Header -->
    <section
      class="py-20 lg:py-32 bg-gradient-to-br from-purple-50 to-blue-50 relative overflow-hidden min-h-full"
    >
      <!-- Background decorations -->
      <div
        class="absolute top-20 left-20 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl blob"
      ></div>
      <div
        class="absolute bottom-20 right-20 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl blob"
      ></div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="glass-card p-8 lg:p-12">
          <div class="flex flex-col lg:flex-row items-start gap-8">
            <div class="flex-shrink-0">
              <div
                class="w-48 h-48 lg:w-64 lg:h-64 gradient-accent rounded-2xl flex items-center justify-center overflow-hidden"
              >
                <Icon
                  v-if="!song.cover && !song.imageUrl"
                  name="heroicons:musical-note"
                  class="w-20 h-20 text-white"
                />
                <img
                  v-else
                  :src="song.cover || song.imageUrl"
                  :alt="song.title"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>

            <div class="flex-1 min-w-0">
              <h1 class="text-4xl lg:text-5xl font-bold mb-4 text-gray-800">
                {{ song.title }}
              </h1>
              <p class="text-xl lg:text-2xl mb-6 text-gray-600">
                by {{ song.artist }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-[90%] md:max-w-3xl mx-auto py-8">
        <!-- <div class="mb-6">
          <h2 class="text-3xl font-bold text-gray-800 mb-2">Lyrics</h2>
        </div> -->

        <div class="prose prose-lyrics max-w-none">
          <!-- Render Nuxt Content if available -->
          <ContentRenderer v-if="song.body" :value="song" class="prose-lg" />
          <!-- Fallback to lyrics field -->
          <pre
            v-else
            class="whitespace-pre-wrap font-sans text-3xl leading-relaxed text-gray-700"
            >{{ song.lyrics }}</pre
          >
        </div>

        <!-- Back to search button -->
        <div class="text-center pt-8">
          <NuxtLink to="/search" class="btn-secondary inline-flex items-center">
            <Icon name="heroicons:arrow-left" class="w-4 h-4 mr-2" />
            Browse More Songs
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>

  <div
    v-else
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50"
  >
    <div class="text-center glass-card p-12 max-w-md mx-auto">
      <Icon
        name="heroicons:musical-note"
        class="w-16 h-16 text-purple-500 mx-auto mb-6"
      />
      <h1 class="text-3xl font-bold text-gray-800 mb-4">Song not found</h1>
      <p class="text-gray-600 mb-8">
        The song you're looking for doesn't exist or has been removed.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink to="/" class="btn-primary">
          <Icon name="heroicons:home" class="w-5 h-5 mr-2" />
          Go Home
        </NuxtLink>
        <NuxtLink to="/search" class="btn-secondary">
          <Icon name="heroicons:magnifying-glass" class="w-5 h-5 mr-2" />
          Search Songs
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useSchema from "~/composables/useSchema"

const route = useRoute()

// Fetch song data directly using queryContent
const { data: song } = await useAsyncData(`song-${route.params.slug}`, () =>
  queryContent("songs").where({ id: route.params.slug }).findOne()
)

onMounted(() => {
  if (location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
    useGtag()
  }
})

// Action methods
const copyLyrics = async () => {
  if (song.value?.lyrics) {
    try {
      await navigator.clipboard.writeText(song.value.lyrics)
      // You could add a toast notification here
      console.log("Lyrics copied to clipboard")
    } catch (err) {
      console.error("Failed to copy lyrics:", err)
    }
  }
}

const shareSong = () => {
  if (song.value) {
    const shareData = {
      title: `${song.value.title} by ${song.value.artist}`,
      text: `Check out these lyrics: ${song.value.title} by ${song.value.artist}`,
      url: window.location.href,
    }

    if (navigator.share) {
      navigator.share(shareData)
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href)
      console.log("URL copied to clipboard")
    }
  }
}

// SEO Meta
if (song.value) {
  useSeoMeta({
    title: `${song.value.title} by ${song.value.artist}`,
    description: `Lyrics for "${song.value.title}" by ${song.value.artist}. Christian worship song lyrics from Cloud of Worship.`,
    ogTitle: `${song.value.title} by ${song.value.artist} | Cloud of Worship Lyrics`,
    ogDescription: `Lyrics for "${song.value.title}" by ${song.value.artist}`,
    // ogImage: song.value.imageUrl || '/og-image-song.jpg'
  })

  // Structured Data using useSchema
  useSchema([
    {
      "@type": "MusicRecording",
      name: song.value.title,
      byArtist: {
        "@type": "Person",
        name: song.value.artist,
      },
      inAlbum: song.value.album
        ? {
            "@type": "MusicAlbum",
            name: song.value.album,
          }
        : undefined,
      lyrics: {
        "@type": "CreativeWork",
        text: song.value.lyrics,
      },
      genre: song.value.genre || "Christian/Gospel",
      dateCreated: song.value.createdAt,
    },
  ])
}
</script>

<style>
.prose-lg {
  white-space: pre-wrap;

  p > span {
    padding: 1rem 0;
    display: block;
    font-size: 1.125rem;
  }

  * {
    font-family: "IBM Plex Serif", serif;
    font-size: 1.125rem;
    font-weight: 500;
  }
}
</style>
