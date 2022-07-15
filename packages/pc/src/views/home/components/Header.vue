<!--
  @describe: 首页头部
  @author cpl
  @update 2022-07-10 15:40:58
-->

<template>
  <div class="w-full bg-primary-600 flex justify-between items-center pl-2 pr-5 text-white header">
    <div class="flex items-center">
      <img :src="$STATIC_URL + 'pc/images/jiumu.png'" class="w-10" alt="" />
      <span class="pl-2 text-lg text-white-8">
        管理系统平台{{ VITE_MODE === 'prod' ? '' : '（测试环境）' }}
      </span>
    </div>
    <div class="flex items-center">
      <ElSelect v-model="fontSize" class="m-2" placeholder="Select" size="small" @change="changeSelect">
        <ElOption v-for="item in fontSizes" :key="item.value" :label="item.key" :value="item.value" />
      </ElSelect>
      <ElSwitch v-model="isLight" @change="change" class="mr-4" />
      <span class="mr-4 cursor-pointer">设置</span>
      <span class="mr-4 cursor-pointer">陈一支</span>
      <ElImage class="w-8 rounded-full cursor-pointer" :src="avatar" :preview-src-list="[avatar]"> </ElImage>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElSwitch, ElImage, ElSelect, ElOption } from 'element-plus'
import { ref, getCurrentInstance } from 'vue'
import { useThemeStore } from '@/store'

const { VITE_MODE } = import.meta.env

const store = useThemeStore()

// 主题
const isLight = ref<boolean>(store.theme === 'light')
const change = (b: boolean | string | number) => {
  store.toggleTheme(b ? 'light' : 'drak')
}

// 字体大小
const fontSize = ref<number>(store.fontSize)
const fontSizes = [
  { key: '特小', value: 12 },
  { key: '小', value: 13 },
  { key: '常规', value: 14 },
  { key: '大', value: 16 },
  { key: '特大', value: 18 }
]
const changeSelect = (val: number) => {
  store.toggleFontSize(val)
}

const instance = getCurrentInstance()?.appContext.config.globalProperties
const avatar = ref(instance?.$STATIC_URL + 'pc/images/avatar1.png')
</script>

<style lang="scss" scoped>
.header {
  height: 55px;
}
</style>
