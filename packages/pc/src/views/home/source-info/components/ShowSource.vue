<!--
  @describe 资源的外部资源展示组件
  @author cpl
  @create 2023-03-16 14:44:16
-->

<template>
  <div class="w-full flex flex-wrap gap-6">
    <div
      v-for="item in data"
      @click="handleClick(item)"
      :key="item.id"
      class="h-14 flex items-center justify-center pl-4 pr-2 bg-white-8 text-lighter border-1 border-lighter rounded-md shadow-md cursor-pointer transition duration-300 hover:text-primary-500 hover:bg-primary-2 hover:border-primary-2"
      :class="itemClass"
    >
      <span class="g-line-1">{{ item.title }}</span>
      <ElIcon class="ml-2 shrink-0">
        <Download />
      </ElIcon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { ElIcon } from 'element-plus'
import { Download } from '@element-plus/icons-vue'
import { downloadFile } from '@/utils/download-file'
import { useWidth } from '@/hooks/use-width'

defineProps({
  data: {
    type: Array as PropType<DataSourceLink[]>,
    default: () => []
  }
})

const handleClick = (info: DataSourceLink) => {
  downloadFile({
    filePath: info.link,
    fileName: info.title
  })
}

const { width } = useWidth()
const itemClass = computed(() => {
  if (width.value <= 768) return 'w-full'
  return 'w-56'
})
</script>
