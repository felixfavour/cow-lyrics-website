<template>
  <NuxtLink
    :to="`/search?q=${encodeURIComponent(artist.name)}`"
    class="cursor-pointer transition-all duration-300 h-full text-center"
  >
    <!-- Artist Avatar -->
    <div
      class="w-20 h-20 gradient-accent rounded-full flex items-center justify-center mb-4 mx-auto overflow-hidden"
    >
      <Icon
        v-if="!artist.imageUrl"
        name="heroicons:user"
        class="w-10 h-10 text-white"
      />
      <img
        v-else
        :src="artist.imageUrl"
        :alt="artist.name"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Artist Info -->
    <div class="space-y-2">
      <h3 class="font-bold text-gray-800 text-sm leading-tight">
        {{ artist.name }}
      </h3>
      <p class="text-gray-600 text-xs">
        {{ artist.songCount }} {{ artist.songCount === 1 ? "song" : "songs" }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Artist {
  id: string
  name: string
  imageUrl?: string
  songCount: number
  slug: string
}

interface Props {
  artist: Artist
}

const props = defineProps<Props>()
</script>
