import Aura from "@primevue/themes/aura"

export default defineNuxtConfig({
  nitro: undefined,
  $development: undefined, $env: undefined, $meta: undefined, $production: undefined, $test: undefined,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@primevue/nuxt-module'
  ],

  css: [
    'bootstrap/dist/css/bootstrap.min.css'
  ],

  plugins: [
    { src: '~/plugins/bootstrap.client.ts', mode: 'client' }
  ],

  primevue: {
    options: { ripple: true, unstyled: false, inputStyle: "outlined", theme: { preset: Aura } },
    components: {
      include: "*",
      exclude: ["Chart"],
    },
    directives: {
      include: "*",
      exclude: [],
    },
    composables: {
      include: "*",
    },
  }
})
