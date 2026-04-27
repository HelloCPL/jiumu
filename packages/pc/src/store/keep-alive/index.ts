/**
 * @author chen
 * @description 缓存集合
 * @update 2022-07-06 06:20:15
 */

import { defineStore } from 'pinia'
import { StoreNames } from '../store-name'
import { isHomeRoutes } from '@/router/routes'
import { getHistoryState, storage } from '@jiumu/utils'
import { RouteRecordName } from 'vue-router'

export const useKeepAliveStore = defineStore<string, KeepAliveState, KeepAliveGetters, KeepAliveActions>(
  StoreNames.KEEP_ALIVE,
  {
    state: () => {
      return {
        includes: [], // 缓存集合
        excludes: [], // 不缓存集合
        max: 50 // 最多缓存数量
      }
    },
    getters: {
      include: (state: KeepAliveState) =>
        state.includes.filter((item) => item && item.name).map((item) => <RouteRecordName>item.name),
      exclude: (state: KeepAliveState) =>
        state.excludes.filter((item) => item && item.name).map((item) => <RouteRecordName>item.name)
    },
    actions: {
      // 缓存入栈
      _push(to: KeepAliveOption) {
        if (!to) return
        // include入栈
        const i1 = this.includes.findIndex((item) => item.name === to.name && item.path === to.path)
        if (i1 === -1) this.includes.push(to)
        // exclude出栈
        const i2 = this.excludes.findIndex((item) => item.name === to.name && item.path === to.path)
        if (i2 !== -1) this.excludes.splice(i2, 1)
      },

      // 缓存出栈
      _pop(to: KeepAliveOption) {
        // include出栈
        if (!to) return
        const i1 = this.includes.findIndex((item) => item.name === to.name && item.path === to.path)
        if (i1 !== -1) this.includes.splice(i1, 1)
        // exclude入栈
        const i2 = this.excludes.findIndex((item) => item.name === to.name && item.path === to.path)
        if (i2 === -1) this.excludes.push(to)
      },

      // 寻找某一项缓存
      _find(name: string): KeepAliveOption | undefined {
        return this.includes.find((item) => item.name === name || item.path === name)
      },

      // 清空缓存集合
      reset() {
        this.includes = []
        this.excludes = []
        // 清除缓存
        storage.removeItem(StoreNames.KEEP_ALIVE, {
          type: 'session',
          prefix: 'pinia'
        })
      },

      // 缓存处理逻辑 只缓存home 子页面缓存
      handleKeepAlive(to: KeepAliveOption, from: KeepAliveOption) {
        const flagTo = isHomeRoutes(to.name)
        const flagFrom = isHomeRoutes(from.name)
        const replaced = getHistoryState('replaced')
        if (flagTo && flagFrom) {
          // to from 都属于home
          if (replaced === false) {
            this._push(to)
          } else if (replaced === true) {
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
          if (replaced === true || replaced === false) this._push(to)
          // 单独处理 meta.keepAlive 参数
          if (to.meta.keepAlive === true) this._push(to)
          else if (to.meta.keepAlive === false) this._pop(to)
        } else if (flagFrom) {
          // 仅 from 属于home
          if (replaced === true) this._pop(from)
          // 单独处理 meta.keepAlive 参数
          if (to.meta.keepAlive === true) this._push(from)
          else if (to.meta.keepAlive === false) this._pop(from)
        }
      },

      /**
       * 更新指定home的子页面 多个页面是否逗号隔开
       * names 路由 name 或 path
       * 这里仅作页面更新处理 不会移除 navigation 导航页面
       * 如需移除 navigation 页面请使用 navigations 的相关方法
       */
      refreshKeepAlive(names: string) {
        const target = names.split(',')
        target.forEach((name) => {
          const k = this._find(name)
          if (k) this._pop(k)
        })
      }
    },
    storage: {
      type: 'session',
      enabled: true,
      keys: ['includes', 'excludes']
    }
  }
)
