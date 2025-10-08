<template>
  <div class="flex flex-col items-center space-y-4 group">
    <!-- Creator Avatar -->
    <div class="relative">
      <div
        class="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 p-0.5"
      >
        <img
          :src="
            creator.avatar ||
            `https://avatar.iran.liara.run/username?username=${creator.fullname}`
          "
          :alt="creator.fullname"
          class="w-full h-full rounded-full object-cover bg-white"
          loading="lazy"
        />
      </div>

      <!-- Badge for songs count -->
      <div
        class="absolute -bottom-1 -right-1 bg-purple-600 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center border-2 border-white shadow-lg"
      >
        {{ creator.songsCreated }}
      </div>
    </div>

    <!-- Creator Info -->
    <div class="text-center space-y-1">
      <h3
        class="font-semibold text-gray-800 text-sm line-clamp-2 group-hover:text-purple-600 transition-colors"
      >
        {{ creator.fullname }}
      </h3>
      <p class="text-xs text-gray-500">
        {{ creator.songsCreated }}
        {{ creator.songsCreated === 1 ? "song" : "songs" }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Creator {
  songsCreated: number
  userId: string
  fullname: string
  avatar: string
}

defineProps<{
  creator: Creator
}>()
</script>
