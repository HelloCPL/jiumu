/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DIR: string
  readonly VITE_MODE: string
  readonly VITE_PUBLIC_PATH: string
  readonly VITE_API_URL: string
  readonly VITE_STATIC_URL: string
  readonly VITE_TIME_OUT: number
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
