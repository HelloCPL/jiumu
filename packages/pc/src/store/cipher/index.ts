/**
 * @description 个人口令相关数据
 * @author cpl
 * @create 2023-03-24 17:41:27
 */
import { defineStore } from 'pinia'
import { StoreNames } from '../store-name'
import { storage } from '@jiumu/utils'

export const useCipherStore = defineStore<string, CipherState, ObjectAny, CipherAction>(StoreNames.CIPHER, {
  state: () => {
    return {
      code: ''
    }
  },
  actions: {
    reset() {
      this.code = ''
      // 清除缓存
      storage.removeItem(StoreNames.CIPHER, {
        type: 'session',
        prefix: 'pinia'
      })
    },

    setCode(code: string) {
      this.code = code
    }
  },
  storage: {
    enabled: true,
    encrypt: true,
    keys: ['code'],
    expire: 60 * 5 // 状态仅保存 5 分钟
  }
})
