<!--
  @describe: 首页左侧导航
  @author cpl
  @update 2022-07-10 16:25:42
-->

<template>
  <div
    class="h-full bg-white shadow-md overflow-hidden relative pb-8 duration-300 sidebar-container"
    :class="{ 'sidebar-container-active': isCollapse }"
    :style="{ width: isCollapse ? '64px' : '230px' }"
  >
    <div class="h-full g-scroll-y-0">
      <ElMenu :collapse="isCollapse" :default-active="active" @select="select" @open="open" @close="close">
        <SidebarItem :data="userStore.menus" :collapse="isCollapse"></SidebarItem>
      </ElMenu>
    </div>
    <div
      class="w-full h-8 absolute left-0 bottom-0 bg-white border-t border-default border-solid shadow flex items-center justify-center cursor-pointer"
      @click="switchCollapse"
    >
      <ElIcon :size="size" :color="color">
        <ArrowLeftBold />
      </ElIcon>
      <span class="pl-1 text-sm text-lighter">收起</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMenu, ElIcon } from 'element-plus'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import SidebarItem from './SidebarItem.vue'
import { ref } from 'vue'
import { useUserStore, useThemeStore } from '../../../store'

const userStore = useUserStore()
const active = ref<string>('MySource')

const themeStore = useThemeStore()
const size = ref<number>(themeStore.getRootFontSize('--jm-font-size-14'))
const color = ref<string>(themeStore.getRootColor('--jm-color-primary-6'))

const isCollapse = ref<boolean>(false)
const switchCollapse = () => {
  isCollapse.value = !isCollapse.value
}
const select = (key: string, keyPath: string[]) => {
  console.log('select', key, keyPath)
}
const open = (key: string, keyPath: string[]) => {
  console.log('open', key, keyPath)
}
const close = (key: string, keyPath: string[]) => {
  console.log('close', key, keyPath)
}
</script>

<style lang="scss">
.sidebar-container {
  .el-menu--collapse .el-sub-menu.is-active .el-sub-menu__title,
  .el-menu-item.is-active {
    background: var(--jm-color-primary-50);
  }
}

.sidebar-container-active {
  .el-sub-menu__title,
  .el-menu-item {
    padding-left: 10px;
    padding-right: 4px;
  }
}
</style>
