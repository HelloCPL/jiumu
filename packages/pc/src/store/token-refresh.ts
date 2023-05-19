/**
 * @description 二次token刷新，单独存放
 * @author cpl
 * @create 2023-05-19 15:10:12
 */

import { defineStore } from 'pinia'
import { TokenRefreshActions, TokenRefreshState } from './token-refresh.b'
import { StoreNames } from './store-name'
import { storage } from '@jiumu/utils'
const { VITE_HOME_EXPIRE } = import.meta.env

export const useTokenRefreshStore = defineStore<string, TokenRefreshState, {}, TokenRefreshActions>(
  StoreNames.TOKEN_REFRESH,
  {
    state: () => {
      return {
        tokenRefresh: ''
      }
    },
    actions: {
      reset() {
        this.tokenRefresh = ''
        // 清除缓存
        storage.removeItem(StoreNames.TOKEN_REFRESH, {
          type: 'local',
          prefix: 'pinia'
        })
      },
      setTokenRefresh(tokenRefresh: string) {
        this.tokenRefresh = tokenRefresh
      }
    },
    storage: {
      enabled: true,
      type: 'local',
      expire: VITE_HOME_EXPIRE * 3
    }
  }
)
