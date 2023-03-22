<!--
  @describe: 首页头部
  @author cpl
  @update 2022-07-10 15:40:58
-->

<template>
  <div
    class="w-full bg-primary-600 flex justify-between items-center pl-2 pr-5 text-white select-none header"
  >
    <div class="flex items-center">
      <img :src="$STATIC_URL + 'pc/images/jiumu.png'" class="w-10" alt="" />
      <span class="pl-2 text-lg text-white-8">
        <span>管理系统平台</span>
        <span v-if="VITE_MODE !== 'prod'">（测试环境）</span>
      </span>
    </div>
    <div class="flex items-center">
      <span class="mr-4 cursor-pointer" @click="$emit('showUserInfo')">{{
        userStore.userInfo?.username || '昵称'
      }}</span>
      <ElImage
        class="w-8 rounded-full cursor-pointer"
        :src="userStore.userInfo.avatar.filePath"
        :preview-src-list="[userStore.userInfo.avatar.filePath]"
        v-if="userStore.userInfo?.avatar"
      >
      </ElImage>
      <img :src="$STATIC_URL + '/pc/images/avatar2.png'" alt="" class="w-8 h-8 rounded-md" v-else />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElImage } from 'element-plus'
import { useUserStore } from '@/store'

const { VITE_MODE } = import.meta.env

const userStore = useUserStore()

defineEmits(['showUserInfo'])
</script>

<style lang="scss" scoped>
.header {
  height: 55px;
}
</style>
