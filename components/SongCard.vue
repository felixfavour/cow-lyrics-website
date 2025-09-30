<template>
  <UCard class="hover:shadow-lg transition-shadow duration-300 cursor-pointer" @click="navigateToSong">
    <template #header>
      <div class="aspect-square bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center mb-4">
        <UIcon
          v-if="!song.imageUrl"
          name="i-heroicons-musical-note"
          class="w-12 h-12 text-white"
        />
        <img
          v-else
          :src="song.imageUrl"
          :alt="song.title"
          class="w-full h-full object-cover rounded-lg"
        />
      </div>
    </template>
    
    <div class="space-y-2">
      <h3 class="font-semibold text-gray-900 dark:text-white line-clamp-2">
        {{ song.title }}
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        {{ song.artist }}
      </p>
      
      <div v-if="song.tags && song.tags.length > 0" class="flex flex-wrap gap-1">
        <UBadge
          v-for="tag in song.tags.slice(0, 2)"
          :key="tag"
          variant="soft"
          color="primary"
          size="xs"
        >
          {{ tag }}
        </UBadge>
      </div>
      
      <div class="flex items-center justify-between pt-2">
        <div class="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <UIcon name="i-heroicons-clock" class="w-3 h-3 mr-1" />
          {{ formatDate(song.createdAt) }}
        </div>
        <UButton
          variant="ghost"
          color="primary"
          size="xs"
          trailing-icon="i-heroicons-arrow-right"
          @click.stop="navigateToSong"
        >
          View
        </UButton>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { Song } from '~/types'

interface Props {
  song: Song
  searchQuery?: string
}

const props = defineProps<Props>()

const navigateToSong = () => {
  navigateTo(`/songs/${props.song.slug}`)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}
</script>