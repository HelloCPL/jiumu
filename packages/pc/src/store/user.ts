/**
 * @describe: 用户相关数据
 * @author: cpl
 * @create: 2022-07-06 15:14:23
 */

import { defineStore } from 'pinia'
import { StoreNames } from './store-name'
import { UserState, UserActions, UserInfoType } from './user.b'
import { storage } from '@jiumu/utils'
import { getUserSelf } from '@/api/user'
import { getRoleListAllSelf } from '@/api/role'
import { getPermissionListAllSelf } from '@/api/permission'
import { getMenuAllSelf } from '@/api/menu'
import { getTagAllSelf } from '@/api/tag'
const { VITE_HOME_EXPIRE } = import.meta.env
import { updateHomesMetaByMenus } from '@/router/routes'

export const useUserStore = defineStore<string, UserState, {}, UserActions>(StoreNames.USER, {
  state: () => {
    return {
      token: '',
      userInfo: null,
      roles: [],
      permissions: [
        // { id: 'xx', code: 'box1', label: '1', sort: 1, createTime: '', terminal: '' },
        // { id: 'xxx', code: 'box2', label: '2', sort: 1, createTime: '', terminal: '' },
        // { id: 'xxx', code: 'box3', label: '3', sort: 1, createTime: '', terminal: '' }
      ],
      menus: [],
      tags: []
    }
  },
  actions: {
    reset() {
      this.token = ''
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
    setToken(token: string) {
      this.token = token
    },

    // 统一更新用户信息 1 用户信息 2 用户角色 3 用户权限 4 用户拥有菜单 5 用户特殊标签
    updateUser(type: string = '12345'): Promise<any> {
      return new Promise((resolve) => {
        if (type.includes('1'))
          getUserSelf().then((res) => {
            if (res.code === 200) {
              this.userInfo = res.data
              resolve(res.data)
            }
          })
        if (type.includes('2'))
          getRoleListAllSelf().then((res) => {
            if (res.code === 200) {
              this.roles = res.data
              resolve(res.data)
            }
          })
        if (type.includes('3'))
          getPermissionListAllSelf().then((res) => {
            if (res.code === 200) {
              this.permissions = res.data
              resolve(res.data)
            }
          })
        if (type.includes('4'))
          getMenuAllSelf().then((res) => {
            if (res.code === 200) {
              this.menus = res.data
              updateHomesMetaByMenus(res.data)
              resolve(res.data)
            }
          })
        if (type.includes('5'))
          getTagAllSelf().then((res) => {
            if (res.code === 200) {
              this.tags = res.data
              resolve(res.data)
            }
          })
      })
    },

    // 获取用户信息 1 用户信息 2 用户角色 3 用户权限 4 用户拥有菜单 5 用户特殊标签
    // 避免无法获取信息的情况
    getUser(type: UserInfoType): Promise<any> {
      return new Promise((resolve) => {
        if (type === '1') {
          if (this.userInfo) resolve(this.userInfo)
          else this.updateUser('1').then((res) => resolve(res))
        } else if (type === '2') {
          if (this.roles && this.roles.length) resolve(this.roles)
          else this.updateUser('2').then((res) => resolve(res))
        } else if (type === '3') {
          if (this.permissions && this.permissions.length) resolve(this.permissions)
          else this.updateUser('3').then((res) => resolve(res))
        } else if (type === '4') {
          if (this.menus && this.menus.length) resolve(this.menus)
          else this.updateUser('4').then((res) => resolve(res))
        } else if (type === '5') {
          if (this.tags && this.tags.length) resolve(this.tags)
          else this.updateUser('5').then((res) => resolve(res))
        }
      })
    }
  },
  storage: {
    enabled: true,
    type: 'local',
    expire: VITE_HOME_EXPIRE * 2
  }
})
