/**
 * @description 项目入口
 * @author cpl
 * @create 2023-04-10 15:42:28
 */

import { app } from './app'
import router from './router'
// css 处理
import 'element-plus/dist/index.css'
import '@wangeditor/editor/dist/css/style.css'
import '@jiumu/style/css/index.scss'

import { useGlobalComponents } from './components/global'
import { ElInfiniteScroll } from 'element-plus'
import { registerPermission } from './utils/permission'
import { registerLineClamp, usePiniaStoragePlugin } from '@jiumu/utils'
import { createPinia } from 'pinia'



// 全局指令
app.directive('InfiniteScroll', ElInfiniteScroll)
registerPermission(app)
registerLineClamp(app)

// pinia状态管理
const pinia = createPinia()
pinia.use(usePiniaStoragePlugin)
app.use(pinia)

// 路由
app.use(router)

// 全局组件
useGlobalComponents(app)

app.mount('#app')
