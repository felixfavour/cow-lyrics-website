<template>
  <div v-if="song" class="min-h-screen bg-gray-50">
    <!-- Song Header -->
    <section class="gradient-bg text-white py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-start gap-8">
          <div class="flex-shrink-0">
            <div
              class="w-48 h-48 bg-white/20 rounded-lg flex items-center justify-center"
            >
              <UIcon
                v-if="!song.imageUrl"
                name="i-heroicons-musical-note"
                class="w-20 h-20 text-white"
              />
              <img
                v-else
                :src="song.imageUrl"
                :alt="song.title"
                class="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          <div class="flex-1 min-w-0">
            <h1 class="text-4xl md:text-5xl font-bold mb-2">
              {{ song.title }}
            </h1>
            <p class="text-xl mb-4 opacity-90">by {{ song.artist }}</p>

            <div class="flex flex-wrap gap-4 mb-6">
              <div v-if="song.album" class="flex items-center">
                <UIcon name="i-heroicons-musical-note" class="w-4 h-4 mr-2" />
                {{ song.album }}
              </div>
              <div v-if="song.key" class="flex items-center">
                <UIcon name="i-heroicons-key" class="w-4 h-4 mr-2" />
                Key: {{ song.key }}
              </div>
              <div v-if="song.bpm" class="flex items-center">
                <UIcon name="i-heroicons-heart" class="w-4 h-4 mr-2" />
                {{ song.bpm }} BPM
              </div>
            </div>

            <SocialShare :song="song" />
          </div>
        </div>
      </div>
    </section>

    <!-- Lyrics Section -->
    <section class="py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <UCard class="mb-8">
          <template #header>
            <h2 class="text-2xl font-bold">Lyrics</h2>
          </template>

          <div class="prose max-w-none">
            <pre
              class="whitespace-pre-wrap font-sans text-base leading-relaxed"
              >{{ song.lyrics }}</pre
            >
          </div>
        </UCard>

        <!-- Related Songs -->
        <RelatedSongs :current-song="song" />
      </div>
    </section>
  </div>

  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Song not found</h1>
      <UButton to="/" color="primary">Go Home</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { getSongBySlug } = useSongs()

// Fetch song data
const { data: song } = await useAsyncData(`song-${route.params.slug}`, () =>
  getSongBySlug(route.params.slug as string)
)

// SEO Meta
if (song.value) {
  useSeoMeta({
    title: `${song.value.title} by ${song.value.artist}`,
    description: `Lyrics for "${song.value.title}" by ${song.value.artist}. Christian worship song lyrics from Cloud of Worship.`,
    ogTitle: `${song.value.title} by ${song.value.artist} | Cloud of Worship Lyrics`,
    ogDescription: `Lyrics for "${song.value.title}" by ${song.value.artist}`,
    // ogImage: song.value.imageUrl || '/og-image-song.jpg'
  })

  // Structured Data
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
