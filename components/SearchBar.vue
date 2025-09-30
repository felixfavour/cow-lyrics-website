<template>
  <div class="relative">
    <UInput
      v-model="searchQuery"
      placeholder="Search songs, artists..."
      icon="i-heroicons-magnifying-glass"
      size="sm"
      class="w-64"
      @keyup.enter="performSearch"
    />
    
    <!-- Search suggestions dropdown -->
    <div
      v-if="showSuggestions && suggestions.length > 0"
      class="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50"
    >
      <div
        v-for="suggestion in suggestions"
        :key="suggestion.id"
        class="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
        @click="selectSuggestion(suggestion)"
      >
        <div class="font-medium">{{ suggestion.title }}</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">{{ suggestion.artist }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const searchQuery = ref('')
const showSuggestions = ref(false)
const suggestions = ref([])

const { searchSongs } = useSongs()

// Watch for search input changes
watchDebounced(searchQuery, async (newQuery) => {
  if (newQuery.length > 2) {
    try {
      const results = await searchSongs(newQuery, 5)
      suggestions.value = results
      showSuggestions.value = true
    } catch (error) {
      console.error('Search suggestions error:', error)
    }
  } else {
    suggestions.value = []
    showSuggestions.value = false
  }
}, { debounce: 300 })

const performSearch = () => {
  if (searchQuery.value.trim()) {
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value)}`)
    showSuggestions.value = false
  }
}

const selectSuggestion = (song: any) => {
  navigateTo(`/songs/${song.slug}`)
  showSuggestions.value = false
  searchQuery.value = ''
}

// Hide suggestions when clicking outside
onClickOutside(templateRef, () => {
  showSuggestions.value = false
})
</script>