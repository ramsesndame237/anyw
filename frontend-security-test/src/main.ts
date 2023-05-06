/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'



// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// setup fake backend
//@ts-ignore
import { fakeBackend } from './helpers/faker-backend.js';
import { useAuthStore } from './store/auth.store';
fakeBackend();

const app = createApp(App)

registerPlugins(app)
try {
    const authStore = useAuthStore();
    await authStore.refreshToken();
} catch {
    // catch error to start app on success or failure
}


app.mount('#app')
