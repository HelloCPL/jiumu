/**
 * @describe: 用户相关数据
 * @author: cpl
 * @create: 2022-07-06 15:14:23
 */

import { defineStore, StoreDefinition } from 'pinia'
import { StoreNames } from './store-name'

export const useUserStore: StoreDefinition = defineStore(StoreNames.USER, {
  state: () => {
    return {
      token: '',
      tokenRefresh: '',
      userInfo: {},
      roles: [],
      permissions: [
        // {
        //   id: 'a909792d-9edb-4edc-a33a-ba491842d65f',
        //   code: 'test',
        //   label: '测试',
        //   href: '#',
        //   sort: 1,
        //   createTime: '2021-12-04 00:34:51',
        //   updateTime: '2021-12-04 00:36:00',
        //   terminal: '管理端',
        //   remarks: null,
        //   checked: false
        // }
      ],
      menus: [],
      tags: []
    }
  },
  actions: {
    clear() {
      this.token = ''
      this.tokenRefresh = ''
      this.userInfo = {}
      this.roles = []
      this.permissions = []
      this.menus = []
      this.tags = []
    },
    setToken(params: DataToken) {
      this.token = params.token
      this.tokenRefresh = params.tokenRefresh
    }
  },
  storage: {
    enabled: true
  }
})
