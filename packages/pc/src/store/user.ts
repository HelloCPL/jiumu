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
import { getPermissionListAllSelf } from '@/api/permission'
import { getMenuAllSelf } from '@/api/menu'
import { getTagAllSelf } from '@/api/tag'

export const useUserStore: StoreDefinition = defineStore(StoreNames.USER, {
  state: (): UserState => {
    return {
      token: '',
      tokenRefresh: '',
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
    getUser() {
      getUserSelf().then((res) => {
        if (res.code === 200) this.userInfo = res.data
      })
      getRoleListAllSelf().then((res) => {
        if (res.code === 200) this.roles = res.data
      })
      getPermissionListAllSelf().then((res) => {
        if (res.code === 200) this.permissions = res.data
      })
      getMenuAllSelf().then((res) => {
        if (res.code === 200) this.menus = res.data
      })
      getTagAllSelf().then((res) => {
        if (res.code === 200) this.tags = res.data
      })
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
