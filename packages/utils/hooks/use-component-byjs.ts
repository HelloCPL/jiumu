/**
 * @description 通过 js/ts 来调用组件
 * @author cpl
 * @create 2023-06-01 15:41:50
 */

import { Component, createApp, App, getCurrentInstance } from 'vue'
import { isString, isElement } from 'lodash-es'

type Option = {
  name: string // 组件名称
  props?: ObjectAny // 传递给目标组件的属性，可通过该属性交互
  target?: string | Element // 挂载目标节点 id 默认 body
  single?: boolean // 是否单例模式 默认 true
  inheritApp?: boolean | App // 是否继承当前调用处的app实例，或直接传入app实例
  beforeMount?: (app: App) => void // 挂载前回调 可自定义挂载插件或属性
  mounted?: (app: App) => void // 挂载后回调
}

// 组件集合
const components: ObjectAny = {}

/*
 * 使用js调用的组件条件
 * 必须在 props 属性添加 unmount 销毁方法
 */
export const useComponentByjs = (comp: Component, option: Option) => {
  const single = option.single !== false
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

  let app: App
  let parentApp: App | null = null
  if (option.inheritApp) {
    if (typeof option.inheritApp === 'boolean') {
      const instance = getCurrentInstance()
      parentApp = (instance?.appContext.app as App) || null
    } else {
      parentApp = option.inheritApp
    }
  }

  if (parentApp) {
    app = createApp(comp, {
      ...props
    })
    app.config = parentApp.config
    if (parentApp?._context?.plugins) {
      parentApp._context.plugins.forEach((plugin: any) => {
        if (Array.isArray(plugin)) {
          app.use(plugin[0], plugin[1])
        } else {
          app.use(plugin)
        }
      })
    }
    if (parentApp?._context?.provides) {
      Object.assign(app._context.provides, parentApp._context.provides)
    }
    if (parentApp?._context?.components) {
      Object.assign(app._context.components, parentApp._context.components)
    }
    if (parentApp?._context?.directives) {
      Object.assign(app._context.directives, parentApp._context.directives)
    }
  } else {
    app = createApp(comp, {
      ...props
    })
  }

  if (option.beforeMount) option.beforeMount(app)

  // 挂载组件
  app.mount(node)
  if (option.mounted) option.mounted(app)

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
})

onBeforeUnmount(() => comp.unmount())
*/
