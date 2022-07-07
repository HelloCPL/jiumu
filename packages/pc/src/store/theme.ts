/**
 * @author chen
 * @description 主题相关数据
 * @update 2022-07-07 21:43:45
 */

import { defineStore, StoreDefinition } from 'pinia'
import { StoreNames } from './store-name'
import { ThemeState } from './theme.interface'

export const useThemeStore: StoreDefinition = defineStore(StoreNames.THEME, {
  state: (): ThemeState => {
    return {
      theme: 'light',
      fontSize: 14,
      fontFamily: 'PingFang',
      colors: []
    }
  },
  actions: {
    reset() {}
  },
  storage: {
    enabled: true
  }
})
