<!--
  @describe 外部文件/图片链接来源
  @author cpl
  @create 2023-03-08 10:54:37
-->

<template>
  <div class="w-full">
    <div>
      <span>资源一</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { toChineseNum } from '@jiumu/utils'

const props = defineProps({
  modelValue: {
    type: Array as PropType<DataSourceLink[]>,
    default: () => []
  }
})
toChineseNum(123)
</script>
