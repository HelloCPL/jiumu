<!--
  @describe 资源的外部资源-外部链接展示组件
  @author cpl
  @create 2023-03-16 14:44:16
-->

<template>
  <div class="w-full flex flex-wrap">
    <div
      v-for="item in data"
      @click="handleClick(item)"
      :key="item.id"
      class="w-56 h-14 flex items-center justify-center mr-6 mb-4 pl-4 pr-2 bg-white-8 text-lighter border-1 border-lighter rounded-md shadow-md cursor-pointer transition duration-300 hover:text-primary-500 hover:bg-primary-2 hover:border-primary-2"
    >
      <img
        :src="item.coverImg1.filePath"
        alt=""
        v-if="item.coverImg1 && item.coverImg1.filePath"
        class="w-5 h-5 object-cover rounded-sm mr-2"
      />
      <img :src="item.coverImg2" alt="" v-if="item.coverImg2" class="w-5 h-5 object-cover rounded-sm mr-2" />
      <span class="g-line-1">{{ item.title }}</span>
      <IconSvg name="source" class="ml-2 shrink-0"></IconSvg>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import IconSvg from '@/components/IconSvg'

defineProps({
  data: {
    type: Array as PropType<DataSourceLink[]>,
    default: () => []
  }
})

const handleClick = (info: DataSourceLink) => {
  window.open(info.link, '_blank')
}
</script>
