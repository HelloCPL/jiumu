/**
 * @describe: 用户相关数据
 * @author: cpl
 * @create: 2022-07-06 15:14:23
 */

import { defineStore, StoreDefinition } from 'pinia'
import { StoreNames } from './store-name'
import { UserState } from './user.b'
import { storage } from '@jiumu/utils'
import { getUserSelf } from '@/api/user'
import { getRoleListAllSelf } from '@/api/role'
import { getMenuAllSelf } from '@/api/menu'
import { getTagAllSelf } from '@/api/tag'

export const useUserStore: StoreDefinition = defineStore(StoreNames.USER, {
  state: (): UserState => {
    return {
      token: '123',
      tokenRefresh: '123',
      userInfo: null,
      roles: [],
      permissions: [],
      menus: [],
      tags: []
    }
  },
  actions: {
    reset() {
      this.token = ''
      this.tokenRefresh = ''
      this.userInfo = null
      this.roles = []
      this.permissions = []
      this.menus = []
      this.tags = []
      // 清除缓存
      storage.removeItem(StoreNames.USER, {
        type: 'local',
        prefix: 'pinia'
      })
    },
    // 设置token
    setToken(params: DataToken) {
      this.token = params.token
      this.tokenRefresh = params.tokenRefresh
    },
    // 统一获取 用户信息 用户角色 用户权限 用户拥有菜单 用户特殊标签
    async getUser() {
      const res1 = await getUserSelf()
      if (res1.code === 200) this.userInfo = res1.data
      const res2 = await getRoleListAllSelf()
      if (res2.code === 200) this.roles = res2.data
      const res3 = await getMenuAllSelf()
      if (res3.code === 200) this.permissions = res3.data
      const res4 = await getMenuAllSelf()
      if (res4.code === 200) this.menus = res4.data
      const res5 = await getTagAllSelf()
      if (res5.code === 200) this.tags = res5.data
    }
  },
  storage: {
    enabled: true,
    type: 'local',
    encrypt: true,
    expire: 60 * 60 * 24,
    keys: ['token', 'tokenRefresh']
  }
})
