import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'

const app = createApp(App)

const token = localStorage.getItem('accessToken')
if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
