<template>
  <ElConfigProvider :locale="zhCn">
    <router-view></router-view>
  </ElConfigProvider>
</template>

<script lang="ts" setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useThemeStore } from '@/store/theme'

const themeStore = useThemeStore()
// 初始化主题
themeStore.toggleTheme()
themeStore.toggleFontFamily()
themeStore.toggleFontSize()
</script>
