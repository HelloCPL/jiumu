import { createApp, App } from 'vue'
import { createPinia, Pinia } from 'pinia'
import AppComponent from './App.vue'
import { usePiniaStoragePlugin } from '@jiumu/utils'
import router from './router'
// css 处理
import './style/css/reset.scss'
import 'element-plus/dist/index.css'
import '@wangeditor/editor/dist/css/style.css'
import './style/css/wang-editor-root.scss'
import './style/css/element-root.scss'
import './style/css/index.scss'
import { useGlobalComponents } from './components/global'

import { defineGlobal, defineDirective } from './utils/vue-global'

const app: App = createApp(AppComponent)

defineGlobal(app)
defineDirective(app)

const pinia: Pinia = createPinia()
pinia.use(usePiniaStoragePlugin)

app.use(pinia)
app.use(router)

useGlobalComponents(app)

app.mount('#app')
