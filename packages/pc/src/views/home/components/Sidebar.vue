<!--
  @describe: 首页左侧导航
  @author cpl
  @update 2022-07-10 16:25:42
-->

<template>
  <div class="h-full bg-white shadow-md overflow-hidden relative pb-8 sidebar">
    <div class="h-full g-scroll-y-0">
      <ElMenu :default-active="active" @open="open" @close="close">
        <SidebarItem :data="userStore.menus"></SidebarItem>
      </ElMenu>
    </div>
    <div
      class="w-full h-8 absolute left-0 bottom-0 bg-white border-t border-r border-default border-solid shadow flex items-center justify-center cursor-pointer"
    >
      <el-icon :size="size" :color="color">
        <ArrowLeftBold />
      </el-icon>
      <span class="pl-1 text-sm text-lighter">收起</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ArrowLeftBold } from '@element-plus/icons-vue'
import SidebarItem from './SidebarItem.vue'
import { ref } from 'vue'
import { useUserStore, useThemeStore } from '../../../store'

const userStore = useUserStore()
const active = ref<string>('string')

const themeStore = useThemeStore()
const size = ref<number>(themeStore.getRootFontSize('--jm-font-size-14'))
const color = ref<string>(themeStore.getRootColor('--jm-color-primary-6'))

const open = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const close = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="scss" scoped>
.sidebar {
  width: 230px;
}
</style>
