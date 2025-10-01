<template>
  <!-- Footer -->
  <footer class="bg-gray-900 text-white py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <!-- Brand Section -->
        <div class="lg:col-span-1">
          <h3 class="text-xl font-bold mb-4">Lyrics by Cloud of Worship</h3>
          <p class="text-gray-400 mb-4">
            Lyrics are populated based on Cloud of Worship users' usage, with
            their permission to share with other users like you.
          </p>
        </div>

        <!-- Unique Features -->
        <div>
          <h4 class="text-lg font-semibold mb-4 text-purple-400">
            UNIQUE FEATURES
          </h4>
          <ul class="space-y-2">
            <li>
              <a
                href="https://cloudofworship.com/features/browser-ready"
                class="text-gray-400 hover:text-white transition-colors"
              >
                Browser-ready UX
              </a>
            </li>
            <li>
              <a
                href="https://cloudofworship.com/features/offline-first"
                class="text-gray-400 hover:text-white transition-colors"
              >
                Offline-first experience
              </a>
            </li>
            <li>
              <a
                href="https://cloudofworship.com/features/team-workflow"
                class="text-gray-400 hover:text-white transition-colors"
              >
                Team workflow
              </a>
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h4 class="text-lg font-semibold mb-4 text-purple-400">RESOURCES</h4>
          <ul class="space-y-2">
            <li>
              <a
                href="https://cloudofworship.com/blog"
                class="text-gray-400 hover:text-white transition-colors"
              >
                Blog & Guides
              </a>
            </li>
            <li>
              <a
                href="https://cloudofworshippers.featurebase.app/roadmap"
                class="text-gray-400 hover:text-white transition-colors"
              >
                Roadmap
              </a>
            </li>
            <li>
              <a
                href="https://cloudofworship.com/changelog"
                class="text-gray-400 hover:text-white transition-colors"
              >
                What's new! 💜
              </a>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h4 class="text-lg font-semibold mb-4 text-purple-400">SUPPORT</h4>
          <ul class="space-y-2">
            <li>
              <a
                href="https://cloudofworship.com/contact"
                class="text-gray-400 hover:text-white transition-colors"
              >
                Contact CoW
              </a>
            </li>
            <li>
              <a
                href="https://cloudofworship.com/contact"
                class="text-gray-400 hover:text-white transition-colors"
              >
                Help Center (FAQs)
              </a>
            </li>
            <li>
              <a
                href="https://chat.whatsapp.com/DeQX11igCSU6YaOoTqY7GY"
                class="text-gray-400 hover:text-white transition-colors"
              >
                Join our Community
              </a>
            </li>
            <li>
              <a
                href="https://cloudofworship.com/pricing"
                class="text-gray-400 hover:text-white transition-colors"
              >
                Pricing
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Section -->
      <div
        class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
      >
        <div class="text-gray-400 text-sm mb-4 md:mb-0">
          © CoW Labs, All Rights Reserved, 2025
        </div>

        <div
          class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm"
        >
          <a
            href="https://cloudofworship.com/privacy-policy"
            class="text-gray-400 hover:text-white transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="https://cloudofworship.com/terms-of-service"
            class="text-gray-400 hover:text-white transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="mailto:hello@cloudofworship.com"
            class="text-gray-400 hover:text-white transition-colors"
          >
            hello@cloudofworship.com
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

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
