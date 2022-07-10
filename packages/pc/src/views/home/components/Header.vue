<!--
  @describe: 首页头部
  @author cpl
  @update 2022-07-10 15:40:58
-->

<template>
  <div class="w-full bg-primary-600 flex justify-between items-center pl-2 pr-5 text-white header">
    <div class="flex items-center">
      <img :src="$STATIC_URL + 'pc/images/jiumu.png'" class="w-10" alt="" />
      <span class="pl-2 text-lg text-white-8">管理系统平台</span>
    </div>
    <div class="flex items-center">
      <span class="mr-4 cursor-pointer">设置</span>
      <span class="mr-4 cursor-pointer">陈一支</span>
      <ElImage class="w-8 rounded-full cursor-pointer" :src="avatar" :preview-src-list="[avatar]">
      </ElImage>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance } from 'vue'

const instance = getCurrentInstance()?.appContext.config.globalProperties
const avatar = ref(instance.$STATIC_URL + 'pc/images/avatar1.png')
</script>

<style lang="scss" scoped>
.header {
  height: 55px;
}
</style>
