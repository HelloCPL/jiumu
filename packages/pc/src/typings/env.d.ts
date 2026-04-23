/// <reference types="vite/client" />
import { defineComponent } from 'vue'

interface ImportMetaEnv {
  readonly VITE_DIR: string
  readonly VITE_PORT: numer
  readonly VITE_MODE: string
  readonly VITE_PUBLIC_PATH: string
  readonly VITE_API_URL: string
  readonly VITE_TIME_OUT: number
  readonly VITE_HOME_EXPIRE: number
  readonly VITE_SESSION_EXPIRE: number
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}


declare module 'vue' {
  import { DefineComponent, Directive } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types

  export interface ComponentCustomProperties {
    vPermission: Directive<HTMLElement, string | PermissionOptions>
  }

  const component: DefineComponent<{}, {}, any>
  // const component: ReturnType<typeof DefineComponent>;
  export default component
}

declare global {
  // 解决 pnpm 子项目不能提示问题
  const defineOptions: typeof defineComponent

  interface Window {
    luckysheet: any
    _initEditorWangCustomMenus_: any
    _initMarkdown_: any
    mermaid: any
    LuckyExcel: any
    $: JQueryStatic
    jQuery: JQueryStatic
  }
}

// 全局组件声明
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    GRichText: typeof import('./src/components/global/RichText/index.vue')['default']
  }

  export interface App {
    __unmount?: Function
  }
}