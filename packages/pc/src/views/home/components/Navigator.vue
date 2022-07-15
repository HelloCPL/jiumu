<!--
  @describe: 首页中间导航栏
  @author cpl
  @update 2022-07-10 16:25:42
-->

<template>
  <div class="w-full h-10 bg-white px-5 overflow-hidden pt-2 relative naviagtor">
    <div class="w-full h-full relative" ref="refContainer">
      <!-- 导航栏容器 -->
      <div
        class="absolute bottom-0 left-0 h-full flex flex-nowrap duration-200"
        :style="{ left: left + 'px' }"
        ref="refWrapper"
      >
        <!-- 每一项 -->
        <div
          class="h-full pl-2 pr-5 flex-shrink-0 flex flex-nowrap items-center justify-center relative cursor-pointer nav-item"
          :class="{ 'nav-item-active': item.name === navStore.routerName, 'nav-item-first': index === 0 }"
          :title="item.meta?.title.length > 4 ? item.meta.title : ''"
          v-for="(item, index) in navStore.navigations"
          :key="item.name"
          @click="clickItem(item)"
        >
          <span class="select-none max-w-full g-line-1">{{ item.meta?.title }}</span>
          <ElIcon
            color="var(--jm-color-border-darker)"
            :size="themeStore.fontSize + 2"
            class="right-1 g-center-y z-30 nav-item-icon"
            v-if="navStore.navigations.length > 1"
            @click.stop="clickClose(item, index)"
          >
            <CircleCloseFilled />
          </ElIcon>
        </div>
      </div>
    </div>
    <!-- 左右两侧按钮 -->
    <span
      class="bg-white absolute left-0 top-0 h-full w-5 flex items-center justify-center cursor-pointer z-40"
      v-if="left < 0"
      @click="changeLeft(250)"
    >
      <ElIcon>
        <ArrowLeftBold color="var(--jm-color-text-placeholder)" :size="themeStore.fontSize + 2" />
      </ElIcon>
    </span>
    <span
      class="bg-white absolute right-0 top-0 h-full w-5 flex items-center justify-center cursor-pointer z-40"
      v-if="left > maxWidth"
      @click="changeLeft(-250)"
    >
      <ElIcon>
        <ArrowRightBold color="var(--jm-color-text-placeholder)" :size="themeStore.fontSize + 2" />
      </ElIcon>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ElIcon } from 'element-plus'
import { CircleCloseFilled, ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'
import { useThemeStore } from '@/store'
import { useNavigator } from './use-navigator'
import { onMousewheel } from '@jiumu/utils'

const themeStore = useThemeStore()

const { left, maxWidth, refContainer, refWrapper, navStore, clickItem, clickClose, changeLeft } =
  useNavigator()

onMousewheel(refContainer, (i) => {
  changeLeft(i * 30)
})
</script>

<style lang="scss" scoped>
@import './Navigator.scss';
</style>
