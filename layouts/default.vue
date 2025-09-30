<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-primary-900">
    <!-- Navigation Header -->
    <header class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-primary-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <Icon name="heroicons:musical-note" class="w-5 h-5 text-white" />
            </div>
            <span class="font-bold text-xl text-gray-900 dark:text-white">Cloud Lyrics</span>
          </NuxtLink>
          
          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center space-x-8">
            <NuxtLink to="/" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Home
            </NuxtLink>
            <NuxtLink to="/search" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Search
            </NuxtLink>
            <NuxtLink to="/add-song" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Add Song
            </NuxtLink>
            <button @click="showAboutModal = true" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              About
            </button>
          </nav>
          
          <!-- Theme Toggle & Mobile Menu -->
          <div class="flex items-center space-x-4">
            <UButton
              @click="toggleColorMode"
              variant="ghost"
              :icon="$colorMode.value === 'dark' ? 'heroicons:sun' : 'heroicons:moon'"
              size="sm"
            />
            
            <!-- Mobile Menu Button -->
            <UButton
              @click="mobileMenuOpen = !mobileMenuOpen"
              variant="ghost"
              icon="heroicons:bars-3"
              size="sm"
              class="md:hidden"
            />
          </div>
        </div>
      </div>
      
      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen" class="md:hidden bg-white dark:bg-gray-900 border-t border-primary-200 dark:border-gray-700">
        <div class="px-4 py-2 space-y-1">
          <NuxtLink to="/" class="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600">Home</NuxtLink>
          <NuxtLink to="/search" class="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600">Search</NuxtLink>
          <NuxtLink to="/add-song" class="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600">Add Song</NuxtLink>
          <button @click="showAboutModal = true" class="block w-full text-left py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600">About</button>
        </div>
      </div>
    </header>
    
    <!-- Main Content -->
    <main>
      <slot />
    </main>
    
    <!-- Footer -->
    <footer class="bg-gray-900 dark:bg-black text-white py-12 mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center space-x-2 mb-4">
              <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <Icon name="heroicons:musical-note" class="w-5 h-5 text-white" />
              </div>
              <span class="font-bold text-xl">Cloud Lyrics</span>
            </div>
            <p class="text-gray-400 mb-4">Discover and share inspiring worship songs and lyrics with the Cloud of Worship community.</p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <Icon name="heroicons:globe-alt" class="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 class="font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2 text-gray-400">
              <li><NuxtLink to="/" class="hover:text-white transition-colors">Home</NuxtLink></li>
              <li><NuxtLink to="/search" class="hover:text-white transition-colors">Search Songs</NuxtLink></li>
              <li><NuxtLink to="/add-song" class="hover:text-white transition-colors">Add Song</NuxtLink></li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-semibold mb-4">Connect</h3>
            <ul class="space-y-2 text-gray-400">
              <li>
                <a href="https://app.cloudofworship.com" target="_blank" class="hover:text-white transition-colors">
                  Cloud of Worship App
                </a>
              </li>
              <li>
                <button @click="showAboutModal = true" class="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {{ new Date().getFullYear() }} Cloud of Worship. All rights reserved.</p>
        </div>
      </div>
    </footer>
    
    <!-- About Modal -->
    <UModal v-model="showAboutModal">
      <UCard>
        <template #header>
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <Icon name="heroicons:musical-note" class="w-5 h-5 text-white" />
            </div>
            <h3 class="text-xl font-semibold">About Cloud of Worship</h3>
          </div>
        </template>
        
        <div class="space-y-4">
          <p class="text-gray-600 dark:text-gray-300">
            Cloud of Worship is a comprehensive platform designed to enhance your worship experience through technology. 
            Our mission is to connect believers worldwide through the power of worship music and lyrics.
          </p>
          
          <div class="space-y-2">
            <h4 class="font-semibold text-gray-900 dark:text-white">Features:</h4>
            <ul class="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
              <li>Comprehensive song and hymn database</li>
              <li>Real-time presentation tools</li>
              <li>Scripture integration</li>
              <li>Multi-language support</li>
              <li>Cloud synchronization</li>
            </ul>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-3 pt-4">
            <UButton
              color="primary"
              size="lg"
              :to="'https://app.cloudofworship.com'"
              target="_blank"
              external
              class="flex-1"
            >
              <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4 mr-2" />
              Visit Cloud of Worship
            </UButton>
            <UButton
              variant="outline"
              size="lg"
              @click="showAboutModal = false"
              class="flex-1"
            >
              Close
            </UButton>
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
const colorMode = useColorMode()
const mobileMenuOpen = ref(false)
const showAboutModal = ref(false)

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

// Close mobile menu when navigating
watch(() => useRoute().path, () => {
  mobileMenuOpen.value = false
})
</script>