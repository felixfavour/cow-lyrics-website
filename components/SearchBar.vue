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
      class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50"
    >
      <NuxtLink
        v-for="suggestion in suggestions"
        :key="suggestion.id"
        :to="`/songs/${suggestion.slug}`"
        class="block px-3 py-2 hover:bg-gray-100"
        @click="
          () => {
            showSuggestions = false
            searchQuery = ''
          }
        "
      >
        <div class="font-medium">{{ suggestion.title }}</div>
        <div class="text-sm text-gray-600">{{ suggestion.artist }}</div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const searchQuery = ref("")
const showSuggestions = ref(false)
const suggestions = ref([])

const { searchSongs } = useSongs()

// Watch for search input changes
watchDebounced(
  searchQuery,
  async (newQuery) => {
    if (newQuery.length > 2) {
      try {
        const results = await searchSongs(newQuery, 5)
        suggestions.value = results
        showSuggestions.value = true
      } catch (error) {
        console.error("Search suggestions error:", error)
      }
    } else {
      suggestions.value = []
      showSuggestions.value = false
    }
  },
  { debounce: 300 }
)

const performSearch = () => {
  if (searchQuery.value.trim()) {
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value)}`)
    showSuggestions.value = false
  }
}

// Hide suggestions when clicking outside
onClickOutside(templateRef, () => {
  showSuggestions.value = false
})
</script>
