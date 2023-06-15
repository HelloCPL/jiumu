/**
 * @description 项目入口
 * @author cpl
 * @create 2023-04-10 15:42:28
 */

import { app } from './app'
import router from './router'
// css 处理
import './style/css/reset.scss'
import 'element-plus/dist/index.css'
import '@wangeditor/editor/dist/css/style.css'
import './style/css/wang-editor-root.scss'
import './style/css/element-root.scss'
import './style/css/index.scss'

import { useGlobalComponents } from './components/global'
import { defineGlobal, defineDirective, definePinia } from './utils/vue-global'

import '@/assets/lib/mermaid.min.js'

// 全局属性或方法
defineGlobal(app)

// 全局指令
defineDirective(app)

// pinia状态管理
definePinia(app)

// 路由
app.use(router)

// 全局组件
useGlobalComponents(app)

app.mount('#app')
