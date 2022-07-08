<template>
  <div>
    <el-button>安安</el-button>
    你好
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store'
const store = useThemeStore()
store.toggleTheme('light')
setTimeout(() => {
  const a = store.getRootColor('--jm-color-primary-50')
  console.log('aaaa', a)


})

</script>
