<template>
  <ElConfigProvider :locale="zhCn">
    <router-view></router-view>
  </ElConfigProvider>
</template>

<script lang="ts" setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { useCustomRouter } from '@/hooks/use-custom-router'
import { useThemeStore } from '@/store'

console.log('App 页面')

// 扩展useRouter
useCustomRouter()
// 初始化主题
const themeStore = useThemeStore()
themeStore.toggleTheme()
themeStore.toggleFontFamily()
themeStore.toggleFontSize()
</script>

<style>
#app {
  color: var(--jm-color-text);
  font-size: var(--jm-font-size);
}
</style>
