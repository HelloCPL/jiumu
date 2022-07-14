/**
 * @describe:
 * @author: cpl
 * @create: 2022-07-12 16:29:47
 */

import { defineStore, StoreDefinition } from 'pinia'
import { StoreNames } from './store-name'
import { isHomeRoutes } from '@/router/routes'
import { NavigationState } from './navigations.b'
import { KeepAliveOption } from './keep-alive.b'
import { storage } from '@jiumu/utils'
import { useKeepAliveStore } from './keep-alive'

export const useNavigationsStore: StoreDefinition = defineStore(StoreNames.NAVIGATIONS, {
  state: (): NavigationState => {
    return {
      navigations: [], // 导航栏集合
      routerName: '', // 当前home子页面路由名称
      isCollapse: false // 左侧栏是否展开
    }
  },
  getters: {
    routerNameIndex(state: NavigationState): number {
      let i = 0
      state.navigations.find((item, index) => {
        if (item.name === state.routerName) {
          i = index
          return true
        }
      })
      return i
    }
  },
  actions: {
    // 导航栏入栈
    _push(to: KeepAliveOption, routerName?: string) {
      let i1 = -1
      this.navigations.find((item, index) => {
        if (item.name === to.name && item.path === to.path) {
          i1 = index
          return true
        }
      })
      // 新导航栏入栈规则 默认在当前路由右侧
      if (i1 === -1) {
        if (routerName) {
          let i2 = -1
          this.navigations.find((item, index) => {
            if (item.name === routerName) {
              i2 = index
              return true
            }
          })
          if (i2 !== -1) {
            this.navigations.splice(i2 + 1, 0, to)
            return
          }
        }
        this.navigations.push(to)
      }
    },

    // 导航栏出栈
    _pop(to: KeepAliveOption) {
      let i1 = -1
      this.navigations.find((item, index) => {
        if (item.name === to.name && item.path === to.path) {
          i1 = index
          return true
        }
      })
      if (i1 !== -1) this.navigations.splice(i1, 1)
      // 清除缓存
      const keepAliveStore = useKeepAliveStore()
      keepAliveStore._pop(to)
    },

    // 清空缓存集合
    reset() {
      this.navigations = []
      this.routerName = ''
      // 清除缓存
      storage.removeItem(StoreNames.NAVIGATIONS, {
        type: 'session',
        prefix: 'pinia'
      })
    },

    // 导航栏存储处理
    handleNavigations(to: KeepAliveOption, from: KeepAliveOption) {
      // 加入缓存
      const keepAliveStore = useKeepAliveStore()
      const flagTo = isHomeRoutes(to.name)
      const flagFrom = isHomeRoutes(from.name)

      keepAliveStore.handleKeepAlive(to, from)
      if (flagFrom) {
        if (!(to.params.__routerType === 'push' || to.query.__routerType === 'push')) {
          this._pop(from)
        }
      }
      if (flagTo) {
        this.routerName = to.name
        this._push(to, <string>this.routerName)
      }
    }
  },
  storage: {
    type: 'session',
    enabled: true,
    expire: import.meta.env.VITE_HOME_EXPIRE
  }
})
