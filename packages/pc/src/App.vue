<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { useCustomRouter } from '@/hooks/use-custom-router'
import { useThemeStore } from '@/store'
import { useUserStore } from '@/store'
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route)
console.log(route.name)

// 扩展useRouter
useCustomRouter()
// 初始化主题
const themeStore = useThemeStore()
themeStore.toggleTheme()
themeStore.toggleFontFamily()
themeStore.toggleFontSize()
// 初始化用户信息
const userStore = useUserStore()
if (userStore.token && !userStore.userInfo && route.name !== 'Login') userStore.getUser()
</script>
