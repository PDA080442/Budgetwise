import './assets/main.css'
import { createApp } from 'vue'

import { createPinia } from 'pinia'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

const app = createApp(App)
const token = localStorage.getItem('accessToken')
if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`


app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
