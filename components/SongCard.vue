<template>
  <NuxtLink
    :to="`/songs/${song.id}`"
    class="cursor-pointer transition-all duration-300 h-full"
  >
    <!-- Album Art / Icon -->
    <div
      class="aspect-square gradient-accent rounded-2xl flex items-center justify-center mb-4 overflow-hidden"
    >
      <Icon
        v-if="!song.imageUrl"
        name="heroicons:musical-note"
        class="w-12 h-12 text-white"
      />
      <img
        v-else
        :src="song.imageUrl"
        :alt="song.title"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Song Info -->
    <div class="space-y-3">
      <h3 class="font-bold text-gray-800 text-lg line-clamp-2 leading-tight">
        {{ song.title }}
      </h3>
      <p class="text-gray-600 font-medium">
        {{ song.artist }}
      </p>

      <!-- Tags -->
      <div
        v-if="song.tags && song.tags.length > 0"
        class="flex flex-wrap gap-2"
      >
        <span
          v-for="tag in song.tags.slice(0, 2)"
          :key="tag"
          class="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-lg font-medium"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between pt-2">
        <div
          class="text-purple-600 hover:text-purple-700 transition-colors text-sm font-medium flex items-center"
        >
          View
          <Icon name="heroicons:arrow-right" class="w-3 h-3 ml-1" />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Song } from "~/types"

interface Props {
  song: Song
  searchQuery?: string
}

const props = defineProps<Props>()
</script>
