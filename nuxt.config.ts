import type { NuxtPage } from "nuxt/schema";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: [
		'@nuxtjs/tailwindcss',
		'@vueuse/nuxt',
		'@hypernym/nuxt-gsap',
    '@pinia/nuxt',
    '@nuxt/test-utils/module'
	],
	gsap: {
		composables: true,
		provide: false,
  },
  hooks: {
    'pages:extend' (pages) {
      // remove ts routes
      function removePagesMatching (pattern: RegExp, pages: NuxtPage[] = []) {
        const pagesToRemove = []
        for (const page of pages) {
          if (page.file && pattern.test(page.file)) {
            pagesToRemove.push(page)
          } else {
            removePagesMatching(pattern, page.children)
          }
        }
        for (const page of pagesToRemove) {
          pages.splice(pages.indexOf(page), 1)
        }
      }
      removePagesMatching(/\.ts$/, pages)
      removePagesMatching(/\.md$/, pages)
    }
  },
	ssr: false,
});