/**
 * @describe: 清除所有公共状态数据 用于退出或重新登录
 * @author: cpl
 * @create: 2022-07-06 15:13:20
 */

import { defineStore } from 'pinia'
import { StoreNames } from './store-name'
import { useKeepAliveStore } from './keep-alive'
import { useUserStore } from './user'
import { useNavigationsStore } from './navigations'
import { useCipherStore } from './cipher'
import { useTokenRefreshStore } from './token-refresh'

type ResetActions = {
  reset: () => void
}

export const useResetStore = defineStore<string, {}, {}, ResetActions>(StoreNames.RESET, {
  actions: {
    // 清除所有公共状态数据
    reset() {
      const keepAliveStore = useKeepAliveStore()
      const userStore = useUserStore()
      const navigationsStore = useNavigationsStore()
      const cipherStore = useCipherStore()
      const tokenRefreshStore = useTokenRefreshStore()
      keepAliveStore.reset()
      userStore.reset()
      navigationsStore.reset()
      cipherStore.reset()
      tokenRefreshStore.reset()
    }
  }
})
