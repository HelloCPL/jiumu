/**
 * @describe: 清除所有公共状态数据 用于退出或重新登录
 * @author: cpl
 * @create: 2022-07-06 15:13:20
 */

import { defineStore, StoreDefinition } from 'pinia'
import { StoreNames } from './store-name'
import { useKeepAliveStore } from './keep-alive'
import { useUserStore } from './user'

export const useResetStore: StoreDefinition = defineStore(StoreNames.RESET, {
  actions: {
    // 清除所有公共状态数据
    reset() {
      const keepAliveStore = useKeepAliveStore()
      const userStore = useUserStore()
      keepAliveStore.reset()
      userStore.reset()
    }
  }
})
