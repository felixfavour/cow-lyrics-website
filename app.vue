<template>
  <div id="__nuxt" class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <AppHeader />
    <main class="flex-1">
      <NuxtPage />
    </main>
    <AppFooter />
    
    <!-- Global notifications -->
    <UNotifications />
    
    <!-- Loading indicator -->
    <NuxtLoadingIndicator color="#A855F7" />
  </div>
</template>

<script setup lang="ts">
// Global SEO configuration
useSeoMeta({
  titleTemplate: '%s | Cloud of Worship Lyrics',
  description: 'Discover and share Christian worship song lyrics with the community. Find recently added songs and popular artists.',
  ogImage: '/og-image.jpg',
  ogImageAlt: 'Cloud of Worship Lyrics - Christian Worship Songs',
  twitterCard: 'summary_large_image',
  twitterSite: '@cloudofworship',
  twitterCreator: '@cloudofworship'
})

// Global structured data
useSchemaOrg([
  {
    '@type': 'WebSite',
    name: 'Cloud of Worship Lyrics',
    url: 'https://lyrics.cloudofworship.com',
    description: 'Discover and share Christian worship song lyrics with the community',
    publisher: {
      '@type': 'Organization',
      name: 'Cloud of Worship',
      url: 'https://app.cloudofworship.com',
      logo: 'https://lyrics.cloudofworship.com/logo.png'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://lyrics.cloudofworship.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  }
])

// Initialize color mode
const colorMode = useColorMode()

// Preload critical fonts
useHead({
  link: [
    {
      rel: 'preload',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
      as: 'style'
    }
  ]
})

// Performance monitoring
onMounted(() => {
  // Track page load performance
  if (typeof window !== 'undefined' && 'performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navigation) {
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart
      console.log(`Page loaded in ${loadTime}ms`)
    }
  }
})
</script>

<style>
html {
  font-family: 'Inter', sans-serif;
  scroll-behavior: smooth;
}

body {
  @apply antialiased;
}

/* Fix for iOS safari bounce */
html, body {
  overflow-x: hidden;
  position: relative;
  height: 100%;
}

#__nuxt {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>