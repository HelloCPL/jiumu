<!--
  @describe: 首页内容展示区
  @author chen
  @update 2022-07-10 16:54:28
-->

<template>
  <div class="w-full h-full bg-white">
    <router-view v-slot="{ Component }">
      <keep-alive :include="store.include" :exclude="store.exclude">
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { useKeepAliveStore } from '@/store'
const store = useKeepAliveStore()
</script>
