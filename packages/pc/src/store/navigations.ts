/**
 * @describe:
 * @author: cpl
 * @create: 2022-07-12 16:29:47
 */

import { defineStore, StoreDefinition } from 'pinia'
import { StoreNames } from './store-name'
import { getHomeRoutes, HomeRouteRecord } from '@/router/routes'
import { NavigationState } from './navigations.b'
import { KeepAliveOption } from './keep-alive.b'
import { storage } from '@jiumu/utils'
import { useKeepAliveStore } from './keep-alive'

export const useNavigationsStore: StoreDefinition = defineStore(StoreNames.NAVIGATIONS, {
  state: (): NavigationState => {
    return {
      navigations: [], // 导航栏集合
      routerName: '', // 当前home子页面路由名称
      oldRouterName: '', // 上一个home页面路由名称
      isCollapse: false // 左侧栏是否展开
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
      this.oldRouterName = ''
      // 清除缓存
      storage.removeItem(StoreNames.NAVIGATIONS, {
        type: 'session',
        prefix: 'pinia'
      })
    },

    // 导航栏存储处理
    handleNavigations(to: KeepAliveOption, from: KeepAliveOption) {
      const homeRoutes = getHomeRoutes()
      const flagTo = _findInHomeRoutes(to, homeRoutes)
      const flagFrom = _findInHomeRoutes(from, homeRoutes)
      if (flagTo) {
        if (to.params.__routerType === 'push' || to.query.__routerType === 'push') {
          this._push(to, <string>this.routerName)
          this.oldRouterName = this.routerName
          this.routerName = to.name
        }
      }
      // if (flagTo && flagFrom) {
      //   // to from 都属于home
      //   if (to.params.__routerType === 'push' || to.query.__routerType === 'push') {
      //     this._push(to, <string>this.routerName)
      //   } else if (to.params.__routerType === 'replace' || to.query.__routerType === 'replace') {
      //     this._push(to, <string>this.routerName)
      //     this._pop(from)
      //   } else {
      //     this._pop(from)
      //   }
      //   this.oldRouterName = this.routerName
      //   this.routerName = to.name
      // } else if (flagTo) {
      //   // 仅 to 属于home
      //   const flag =
      //     to.params.__routerType === 'push' ||
      //     to.query.__routerType === 'push' ||
      //     to.params.__routerType === 'replace' ||
      //     to.query.__routerType === 'replace'
      //   if (flag) this._push(to, <string>this.routerName)
      //   this.oldRouterName = this.routerName
      //   this.routerName = to.name
      // } else if (flagFrom) {
      //   // 仅 from 属于home
      //   const flag = !(to.params.__routerType === 'push' || to.query.__routerType === 'push')
      //   if (flag) this._pop(from)
      // }
    }
  },
  storage: {
    type: 'session',
    enabled: true,
    expire: import.meta.env.VITE_HOME_EXPIRE
  }
})

// 查找是否在home路由页面
function _findInHomeRoutes(to: KeepAliveOption, homeRoutes: HomeRouteRecord[]): boolean {
  let flag = false
  homeRoutes.find((item) => {
    if (to.name === item.name || to.path === item.path) {
      flag = true
      return flag
    }
  })
  return flag
}
