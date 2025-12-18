<!--
  @describe: table 表格盒子 用法跟 element-plus table 保持一致
  @author: cpl
  @create: 2022-07-22 17:40:03
-->

<template>
  <div class="flex-1 flex-shrink-0 relative table-wrapper" ref="refTable">
    <div class="absolute top-0 left-0 w-full">
      <ElTable
        v-bind="$attrs"
        :height="Math.floor(height)"
        :data="data"
        stripe
        :row-key="rowKey"
        @select-all="selectAll"
        @select="select"
        @selection-change="selectionChange"
        ref="table"
      >
        <slot></slot>
        <template #append>
          <slot name="append"></slot>
        </template>
        <template #empty>
          <slot name="empty"></slot>
        </template>
      </ElTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElTable } from 'element-plus'
import { useElementSize } from '@vueuse/core'
import { tableProps, tableEmits } from './type'
import { useIndex } from './hooks/use-index'

defineOptions({
  inheritAttrs: false
})

const refTable = ref<HTMLDivElement>()
const { height } = useElementSize(refTable)

const props = defineProps(tableProps)
const emit = defineEmits(tableEmits)

const { table, selectAll, select, selectionChange } = useIndex(props, emit)
</script>

<style lang="scss">
@forward './index.scss';
</style>
