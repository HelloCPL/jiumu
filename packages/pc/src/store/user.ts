import { defineStore, StoreDefinition } from 'pinia'
import { StoreNames } from './store-name'

export const useUserStore: StoreDefinition = defineStore(StoreNames.USER, {
  state: () => {
    return {
      token: '',
      tokenRefresh: ''
    }
  },
  actions: {
    setToken(params: LoginOptions) {
      this.token = params.token
      this.tokenRefresh = params.tokenRefresh
    }
  }
})
