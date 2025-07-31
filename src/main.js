import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import vuetify from './plugins/vuetify' // Importa Vuetify

import App from './App.vue'
import router from './router'

// Configuración global de Axios al cargar la app
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify) // Usa Vuetify

app.mount('#app')
