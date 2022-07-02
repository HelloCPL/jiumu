import { createApp, App } from 'vue'
import { createPinia, Pinia } from 'pinia'
import AppComponent from './App.vue'
import { usePiniaPlugin } from './hooks/use-pinia-storage'
const app: App = createApp(AppComponent)

const store: Pinia = createPinia()
store.use(usePiniaPlugin())

app.use(store)

app.mount('#app')
