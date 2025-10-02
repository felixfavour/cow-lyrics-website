<template>
  <header
    class="sticky top-0 z-50 transition-colors duration-200 backdrop-blur-xl"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="flex items-center space-x-3 focus-visible group"
          aria-label="Cloud of Worship Lyrics Home"
        >
          <img
            src="~/assets/img/cow-logo-lyrics.svg"
            alt="Cloud of Worship"
            class="w-56 transition-transform group-hover:scale-110"
          />
          <!-- <div class="hidden sm:block">
            <span class="font-bold text-xl text-gray-800">Lyrics</span>
          </div> -->
        </NuxtLink>

        <!-- Search & Actions -->
        <div class="flex items-center space-x-3">
          <NuxtLink
            to="/add-song"
            class="btn-primary px-8 py-4 text-lg inline-flex items-center"
          >
            <Icon name="heroicons:plus" class="w-5 h-5 mr-2" />
            Add a song
          </NuxtLink>

          <!-- Mobile menu button -->
          <UButton
            variant="ghost"
            color="gray"
            icon="i-heroicons-bars-3"
            class="lg:hidden"
            size="sm"
            :aria-expanded="isMenuOpen"
            aria-label="Toggle mobile menu"
            @click="toggleMenu"
          />
        </div>
      </div>

      <!-- Mobile Search (always visible on small screens) -->
      <div class="md:hidden py-3 border-t border-gray-200">
        <SearchBar />
      </div>

      <!-- Mobile Navigation Menu -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="isMenuOpen"
          class="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg"
        >
          <div class="px-4 py-4 space-y-3">
            <NuxtLink to="/" class="mobile-nav-link" @click="closeMenu">
              <UIcon name="i-heroicons-home" class="w-5 h-5" />
              <span>Home</span>
            </NuxtLink>
            <NuxtLink to="/search" class="mobile-nav-link" @click="closeMenu">
              <UIcon name="i-heroicons-magnifying-glass" class="w-5 h-5" />
              <span>Search Songs</span>
            </NuxtLink>
            <NuxtLink to="/add-song" class="mobile-nav-link" @click="closeMenu">
              <UIcon name="i-heroicons-plus-circle" class="w-5 h-5" />
              <span>Add New Song</span>
            </NuxtLink>
            <NuxtLink to="/about" class="mobile-nav-link" @click="closeMenu">
              <UIcon name="i-heroicons-information-circle" class="w-5 h-5" />
              <span>About Cloud of Worship</span>
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

// Close menu when route changes
const route = useRoute()
watch(
  () => route.path,
  () => {
    closeMenu()
  }
)

// Close menu when clicking outside
onClickOutside(templateRef, () => {
  closeMenu()
})

// Handle escape key
useEventListener("keydown", (e) => {
  if (e.key === "Escape" && isMenuOpen.value) {
    closeMenu()
  }
})
</script>

<style scoped>
.nav-link {
  @apply flex items-center px-3 py-2 text-sm font-medium text-gray-700 
         hover:text-primary-600 transition-colors duration-200 
         rounded-md hover:bg-gray-100;
}

.nav-link-active {
  @apply text-primary-600 bg-primary-50;
}

.mobile-nav-link {
  @apply flex items-center space-x-3 px-3 py-3 text-base font-medium text-gray-700 
         hover:text-primary-600 hover:bg-gray-50 
         rounded-lg transition-colors duration-200;
}
</style>
