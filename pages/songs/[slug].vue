<template>
  <div v-if="song">
    <!-- Song Header -->
    <section
      class="pb-20 pt-[150px] bg-gradient-to-br from-purple-50 to-blue-50 relative overflow-hidden min-h-full"
    >
      <!-- Background decorations -->
      <div
        class="absolute top-20 left-20 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl blob"
      ></div>
      <div
        class="absolute bottom-20 right-20 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl blob"
      ></div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="glass-card p-8">
          <div class="flex flex-col lg:flex-row items-start gap-8">
            <div class="flex-1 min-w-0">
              <h1 class="text-3xl font-bold text-gray-800">
                {{ song.title }}
              </h1>
              <p class="text-lg text-gray-600">by {{ song.artist }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-[90%] md:max-w-3xl mx-auto py-8">
        <!-- <div class="mb-6">
          <h2 class="text-3xl font-bold text-gray-800 mb-2">Lyrics</h2>
        </div> -->

        <div
          class="prose prose-lyrics max-w-none whitespace-pre-wrap font-sans text-xl leading-relaxed text-gray-700 prose-lg"
        >
          {{ song.lyrics }}
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
    class="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50"
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
const { getSongBySlug } = useSongs()

// Fetch song data using API
const { data: song } = await useAsyncData(`song-${route.params.slug}`, () =>
  getSongBySlug(route.params.slug as string)
)

onMounted(() => {
  if (location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
    useGtag()
  }
})

// SEO Meta
if (song.value) {
  useSeoMeta({
    title: `${song.value.title} by ${song.value.artist}`,
    description: `Song. Lyrics. ${song.value.lyrics.substring(0, 150)}...`,
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
  padding: 1rem 0;
  display: block;
  font-size: 1.125rem;
  line-height: 2.125rem;
  font-family: "IBM Plex Serif", serif;
  font-weight: 500;
}
</style>
