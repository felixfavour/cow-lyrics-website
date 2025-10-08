export default defineNuxtConfig({
  devtools: { enabled: false },

  compatibilityDate: '2024-06-01',

  ssr: true,

  modules: ['@nuxt/ui', '@pinia/nuxt', '@vueuse/nuxt', '@nuxthub/core', 'nuxt-gtag'],

  colorMode: false,

  // Static Site Generation Configuration
  nitro: {
    prerender: {
      routes: ['/sitemap.xml', '/robots.txt', '/songs']
    }
  },

  // SEO Configuration
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://lyrics.cloudofworship.com',
    name: 'Cloud of Worship Lyrics',
    description: 'Discover and share Christian worship song lyrics with the community',
    defaultLocale: 'en'
  },

  // App Configuration
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      title: 'Cloud of Worship Lyrics - Christian Worship Songs',
      meta: [
        { name: 'theme-color', content: '#8B5CF6' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/manifest.json' }
      ]
    }
  },

  // UI Configuration
  ui: {
    global: true,
    icons: ['heroicons', 'simple-icons']
  },

  // CSS Configuration
  css: ['~/assets/css/main.css'],

  // Runtime Configuration
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'https://api.cloudofworship.com',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://lyrics.cloudofworship.com',
      gtag: process.env.NUXT_PUBLIC_GTAG
    }
  },

  imports: {
    dirs: ['composables', 'composables/**']
  },

  // Build Configuration
  build: {
    transpile: ['@nuxtjs/google-fonts']
  },

  // Experimental features
  experimental: {
    payloadExtraction: false
  },

  // Google Analytics Configuration
  gtag: {
    id: 'G-SNYRZMECTP'
  }
})