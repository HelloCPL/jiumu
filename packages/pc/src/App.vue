<template>
  <ElConfigProvider :locale="zhCn">
    <router-view></router-view>
  </ElConfigProvider>
</template>

<script lang="ts" setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useCustomRouter } from '@/hooks/use-custom-router'
import { useThemeStore } from '@/store/theme'
import { loadLuckysheetLinks, loadLuckysheetScripts, loadLuckyexcel } from '@/utils/scripts'

// 扩展useRouter
useCustomRouter()

const themeStore = useThemeStore()
// 初始化主题
themeStore.toggleTheme()
themeStore.toggleFontFamily()
themeStore.toggleFontSize()

// 引入第三方资源
loadLuckysheetLinks()
loadLuckysheetScripts()
loadLuckyexcel()
</script>

<style>
#app {
  color: var(--jm-color-text);
  font-size: var(--jm-font-size);
}
</style>
