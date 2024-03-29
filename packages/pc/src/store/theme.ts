/**
 * @author chen
 * @description 主题相关数据
 * @update 2022-07-07 21:43:45
 */

import { FontFamilyValue, FontSizeValue, ThemeValue } from '@/enumerations'
import { defineStore } from 'pinia'
import { StoreNames } from './store-name'
import { ThemeState, ThemeActions } from './theme.b'
import { kebabCase } from 'lodash-es'
import { ColorsFile } from '@/style/color.b'
import { storage } from '@jiumu/utils'
const { VITE_HOME_EXPIRE } = import.meta.env

// 字体大小集合
const fontSizeList: KeyValue<string, number>[] = [
  { key: '--jm-font-size-large-extra', value: 20 },
  { key: '--jm-font-size-large', value: 18 },
  { key: '--jm-font-size-medium', value: 16 },
  { key: '--jm-font-size', value: 14 },
  { key: '--jm-font-size-default', value: 14 },
  { key: '--jm-font-size-small', value: 13 },
  { key: '--jm-font-size-small-extra', value: 12 }
]

export const useThemeStore = defineStore<string, ThemeState, {}, ThemeActions>(StoreNames.THEME, {
  state: () => {
    return {
      theme: 'light',
      fontSize: 14,
      fontFamily: 'PingFang', // 默认 PingFang 简体 可选 宋 繁体
      colors: [] // 主题颜色变量集合 [{ key: '--jm-color-primary-500', value: '#409EFF' }, ...]
    }
  },
  actions: {
    reset() {
      this.theme = 'light'
      this.fontSize = 14
      this.fontFamily = 'PingFang'
      // 清除缓存
      storage.removeItem(StoreNames.THEME, {
        type: 'local',
        prefix: 'pinia'
      })
    }, // 不做数据清除

    /**
     * 修改字体类型
     */
    async toggleFontFamily(family?: FontFamilyValue) {
      const _family = family || this.fontFamily
      document?.documentElement.style.setProperty('--jm-font-family', `${family}`)
      this.fontFamily = _family
    },

    /**
     * 修改字体大小
     */
    async toggleFontSize(font?: FontSizeValue) {
      const _font = font || this.fontSize
      fontSizeList.forEach((item) => {
        const value = _font - 14 + item.value + 'px'
        document?.documentElement.style.setProperty(item.key, value)
      })
      this.fontSize = _font
    },

    /**
     * 根据 当前字体大小获取适配的大小 常用于echarts等js定义的字体大小
     * getRootFontSize(14) // 14
     * 建议用 this.fontSze 做基量 如 this.fontSize + 2
     */
    getRootFontSize(size: number): number {
      return size + this.fontSize - 14
    },

    /**
     * 根据 root key 值获取当前字体大小对应的 fontSize 常用于echarts等js定义的字体大小
     * 修改主题颜色
     */
    async toggleTheme(theme?: ThemeValue) {
      const _theme = theme || this.theme
      let colorsFile: ColorsFile | null = null
      try {
        const res = await import(`../style/color-${kebabCase(_theme)}.ts`)
        colorsFile = res.default || res
      } catch (e) {}
      if (colorsFile) {
        const colors: KeyValue[] = []
        // 先修改主题色
        colorsFile.colors?.forEach((item) => {
          item.value.forEach((list) => {
            const key = `${item.key}-${list.key}`
            document?.documentElement.style.setProperty(`--jm-color-${key}`, list.value)
            colors.push({ key: `--jm-color-${key}`, value: list.value })
            if (list.rgb) {
              document?.documentElement.style.setProperty(`--jm-rgb-${key}`, list.rgb)
              colors.push({ key: `--jm-rgb-${key}`, value: list.rgb })
            }
            if (list.default) {
              document?.documentElement.style.setProperty(`--jm-color-${item.key}`, list.value)
              colors.push({ key: `--jm-color-${item.key}`, value: list.value })
              if (list.rgb) {
                document?.documentElement.style.setProperty(`--jm-rgb-${item.key}`, list.rgb)
                colors.push({ key: `--jm-rgb-${item.key}`, value: list.rgb })
              }
            }
          })
        })
        // 再修改中性色
        colorsFile?.neutralColors.forEach((item) => {
          const key = item.alias || item.key
          document?.documentElement.style.setProperty(`--jm-color-${key}`, item.value)
          colors.push({ key: `--jm-color-${key}`, value: item.value })
          if (item.rgb) {
            document?.documentElement.style.setProperty(`--jm-rgb-${key}`, item.rgb)
            colors.push({ key: `--jm-rgb-${key}`, value: item.rgb })
          }
        })
        this.theme = _theme
        this.colors = colors
      }
    },

    /**
     * 根据 root key 值获取当前主题对应的颜色 常用于echarts等js定义的
     * getRootColor('--jm-color-primary-500') // #409EFF
     */
    getRootColor(key: string): string {
      return this.colors.find((item) => item.key === key)?.value || '#409EFF'
    }
  },
  storage: {
    enabled: true,
    type: 'local',
    keys: ['theme', 'fontSize', 'fontFamily'],
    expire: VITE_HOME_EXPIRE * 3
  }
})
