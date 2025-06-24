import { createApp } from 'vue'
import App from '@/App.vue'
// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

const app = createApp(App)

// Register Vuetify as plugin
const vuetify = createVuetify()
app.use(vuetify).mount('#app')
