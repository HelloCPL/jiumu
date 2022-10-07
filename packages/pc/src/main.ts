import { createApp, App } from 'vue'
import { createPinia, Pinia } from 'pinia'
import AppComponent from './App.vue'
import { usePiniaStoragePlugin } from '@jiumu/utils'
import router from './router'
import { useMarkdownInit } from './components/Editor/components/EditorMd/hooks/use-markdown-init'
import { initEditorWangCustomMenus } from './components/Editor/components/EditorWang/hooks/editor-wang-custom-menus'
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

// 全局属性或方法
defineGlobal(app)
// 全局指令
defineDirective(app)

// pinia状态管理
const pinia: Pinia = createPinia()
pinia.use(usePiniaStoragePlugin)
app.use(pinia)

// 路由
app.use(router)

// 全局组件
useGlobalComponents(app)

// 富文本编辑器初始化
useMarkdownInit(app)
initEditorWangCustomMenus()

app.mount('#app')
