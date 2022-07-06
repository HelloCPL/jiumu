<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { useCustomRouter } from '@/hooks/use-custom-router'
// 扩展useRouter
useCustomRouter()
</script>

<style lang="scss">
// @import '@/style/d.scss';
</style>
