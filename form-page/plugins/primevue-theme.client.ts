import PrimeVue from "primevue/config"
import Aura from "@primevue/themes/lara"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, {
    ripple: true,
    unstyled: false,
    theme: {
      preset: Aura,
    },
  })
})
