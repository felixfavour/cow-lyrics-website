import { useHead } from 'nuxt/app'
import { ref, watchEffect } from 'vue'

/**
 * Helper composable to inject Schema.org structured data into the page head.
 * @param schema Array or object representing Schema.org structured data
 */
export default function useSchema(schema: object | object[]) {
  watchEffect(() => {
    useHead({
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(schema),
        },
      ],
    })
  })
}
