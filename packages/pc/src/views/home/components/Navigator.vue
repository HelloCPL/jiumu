<!--
  @describe: 首页中间导航栏
  @author cpl
  @update 2022-07-10 16:25:42
-->

<template>
  <div class="w-full h-10 bg-white px-5 overflow-hidden pt-2 naviagtor">
    <div class="w-full h-full relative">
      <!-- 导航栏容器 -->
      <div class="absolute bottom-0 left-0 h-full flex flex-nowrap">
        <!-- 每一项 -->
        <div
          class="h-full pl-2 pr-5 flex-shrink-0 flex flex-nowrap items-center justify-center relative cursor-pointer nav-item"
          :class="{ 'nav-item-active': item.name === navStore.routerName, 'nav-item-first': index === 0 }"
          :title="item.meta.title.length > 4 ? item.meta.title : ''"
          v-for="(item, index) in navStore.navigations"
          :key="item.name"
          @click="clickItem(item)"
        >
          <span class="select-none max-w-full g-line-1">{{ item.meta.title }}</span>
          <ElIcon
            color="var(--jm-color-border-darker)"
            :size="themeStore.fontSize + 2"
            class="right-1 g-center-y z-30 nav-item-icon"
            @click.stop="clickClose(item)"
          >
            <CircleCloseFilled />
          </ElIcon>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElIcon } from 'element-plus'
import { CircleCloseFilled } from '@element-plus/icons-vue'
import { useThemeStore } from '../../../store'
import { useNavigator } from './use-navigator'
import { ref } from 'vue'

const themeStore = useThemeStore()

const { navStore, clickItem, clickClose } = useNavigator()
</script>

<style lang="scss" scoped>
@import './Navigator.scss';
</style>
