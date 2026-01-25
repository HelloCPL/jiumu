<!--
  @describe: 首页左侧导航
  @author cpl
  @update 2022-07-10 16:25:42
-->

<template>
  <div
    class="h-full bg-white select-none shadow-md overflow-hidden relative pb-10 duration-500 sidebar-container"
    :class="{ 'sidebar-container-active': isCollapse }"
    :style="{ width: isCollapse ? '4.57rem' : '15rem' }"
  >
    <div class="h-full g-scroll-y-0">
      <ElMenu :collapse="isCollapse" :default-active="routerName" @select="select">
        <SidebarItem :data="userStore.menus" :collapse="isCollapse"></SidebarItem>
      </ElMenu>
    </div>
    <div
      class="w-full h-10 absolute left-0 bottom-0 bg-white border-t border-default border-solid shadow flex items-center justify-center cursor-pointer"
      @click="switchCollapse"
    >
      <ElIcon
        :size="getPx(12)"
        color="var(--jm-color-primary-6)"
        :class="{ 'rotate-180': isCollapse }"
        class="duration-300"
      >
        <ArrowLeftBold />
      </ElIcon>
      <span class="pl-1 text-sm text-lighter">{{ isCollapse ? '展开' : '收起' }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMenu, ElIcon } from 'element-plus'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import SidebarItem from './SidebarItem.vue'
import { useUserStore, useNavigationsStore } from '@/store'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'
import { isHomeRoutes } from '@/router/routes'
import { findChildrenFirst } from '@jiumu/utils'
import { getPx } from '@/utils/tools'

const router = useRouter()
const userStore = useUserStore()
const navigationsStore = useNavigationsStore()
const { isCollapse, routerName } = storeToRefs(navigationsStore)
// 记录打开状态
let _isCollapse = isCollapse.value

// 切换展开收起
const switchCollapse = () => {
  isCollapse.value = !isCollapse.value
  _isCollapse = isCollapse.value
}

const select = (key: string, keyPath: string[]) => {
  routerPush(keyPath[keyPath.length - 1])
}

// 跳转
const routerPush = (name: string) => {
  name = name || (userStore.menus.length ? findChildrenFirst(userStore.menus, 'code') : '/')
  const item = navigationsStore._find(name)
  if (item) {
    router.push({
      name,
      params: { ...item.params },
      query: { ...item.query }
    })
  } else router.push({ name })
}

// 首次进来跳转路由
const route = useRoute()
if (!isHomeRoutes(route.name, true)) {
  routerPush(<string>routerName.value)
}

const setCollapse = () => {
  const w = document.documentElement.clientWidth || window.innerWidth
  if (w < 768) isCollapse.value = true
  else isCollapse.value = _isCollapse
}
// 监听窗口变化
onMounted(() => {
  window.addEventListener('resize', setCollapse)
})
onUnmounted(() => {
  window.removeEventListener('resize', setCollapse)
})
</script>

<style lang="scss">
.sidebar-container {
  .el-menu--collapse .el-sub-menu.is-active .el-sub-menu__title,
  .el-menu-item.is-active {
    background: var(--jm-color-primary-50);
  }
}

.el-popper .el-menu--vertical .el-menu-item.is-active {
  background: var(--jm-color-primary-50);
}

.sidebar-container-active {
  .el-sub-menu__title,
  .el-menu-item {
    padding-left: 10px;
    padding-right: 4px;
  }
}
</style>
