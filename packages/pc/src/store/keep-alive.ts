/**
 * @author chen
 * @description 缓存集合
 * @update 2022-07-06 06:20:15
 */

import { defineStore, StoreDefinition } from 'pinia'
import { StoreNames } from './store-name'
import { KeepAliveState, KeepAliveOption } from './keep-alive.interface'
import { getHomeRoutes, HomeRouteRecord } from '@/router/routes'

export const useKeepAliveStore: StoreDefinition = defineStore(StoreNames.KEEP_ALIVE, {
  state: (): KeepAliveState => {
    return {
      includes: [], // 缓存集合
      excludes: [], // 不缓存集合
      max: 50 // 最多缓存数量
    }
  },
  getters: {
    include: (state: KeepAliveState) =>
      state.includes.filter((item) => item && item.name).map((item) => item.name),
    exclude: (state: KeepAliveState) =>
      state.excludes.filter((item) => item && item.name).map((item) => item.name)
  },
  actions: {
    // 缓存入栈
    _push(to: KeepAliveOption) {
      // include入栈
      let i1 = -1
      this.includes.find((item, index) => {
        if (item.name === to.name && item.path === to.path) {
          i1 = index
          return true
        }
      })
      if (i1 === -1) this.includes.push(to)
      // exclude出栈
      let i2 = -1
      this.excludes.find((item, index) => {
        if (item.name === to.name && item.path === to.path) {
          i2 = index
          return true
        }
      })
      if (i2 !== -1) this.excludes.splice(i2, 1)
    },

    // 缓存出栈
    _pop(to: KeepAliveOption) {
      // include出栈
      let i1 = -1
      this.includes.find((item, index) => {
        if (item.name === to.name && item.path === to.path) {
          i1 = index
          return true
        }
      })
      if (i1 !== -1) this.includes.splice(i1, 1)
      // exclude入栈
      let i2 = -1
      this.excludes.find((item, index) => {
        if (item.name === to.name && item.path === to.path) {
          i2 = index
          return true
        }
      })
      if (i2 === -1) this.excludes.push(to)
    },

    // 清空缓存集合
    reset() {
      this.includes = []
      this.excludes = []
    },

    // 缓存处理逻辑 只缓存home 子页面缓存
    handleKeepAlive(to: KeepAliveOption, from: KeepAliveOption) {
      const homeRoutes = getHomeRoutes()
      const flagTo = _findInHomeRoutes(to, homeRoutes)
      const flagFrom = _findInHomeRoutes(from, homeRoutes)
      if (flagTo && flagFrom) {
        // to from 都属于home
        if (to.params.__routerType === 'push' || to.query.__routerType === 'push') {
          this._push(to)
        } else if (
          from.params.__routerType === 'replace' ||
          from.query.__routerType === 'replace'
        ) {
          this._push(to)
          this._pop(from)
        } else {
          this._pop(from)
        }
        // 单独处理 meta.keepAlive 参数
        if (to.meta.keepAlive === true) this._push(to)
        else if (to.meta.keepAlive === false) this._pop(to)
        if (from.meta.keepAlive === true) this._push(from)
        else if (from.meta.keepAlive === false) this._pop(from)
      } else if (flagTo) {
        // 仅 to 属于home
        const flag =
          to.params.__routerType === 'push' ||
          to.query.__routerType === 'push' ||
          from.params.__routerType === 'replace' ||
          from.query.__routerType === 'replace'
        if (flag) this._push(to)
        // 单独处理 meta.keepAlive 参数
        if (to.meta.keepAlive === true) this._push(to)
        else if (to.meta.keepAlive === false) this._pop(to)
      } else if (flagFrom) {
        // 仅 from 属于home
        const flag = to.params.__routerType !== 'push' && to.query.__routerType !== 'push'
        if (flag) this._pop(from)
        // 单独处理 meta.keepAlive 参数
        if (from.meta.keepAlive === true) this._push(from)
        else if (from.meta.keepAlive === false) this._pop(from)
      }
    }
  },
  storage: {
    enabled: true
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
