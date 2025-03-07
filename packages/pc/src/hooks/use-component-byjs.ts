/**
 * @description 通过 js/ts 来调用组件
 * @author cpl
 * @create 2023-06-01 15:41:50
 */

import { Component, createApp, App } from 'vue'
import { defineGlobal, defineDirective, definePinia } from '@/utils/vue-global'
import router from '@/router'
import { isString, isElement } from 'lodash-es'

type Option = {
  name: string // 组件名称
  single?: boolean // 是否单例模式 默认 true
  isInitGlobal?: boolean // 是否挂载全局属性或方法 默认 true
  isInitDirective?: boolean // 是否挂载全局指令 默认 true
  isInitPinia?: boolean // 是否挂载 pinia 默认 true
  isInitRouter?: boolean // 是否挂载 路由 默认 false
  props?: ObjectAny // 传递给目标组件的属性，可通过该属性交互
  target?: string | Element // 挂载目标节点 id 默认 body
}

// 组件集合
const components: ObjectAny = {}

/*
 * 使用js调用的组件条件
 * 必须在 props 属性添加 unmount 销毁方法
 */
export const useComponentByjs = (comp: Component, option: Option) => {
  const single = option.single !== false
  const isInitGlobal = option.isInitGlobal !== false
  const isInitDirective = option.isInitDirective !== false
  const isInitPinia = option.isInitPinia !== false
  const isInitRouter = option.isInitRouter || false
  const props = option.props || {}

  if (!components[option.name]) components[option.name] = []
  const targetName: App[] = components[option.name]

  // 单例模式下删除原有的实例
  if (single && targetName.length) {
    while (targetName.length) {
      const temp = targetName.pop()
      if (temp) temp.unmount()
    }
  }

  // 处理挂载目标节点
  const targetDom = getTargetElement(option.target)
  const node = document.createElement('div')
  targetDom.appendChild(node)

  const app: App = createApp(comp, {
    ...props
  })

  if (isInitGlobal) defineGlobal(app)
  if (isInitDirective) defineDirective(app)
  if (isInitPinia) definePinia(app)
  if (isInitRouter) app.use(router)

  // 挂载组件
  app.mount(node)

  const __unmount__ = app.unmount

  const unmount = () => {
    __unmount__()
    targetDom.removeChild(node)
    let i = -1
    targetName.find((item, index) => {
      if (item._uid === app._uid) {
        i = index
        return true
      }
    })
    if (i !== -1) targetName.splice(i, 1)
  }
  app.unmount = unmount

  targetName.push(app)
  return app
}

/**
 * 获取一个目标元素，不传默认 document.body
 */
const getTargetElement = (target: any): Element => {
  let targetDom: Element | null = null
  if (isString(target) && target) {
    targetDom = document.getElementById(target) as Element
  } else if (isElement(target)) {
    targetDom = target as Element
  }
  return isElement(targetDom) ? (targetDom as Element) : document.body
}

/*
* 示例
import UserInfo from '@/views/components/UserInfo/index.vue'
import { useComponentByjs } from '@/hooks/use-component-byjs'

const comp = useComponentByjs(UserInfo, {
  name: 'user-info', 
  isInitRouter: true
})

onBeforeUnmount(() => comp.unmount())
*/
