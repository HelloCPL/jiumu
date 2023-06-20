/*
 * 初始化注册markdown
 */

// import { App } from 'vue'
import { app } from '@/app'
// import 'mermaid'
import '@kangc/v-md-editor/lib/theme/style/github.css'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import '@kangc/v-md-editor/lib/style/preview-html.css'
// 注册Markdown编辑器
import VMdEditor from '@kangc/v-md-editor'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import hljs from 'highlight.js'
import { onTagAttr } from '@jiumu/utils'
// 引入tip插件
import createTipPlugin from '@kangc/v-md-editor/lib/plugins/tip/index'
import '@kangc/v-md-editor/lib/plugins/tip/tip.css'
// 引入流程图mermaid插件 注意：需要在index.html引入mermaid.min.js资源
// import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/cdn'
import '@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css'
// 引入任务列表插件
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index'
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css'
// 引入代码行号插件
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index'
// 高亮代码行
import createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index'
import '@kangc/v-md-editor/lib/plugins/highlight-lines/highlight-lines.css'
// 快速复制代码
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index'
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css'
// 内容定位
import createAlignPlugin from '@kangc/v-md-editor/lib/plugins/align'

export const useMarkdownInit = (createMermaidPlugin: any) => {
  if (window._initMarkdown_) return

  initMarkdown(VMdEditor, createMermaidPlugin)
  app.use(VMdEditor)
  initMarkdown(VMdPreview, createMermaidPlugin)
  app.use(VMdPreview)
  window._initMarkdown_ = '1'
}

const initMarkdown = async (comp: any, createMermaidPlugin: any) => {
  comp.use(githubTheme, {
    Hljs: hljs,
    codeHighlightExtensionMap: {
      vue: 'xml'
    }
  })
  // 扩展tip插件
  comp.use(createTipPlugin())
  // 扩展mermaid流程图
  comp.use(
    createMermaidPlugin({
      mermaidInitializeOptions: {
        // startOnLoad: true,
        // deterministicIds: true,
        // deterministicIDSeed: 'base',
        // fontSize: 36,
        // sectionFontSize: 36
      }
    })
  )
  // 扩展任务列表
  comp.use(createTodoListPlugin())
  // 扩展代码行号
  comp.use(createLineNumbertPlugin())
  // 扩展高亮代码
  comp.use(createHighlightLinesPlugin())
  // 扩展快速复制代码
  comp.use(createCopyCodePlugin())
  // 扩展内容定位
  comp.use(createAlignPlugin())
  // 扩展xss规则
  comp.xss.extend({
    css: false,
    onTagAttr
  })
}
