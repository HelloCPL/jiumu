<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { useCustomRouter } from '@/hooks/use-custom-router'
import { useThemeStore } from '@/store'

// 扩展useRouter
useCustomRouter()
// 初始化主题
const themeStore = useThemeStore()
themeStore.toggleTheme()
themeStore.toggleFontFamily()
themeStore.toggleFontSize()
</script>
