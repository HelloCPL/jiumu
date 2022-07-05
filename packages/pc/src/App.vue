<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { useCustomRouter } from '@/router/routes'
// 扩展useRouter
useCustomRouter()
</script>
