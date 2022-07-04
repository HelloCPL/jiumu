import { createApp, App } from 'vue'
import { createPinia, Pinia } from 'pinia'
import AppComponent from './App.vue'
import { usePiniaStoragePlugin } from '@jiumu/utils'
import router from './router'

const app: App = createApp(AppComponent)

const pinia: Pinia = createPinia()
pinia.use(usePiniaStoragePlugin)

app.use(pinia)
app.use(router)

app.mount('#app')
