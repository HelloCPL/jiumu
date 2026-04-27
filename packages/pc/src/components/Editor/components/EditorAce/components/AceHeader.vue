<!--
  @cpl
  @create 2026-04-11 17:54:12
  @description 头部
-->

<template>
  <div
    class="border-b-1 flex items-center gap-2 px-4"
    :style="{
      height: '45px',
      'background-color': headerBgColor,
      color: headerColor,
      'border-color': headerBorderColor
    }"
  >
    <el-dropdown @command="changeLang" :teleported="false">
      <span
        class="h-8 mr-2 flex items-center justify-center cursor-pointer gap-x-1"
        :style="{ color: headerColor }"
      >
        <IconSvg name="theme" :size="18" fill="var(--jm-color-success)"></IconSvg>
        <span>{{ lang }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in langList" :key="item.key" :command="item.key">{{
            item.key
          }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dropdown @command="changeTheme" :teleported="false">
      <span
        class="h-8 flex items-center justify-center cursor-pointer gap-x-1"
        :style="{ color: headerColor }"
      >
        <IconSvg name="lang" :size="18" fill="var(--jm-color-primary)"></IconSvg>
        <span>{{ theme }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in themeList" :key="item.key" :command="item.key">{{
            item.key
          }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-divider direction="vertical" />
    <ElTooltip content="格式化代码" :teleported="false" v-if="!readonly">
      <span
        class="w-8 h-8 flex items-center justify-center cursor-pointer"
        :class="{ [`${headerIconClassName}-hover`]: true }"
        @click="emit('beautify')"
      >
        <IconSvg name="formatLang" :size="16" :fill="headerColor"></IconSvg>
      </span>
    </ElTooltip>
    <ElTooltip content="复制代码" :teleported="false" v-if="readonly">
      <span
        class="w-8 h-8 flex items-center justify-center cursor-pointer"
        :class="{ [`${headerIconClassName}-hover`]: true }"
        @click="emit('copy')"
      >
        <IconSvg name="copy" :size="18" :fill="headerColor"></IconSvg>
      </span>
    </ElTooltip>
    <ElTooltip :content="isFullScreen ? '取消全屏' : '全屏'" :teleported="false">
      <span
        class="w-8 h-8 flex items-center justify-center cursor-pointer"
        :class="{ [`${headerIconClassName}-hover`]: true, [headerIconClassName]: isFullScreen }"
        @click="emit('toggleFullScreen')"
      >
        <IconSvg name="fullScreen" :size="16" :fill="headerColor"></IconSvg>
      </span>
    </ElTooltip>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getLanguageKeyData, getThemeKeyData } from '../hooks/utils'
import { computed } from 'vue'
import IconSvg from '../../../../IconSvg/index.vue'
import { ElTooltip, ElDropdown, ElDropdownItem, ElDropdownMenu, ElDivider } from 'element-plus'

defineOptions({
  name: 'EditorAceHeaderComponent'
})

const props = defineProps({
  lang: {
    type: String
  },
  theme: {
    type: String
  },
  isFullScreen: {
    type: Boolean
  },
  readonly: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['changeLang', 'changeTheme', 'beautify', 'copy', 'toggleFullScreen'])

const langList = ref(getLanguageKeyData())

const themeList = ref(getThemeKeyData())

/**
 * 除了背景色保持与编辑器主题背景色一致外
 * 其他字体颜色、边框颜色、图标背景色仅分为 深色类 浅色类
 */

const headerBgColor = computed(() => {
  if (props.theme === 'tomorrow_night_eighties') return '#2D2D2D'
  else if (props.theme === 'chrome') return '#FFFFFF'
  else if (props.theme === 'eclipse') return '#FFFFFF'
  else if (props.theme === 'terminal') return 'black'
  else if (props.theme === 'github') return '#FFFFFF'
  return '#272822'
})

const headerColor = computed(() => {
  if (props.theme === 'chrome') return '#606266'
  else if (props.theme === 'eclipse') return '#606266'
  else if (props.theme === 'github') return '#606266'
  else if (props.theme === 'tomorrow_night_eighties') return '#E5EAF3'
  else if (props.theme === 'terminal') return '#E5EAF3'
  return '#E5EAF3'
})

const headerBorderColor = computed(() => {
  if (props.theme === 'chrome') return '#DCDFE6'
  else if (props.theme === 'eclipse') return '#DCDFE6'
  else if (props.theme === 'github') return '#DCDFE6'
  else if (props.theme === 'tomorrow_night_eighties') return '#4C4D4F'
  else if (props.theme === 'terminal') return '#4C4D4F'
  return '#4C4D4F'
})

const headerIconClassName = computed(() => {
  if (props.theme === 'chrome') return 'header-icon-bg-100'
  else if (props.theme === 'eclipse') return 'header-icon-bg-100'
  else if (props.theme === 'github') return 'header-icon-bg-100'
  else if (props.theme === 'tomorrow_night_eighties') return 'header-icon-bg-500'
  else if (props.theme === 'terminal') return 'header-icon-bg-500'
  return 'header-icon-bg-500'
})

const changeLang = (key: string) => {
  emit('changeLang', key)
}

const changeTheme = (key: string) => {
  emit('changeTheme', key)
}
</script>

<style lang="scss" scoped>
.header-icon-bg-100 {
  background-color: #d9ecff;
}
.header-icon-bg-100-hover {
  &:hover {
    background-color: #d9ecff;
  }
}
.header-icon-bg-500 {
  background-color: #409eff;
}
.header-icon-bg-500-hover {
  &:hover {
    background-color: #409eff;
  }
}
</style>
