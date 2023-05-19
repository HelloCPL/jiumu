/**
 * @description 个人口令相关数据
 * @author cpl
 * @create 2023-03-24 17:41:27
 */
import { defineStore } from 'pinia'
import { StoreNames } from './store-name'
import { CipherState, CipherAction } from './cipher.b'
import { storage } from '@jiumu/utils'

export const useCipherStore = defineStore<string, CipherState, {}, CipherAction>(StoreNames.CIPHER, {
  state: () => {
    return {
      code: false
    }
  },
  actions: {
    reset() {
      this.code = false
      // 清除缓存
      storage.removeItem(StoreNames.CIPHER, {
        type: 'session',
        prefix: 'pinia'
      })
    },

    setCode(bol: boolean) {
      this.code = bol
    }
  },
  storage: {
    enabled: true,
    encrypt: true,
    keys: ['code'],
    expire: 60 * 60 * 1 // 状态仅保存 1 小时
  }
})
