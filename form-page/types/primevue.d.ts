
import 'nuxt/schema'

declare module 'nuxt/schema' {
  interface NuxtConfig {
    primevue?: {
      ripple?: boolean
      inputStyle?: string
      [key: string]: any
    }
  }
}

