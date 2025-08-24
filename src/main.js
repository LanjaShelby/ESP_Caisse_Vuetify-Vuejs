/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Pinia
import { createPinia } from 'pinia'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Styles
import 'unfonts.css'

const app = createApp(App)
const pinia = createPinia()

registerPlugins(app)

app.mount('#app')

app.use(pinia)
