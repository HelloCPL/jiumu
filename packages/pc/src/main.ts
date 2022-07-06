import { createApp, App } from 'vue'
import { createPinia, Pinia } from 'pinia'
import AppComponent from './App.vue'
import { usePiniaStoragePlugin } from '@jiumu/utils'
import router from './router'
import 'tailwindcss/tailwind.css'
import './utils/init-element-plus'
import 'element-plus/dist/index.css'
import './style/index.css'
import './style/d.scss'

const app: App = createApp(AppComponent)

const pinia: Pinia = createPinia()
pinia.use(usePiniaStoragePlugin)

app.use(pinia)
app.use(router)

app.mount('#app')
