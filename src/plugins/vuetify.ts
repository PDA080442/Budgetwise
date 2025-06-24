// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'
import { defineNuxtPlugin } from 'nuxt/app' // ← вот это

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    // ваша конфигурация Vuetify
  })
  nuxtApp.vueApp.use(vuetify)
})
