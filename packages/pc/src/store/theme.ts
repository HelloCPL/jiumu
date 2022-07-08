/**
 * @author chen
 * @description 主题相关数据
 * @update 2022-07-07 21:43:45
 */

import { FontSizeValue, ThemeValue } from '@/enumerations'
import { defineStore, StoreDefinition } from 'pinia'
import { StoreNames } from './store-name'
import { ThemeState } from './theme.interface'
import { kebabCase } from 'lodash-es'
import { ColorsFile } from '@/style/color.interface'

export const useThemeStore: StoreDefinition = defineStore(StoreNames.THEME, {
  state: (): ThemeState => {
    return {
      theme: 'light',
      fontSize: 14,
      fontFamily: 'PingFang',
      colors: [] // 主题颜色变量集合 [{ key: '--jm-color-primary-500', value: '#409EFF' }, ...]
    }
  },
  actions: {
    reset() {},

    /**
     * 修改字体大小
     */
    async toggleFontSize(font: FontSizeValue) {
      const sizes: KeyValue[] = [
        { key: '', value: 12 },
        { key: '', value: 12 },
        { key: '', value: 12 },
        { key: '', value: 12 },
        { key: '', value: 12 },
        { key: '', value: 12 }
      ]
    },

    /**
     * 修改主题颜色
     */
    async toggleTheme(theme: ThemeValue) {
      const fileName = `../style/color-${kebabCase(theme)}.ts`
      let colorsFile: ColorsFile | null = null
      try {
        const res = await import(fileName)
        colorsFile = res.default || res
      } catch (e) {}
      if (colorsFile) {
        const colors: KeyValue[] = []
        // 先修改主题色
        colorsFile.colors?.forEach((item) => {
          item.value.forEach((list) => {
            let key = '--jm-color-'
            if (item.key !== 'base') key += `${item.key}-${list.key}`
            else key += list.key
            document?.documentElement.style.setProperty(key, list.value)
            colors.push({ key, value: list.value })
          })
        })
        // 再修改中性色
        colorsFile?.neutralColors.forEach((item) => {
          const key = '--jm-color-' + (item.alias || item.key)
          document?.documentElement.style.setProperty(key, item.value)
          colors.push({ key, value: item.value })
        })
        this.theme = theme
        this.colors = colors
      }
    },

    /**
     * 根据 root key 值获取当前主题对应的颜色 常用于echarts等js定义的样式
     * getRootColor('--jm-color-primary-500') // #409EFF
     */
    getRootColor(key: string): string {
      return this.colors.find((item) => item.key === key)?.value || '#409EFF'
    }
  },
  storage: {
    enabled: true,
    type: 'local'
  }
})
