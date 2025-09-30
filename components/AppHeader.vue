<template>
  <header class="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <NuxtLink 
          to="/" 
          class="flex items-center space-x-3 focus-visible group"
          aria-label="Cloud of Worship Lyrics Home"
        >
          <div class="relative">
            <UIcon 
              name="i-heroicons-musical-note" 
              class="w-8 h-8 text-primary-600 transition-transform group-hover:scale-110" 
            />
            <div class="absolute inset-0 bg-primary-600 rounded-full opacity-20 scale-0 group-hover:scale-150 transition-transform duration-300"></div>
          </div>
          <div class="hidden sm:block">
            <span class="font-bold text-xl gradient-text">Cloud of Worship</span>
            <div class="text-xs text-gray-500 dark:text-gray-400 -mt-1">Lyrics</div>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-8">
          <NuxtLink 
            to="/" 
            class="nav-link"
            :class="{ 'nav-link-active': $route.path === '/' }"
          >
            <UIcon name="i-heroicons-home" class="w-4 h-4 mr-2" />
            Home
          </NuxtLink>
          <NuxtLink 
            to="/search" 
            class="nav-link"
            :class="{ 'nav-link-active': $route.path.startsWith('/search') }"
          >
            <UIcon name="i-heroicons-magnifying-glass" class="w-4 h-4 mr-2" />
            Search
          </NuxtLink>
          <NuxtLink 
            to="/add-song" 
            class="nav-link"
            :class="{ 'nav-link-active': $route.path === '/add-song' }"
          >
            <UIcon name="i-heroicons-plus" class="w-4 h-4 mr-2" />
            Add Song
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="nav-link"
            :class="{ 'nav-link-active': $route.path === '/about' }"
          >
            <UIcon name="i-heroicons-information-circle" class="w-4 h-4 mr-2" />
            About
          </NuxtLink>
        </div>

        <!-- Search & Actions -->
        <div class="flex items-center space-x-3">
          <div class="hidden md:block">
            <SearchBar />
          </div>
          
          <UButton 
            color="primary" 
            variant="soft" 
            to="/add-song" 
            class="hidden sm:flex"
            size="sm"
          >
            <UIcon name="i-heroicons-plus" class="w-4 h-4 mr-1" />
            Add Song
          </UButton>
          
          <UColorModeButton size="sm" />
          
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
      <div class="md:hidden py-3 border-t border-gray-200 dark:border-gray-700">
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
          class="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-lg"
        >
          <div class="px-4 py-4 space-y-3">
            <NuxtLink 
              to="/" 
              class="mobile-nav-link"
              @click="closeMenu"
            >
              <UIcon name="i-heroicons-home" class="w-5 h-5" />
              <span>Home</span>
            </NuxtLink>
            <NuxtLink 
              to="/search" 
              class="mobile-nav-link"
              @click="closeMenu"
            >
              <UIcon name="i-heroicons-magnifying-glass" class="w-5 h-5" />
              <span>Search Songs</span>
            </NuxtLink>
            <NuxtLink 
              to="/add-song" 
              class="mobile-nav-link"
              @click="closeMenu"
            >
              <UIcon name="i-heroicons-plus-circle" class="w-5 h-5" />
              <span>Add New Song</span>
            </NuxtLink>
            <NuxtLink 
              to="/about" 
              class="mobile-nav-link"
              @click="closeMenu"
            >
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
watch(() => route.path, () => {
  closeMenu()
})

// Close menu when clicking outside
onClickOutside(templateRef, () => {
  closeMenu()
})

// Handle escape key
useEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isMenuOpen.value) {
    closeMenu()
  }
})
</script>

<style scoped>
.nav-link {
  @apply flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
         hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 
         rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible;
}

.nav-link-active {
  @apply text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20;
}

.mobile-nav-link {
  @apply flex items-center space-x-3 px-3 py-3 text-base font-medium text-gray-700 dark:text-gray-300 
         hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 
         rounded-lg transition-colors duration-200 focus-visible;
}
</style>