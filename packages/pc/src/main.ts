import { createApp, App } from 'vue'
import { createPinia, Pinia } from 'pinia'
import AppComponent from './App.vue'
import { usePiniaStoragePlugin } from '@jiumu/utils'
import router from './router'
// css 处理
import './style/css/reset.scss'
import './style/css/root.scss'
import './style/init-element-plus'
import './style/css/element-root.scss'
import './style/css/tailwind.css'
import './style/css/index.scss'

const app: App = createApp(AppComponent)

const pinia: Pinia = createPinia()
pinia.use(usePiniaStoragePlugin)

app.use(pinia)
app.use(router)

app.mount('#app')
