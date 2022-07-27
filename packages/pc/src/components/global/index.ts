/**
 * @author chen
 * @description 该目录下的组件为全局组件
 * @update 2022-07-25 15:49:27
 */

import { App } from 'vue'

const requireComp = import.meta.globEager('./**/index.vue')

const Comp: any = {}

Object.entries(requireComp).forEach(([k, v]) => {
  const key = 'G' + k.replace('./', '').replace('/index.vue', '')
  Comp[key] = v.default || v
})

export const useGlobalComponents = (app: App) => {
  for (let key in Comp) {
    app.component(key, Comp[key])
  }
}
