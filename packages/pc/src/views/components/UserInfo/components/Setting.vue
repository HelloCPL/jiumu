<!--
  @describe 设置
  @author cpl
  @create 2023-03-17 16:47:36
-->

<template>
  <div class="w-full pt-12 pl-12">
    <div class="flex items-center flex-wrap">
      <span class="text-sm text-lighter flex items-center shrink-0 w-28">
        <IconSvg name="theme"></IconSvg>
        <span class="pl-1">主题</span>
      </span>
      <SelectType
        v-model="theme"
        :data="themeList"
        show-type="radio"
        @change="handleChangeTheme"
      ></SelectType>
    </div>
    <div class="flex items-center flex-wrap mt-12">
      <span class="text-sm text-lighter flex items-center shrink-0 w-28">
        <IconSvg name="fontSize"></IconSvg>
        <span class="pl-1">字体大小</span>
      </span>
      <div>
        <div
          class="relative font-size-wrapper"
          :style="{ width: distance * (fontSizeList.length - 1) + 'px' }"
        >
          <span
            v-for="(item, index) in fontSizeList"
            :key="item.value"
            class="absolute rounded-full font-size-item"
            :class="{ 'bg-primary': item.value === fontSize }"
            :style="{ left: index * distance + 'px' }"
            @click="handleChangeFontSize(item.value as FontSizeValue)"
          >
            <span
              class="absolute flex items-end text-lighter font-size-alias"
              :style="{ 'font-size': item.value + 'px' }"
            >
              {{ item.alias }}
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconSvg from '@/components/IconSvg/index'
import SelectType from '@/components/SelectType/index.vue'
import { ref } from 'vue'
import { useThemeStore } from '@/store'
import { ThemeValue, FontSizeValue } from '@/enumerations'

const themeStore = useThemeStore()

// 主题
const theme = ref<ThemeValue>('light')
theme.value = themeStore.theme
const themeList = [
  { value: 'light', label: '日间模式' },
  { value: 'drak', label: '暗黑模式' }
  // { value: 'red', label: '深红模式' },
  // { value: 'blue', label: '深蓝模式' }
]
const handleChangeTheme = () => {
  themeStore.toggleTheme(theme.value)
}

const distance = 56
// 字体大小
const fontSize = ref<FontSizeValue>(14)
fontSize.value = themeStore.fontSize
const fontSizeList = [
  { label: '特小', value: 12, alias: 'A', aliasSize: 10 },
  { label: '小', value: 13 },
  { label: '常规', value: 14, alias: '标准' },
  { label: '大', value: 16 },
  { label: '特大', value: 18, alias: 'A' }
]
const handleChangeFontSize = (size: FontSizeValue) => {
  fontSize.value = size
  themeStore.toggleFontSize(size)
}
</script>

<style lang="scss" scoped>
.font-size-wrapper {
  height: 1px;
  background: var(--jm-color-primary);

  .font-size-item {
    width: var(--jm-font-size);
    height: var(--jm-font-size);
    transform: translate(-50%, -50%);
    cursor: pointer;

    &::before {
      content: '';
      width: 1px;
      height: 7px;
      background: var(--jm-color-primary);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .font-size-alias {
      top: -24px;
      white-space: nowrap;
      vertical-align: baseline;
      line-height: 1;
      transform: translate(-50%);
      left: 50%;
      height: 20px;
    }
  }
}
</style>
