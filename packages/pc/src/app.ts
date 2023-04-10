/**
 * @description 分离app 保证某些模块可按需引用
 * @author cpl
 * @create 2023-04-10 15:40:58
 */

import { createApp, App } from 'vue'
import AppComponent from './App.vue'

export const app: App = createApp(AppComponent)
