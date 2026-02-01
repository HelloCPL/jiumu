<!--
  @describe: 首页左侧导航
  @author cpl
  @update 2022-07-10 16:25:42
-->

<template>
  <div
    class="h-full bg-white select-none shrink-0 pb-14 relative"
    :class="{ 'sidebar-container-768': width <= 768 }"
  >
    <div
      class="w-full h-10 absolute left-0 bottom-4 bg-white flex items-center justify-center cursor-pointer border-t-1 sidebar-icon"
      style="min-width: 4.57rem"
      :class="{ 'sidebar-icon-768': sidebarWrapperWidth === '0' }"
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
    <div
      class="h-full overflow-hidden duration-500 sidebar-wrapper g-scroll-y-0"
      :class="{ 'sidebar-wrapper-active': isCollapse }"
      :style="{ width: sidebarWrapperWidth }"
    >
      <ElMenu :collapse="isCollapse" :default-active="routerName" @select="select">
        <SidebarItem :data="userStore.menus" :collapse="isCollapse"></SidebarItem>
      </ElMenu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMenu, ElIcon } from 'element-plus'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import SidebarItem from './SidebarItem.vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, watch } from 'vue'
import { isHomeRoutes } from '@/router/routes'
import { findChildrenFirst } from '@jiumu/utils'
import { getPx } from '@/utils/tools'
import { userStore } from '@/store/user/instance'
import { navigationsStore } from '@/store/navigations/instance'
import { useWidth } from '@/hooks/use-width'

const router = useRouter()
const { isCollapse, routerName } = storeToRefs(navigationsStore)

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

const { width } = useWidth()
onMounted(() => {
  if (width.value <= 768) {
    isCollapse.value = true
  }
})
watch(
  () => width.value,
  () => {
    if (width.value <= 768) isCollapse.value = true
    else isCollapse.value = _isCollapse
  }
)

const sidebarWrapperWidth = computed(() => {
  if (!isCollapse.value) return '15rem'
  else if (width.value <= 768) return '0'
  return '4.57rem'
})
</script>

<style lang="scss">
.sidebar-wrapper {
  .el-menu--collapse .el-sub-menu.is-active .el-sub-menu__title,
  .el-menu-item.is-active {
    background: var(--jm-color-primary-50);
  }
}

.el-popper .el-menu--vertical .el-menu-item.is-active {
  background: var(--jm-color-primary-50);
}

.sidebar-wrapper-active {
  .el-sub-menu__title,
  .el-menu-item {
    padding-left: 10px;
    padding-right: 4px;
  }
}
</style>

<style scoped lang="scss">
.sidebar-container-768 {
  @apply z-50 absolute shadow;
}

.sidebar-icon-768 {
  border-radius: 0 1.25rem 1.25rem 0;
  border: 1px solid var(--jm-color-border);
  @apply z-20 shadow;
}
</style>
