<!--
  @describe: 首页中间导航栏
  @author cpl
  @update 2022-07-10 16:25:42
-->

<template>
  <div class="w-full h-10 flex-shrink-0 bg-white px-5 overflow-hidden pt-2 relative naviagtor">
    <div class="w-full h-full relative" ref="refContainer">
      <!-- 导航栏容器 -->
      <div
        class="absolute bottom-0 left-0 h-full flex flex-nowrap duration-200"
        :style="{ left: left + 'px' }"
        ref="refWrapper"
        @drop="drop"
        @dragover="dragover"
      >
        <!-- 每一项 -->
        <div
          class="h-full pl-2 pr-5 flex-shrink-0 flex flex-nowrap items-center justify-center relative cursor-pointer nav-item"
          :class="{
            'nav-item-active': item.name === navigationsStore.routerName,
            'nav-item-first': index === 0,
            'nav-item-drag': index === dragIndex
          }"
          :style="{ width: '8.5rem' }"
          :title="item.meta && item.meta.title && item.meta.title.length > 4 ? item.meta.title : ''"
          v-for="(item, index) in navigationsStore.navigations"
          :key="(item.name as string)"
          :draggable="draggable"
          @dragstart="dragstart($event, index)"
          @dragend="dragend"
          @click="clickItem(item)"
          @click.prevent.right="clickItemRight($event, item, index)"
        >
          <span class="select-none max-w-full g-line-1">{{ item.meta?.title }}</span>
          <!-- <ElIcon
            color="var(--jm-color-border-darker)"
            :size="themeStore.fontSize + 2"
            class="right-1 g-center-y z-30 nav-item-icon"
            v-if="navigationsStore.navigations.length > 1"
            @click.stop="clickClose(item, index)"
          >
            <CircleCloseFilled />
          </ElIcon> -->
          <IconSvg
            name="closeFull"
            fill="var(--jm-color-border-darker)"
            hover-fill="var(--jm-color-danger)"
            :size="themeStore.fontSize + 2"
            class="right-1 g-center-y z-30 nav-item-icon"
            v-if="navigationsStore.navigations.length > 1"
            @click.stop="clickClose(item, index)"
          ></IconSvg>
        </div>
      </div>
    </div>
    <!-- 右击显示框 -->
    <NavigatorRight :options="rightOptions" :index="rightBoxIndex" v-if="isShow" @change="handleChangeRight">
    </NavigatorRight>
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
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'
import NavigatorRight from './NavigatorRight.vue'
import { useThemeStore } from '@/store'
import { useNavigator, useNavigatorDrag } from './use-navigator'
import { onMousewheel } from '@jiumu/utils'
import IconSvg from '@/components/IconSvg/index.vue'

const themeStore = useThemeStore()

// 导航栏处理
const {
  left,
  maxWidth,
  refContainer,
  refWrapper,
  navigationsStore,
  clickItem,
  clickClose,
  changeLeft,

  rightBoxIndex,
  rightOptions,
  isShow,
  clickItemRight,
  handleChangeRight
} = useNavigator()

// 导航栏鼠标滚轮处理
onMousewheel(refContainer, (i) => {
  isShow.value = false
  changeLeft(i * 30)
})

const { dragIndex, draggable, dragstart, dragend, drop, dragover } = useNavigatorDrag()
</script>

<style lang="scss" scoped>
@import './Navigator.scss';
</style>
