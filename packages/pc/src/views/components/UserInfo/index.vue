<!--
  @describe: 用户信息
  @author cpl
  @update 2022-07-22 20:20:56
-->

<template>
  <Dialog title="用户设置" width="600px" :show-footer="false">
    <div class="w-full flex setting-wrapper">
      <div class="w-32 h-full bg-white text-sm shadow-sm">
        <div
          v-for="item in list"
          :key="item.value"
          class="w-full h-10 border-b-1 border-lighter flex items-center pl-6 cursor-pointer"
          :class="{ bg: item.value === target }"
          @click="handleClickItem(item)"
        >
          {{ item.label }}
        </div>
      </div>
      <div class="flex-1 h-full relative g-scroll-y-0">
        <BaseInfo v-if="target === '0'"></BaseInfo>
        <Setting v-else-if="target === '1'"></Setting>
        <Logs v-else-if="target === '2'"></Logs>
        <Other v-else-if="target === '3'"></Other>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from '@/components/Dialog/index.vue'
import { ref } from 'vue'
import BaseInfo from './components/BaseInfo.vue'
import Logs from './components/Logs.vue'
import Other from './components/Other.vue'
import Setting from './components/Setting.vue'

const target = ref('1')
const list: ValueLabel[] = [
  { label: '账号设置', value: '0' },
  { label: '设置', value: '1' },
  { label: '登录日志', value: '2' },
  { label: '其他', value: '3' }
]
const handleClickItem = (item: ValueLabel) => {
  target.value = item.value
}

/*
 * 账号设置
 *   基本信息（头像修改，账号显示(暂不支持修改)，角色，标签，基本信息查看与修改）
 *   修改账号
 *   修改密码
 *   退出登录
 * 设置
 *   主题
 *   字体大小
 * 登录日志
 * 其他
 *   口令
 *   api文档
 */
</script>

<style lang="scss" scoped>
.setting-wrapper {
  height: 600px;
}
</style>
