/*
 * 初始化注册markdown
 */

import { App } from 'vue'
import '@kangc/v-md-editor/lib/theme/style/github.css'
import '@kangc/v-md-editor/lib/style/base-editor.css'
// 注册Markdown编辑器
import VMdEditor from '@kangc/v-md-editor'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import hljs from 'highlight.js'

export const useInit = (app: App) => {
  VMdEditor.use(githubTheme, {
    Hljs: hljs
  })
  app.use(VMdEditor)
}
