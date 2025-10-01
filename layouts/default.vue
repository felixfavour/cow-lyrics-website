<template>
  <div class="min-h-screen gradient-bg">
    <!-- Navigation Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center space-x-3">
            <img src="/cow-logo.svg" alt="Cloud of Worship" class="w-8 h-8" />
            <span class="font-bold text-xl text-gray-800">Cloud Lyrics</span>
          </NuxtLink>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center space-x-8">
            <NuxtLink
              to="/"
              class="text-gray-600 hover:text-purple-600 transition-colors font-medium px-3 py-2 rounded-lg"
            >
              Home
            </NuxtLink>
            <NuxtLink
              to="/search"
              class="text-gray-600 hover:text-purple-600 transition-colors font-medium px-3 py-2 rounded-lg"
            >
              Search
            </NuxtLink>
            <NuxtLink
              to="/add-song"
              class="text-gray-600 hover:text-purple-600 transition-colors font-medium px-3 py-2 rounded-lg"
            >
              Add Song
            </NuxtLink>
            <button
              @click="showAboutModal = true"
              class="text-gray-600 hover:text-purple-600 transition-colors font-medium px-3 py-2 rounded-lg"
            >
              About
            </button>
          </nav>

          <!-- Action Buttons -->
          <div class="flex items-center space-x-3">
            <!-- Search Button -->
            <NuxtLink
              to="/search"
              class="hidden sm:flex items-center px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all rounded-lg"
            >
              <Icon name="heroicons:magnifying-glass" class="w-5 h-5 mr-2" />
              <span class="font-medium">Search</span>
            </NuxtLink>

            <!-- Add Song Button -->
            <NuxtLink
              to="/add-song"
              class="hidden sm:inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              <Icon name="heroicons:plus" class="w-4 h-4 mr-2" />
              Add Song
            </NuxtLink>

            <!-- Mobile Menu Button -->
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="p-2 text-gray-600 hover:text-gray-900 transition-colors sm:hidden rounded-lg hover:bg-gray-100"
            >
              <Icon name="heroicons:bars-3" class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-if="mobileMenuOpen"
        class="md:hidden bg-white border-t border-gray-200"
      >
        <div class="px-4 py-4 space-y-2">
          <NuxtLink
            to="/"
            class="block py-3 px-4 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all font-medium"
            >Home</NuxtLink
          >
          <NuxtLink
            to="/search"
            class="block py-3 px-4 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all font-medium"
            >Search</NuxtLink
          >
          <NuxtLink
            to="/add-song"
            class="block py-3 px-4 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all font-medium"
            >Add Song</NuxtLink
          >
          <button
            @click="showAboutModal = true"
            class="block w-full text-left py-3 px-4 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all font-medium"
          >
            About
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 py-8 mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <!-- Logo and Copyright -->
          <div class="flex items-center space-x-4">
            <img src="/cow-logo.svg" alt="Cloud of Worship" class="w-6 h-6" />
            <span class="text-gray-600 text-sm">
              &copy; {{ new Date().getFullYear() }} Cloud of Worship. All rights
              reserved.
            </span>
          </div>

          <!-- Links -->
          <div class="flex items-center space-x-6">
            <a
              href="https://app.cloudofworship.com"
              target="_blank"
              class="text-purple-600 hover:text-purple-700 transition-colors text-sm font-medium"
            >
              Visit Cloud of Worship
            </a>
            <button
              @click="showAboutModal = true"
              class="text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              About
            </button>
          </div>
        </div>
      </div>
    </footer>

    <!-- About Modal -->
    <UModal v-model="showAboutModal">
      <div class="glass-card p-8 max-w-lg mx-auto">
        <div class="flex items-center space-x-3 mb-6">
          <div
            class="w-12 h-12 gradient-accent rounded-xl flex items-center justify-center"
          >
            <Icon name="heroicons:musical-note" class="w-6 h-6 text-white" />
          </div>
          <h3 class="text-2xl font-bold text-gray-800">
            About Cloud of Worship
          </h3>
        </div>

        <div class="space-y-6">
          <p class="text-gray-600 leading-relaxed">
            Cloud of Worship is a comprehensive platform designed to enhance
            your worship experience through technology. Our mission is to
            connect believers worldwide through the power of worship music and
            lyrics.
          </p>

          <div class="space-y-3">
            <h4 class="font-semibold text-gray-800 text-lg">Features:</h4>
            <ul class="text-gray-600 space-y-2 ml-4">
              <li class="flex items-center">
                <span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Comprehensive song and hymn database
              </li>
              <li class="flex items-center">
                <span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Real-time presentation tools
              </li>
              <li class="flex items-center">
                <span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Scripture integration
              </li>
              <li class="flex items-center">
                <span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Multi-language support
              </li>
              <li class="flex items-center">
                <span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Cloud synchronization
              </li>
            </ul>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 pt-4">
            <a
              href="https://app.cloudofworship.com"
              target="_blank"
              class="btn-primary flex-1 text-center"
            >
              <Icon
                name="heroicons:arrow-top-right-on-square"
                class="w-4 h-4 mr-2 inline"
              />
              Visit Cloud of Worship
            </a>
            <button
              @click="showAboutModal = false"
              class="btn-secondary flex-1"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup>
const colorMode = useColorMode()
const mobileMenuOpen = ref(false)
const showAboutModal = ref(false)

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark"
}

// Close mobile menu when navigating
watch(
  () => useRoute().path,
  () => {
    mobileMenuOpen.value = false
  }
)
</script>
