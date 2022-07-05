/**
 * @author chen
 * @description 缓存集合
 * @update 2022-07-06 06:20:15
 */

import { defineStore, StoreDefinition } from 'pinia'
import { StoreNames } from './store-name'
import { KeepAliveState, KeepAliveOption } from './keep-alive.interface'

export const useKeepAliveStore: StoreDefinition = defineStore(StoreNames.kEEP_ALIVE, {
  state: (): KeepAliveState => {
    return {
      include: [], // 缓存集合
      exclude: [], // 不缓存集合
      max: 50 // 最多缓存数量
    }
  },
  getters: {},
  actions: {
    handleKeepAlive(to: KeepAliveOption, from: KeepAliveOption) {
      console.log(111, to, from)
    }
  }
})
