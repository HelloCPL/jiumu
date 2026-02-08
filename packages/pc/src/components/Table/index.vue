<!--
  @describe: table 表格盒子 用法跟 element-plus table 保持一致
  @author: cpl
  @create: 2022-07-22 17:40:03
-->

<template>
  <div class="flex-1 flex-shrink-0 relative table-wrapper" ref="refTable">
    <div class="absolute top-0 left-0 w-full">
      <ElTable
        v-bind="getAttrs"
        :height="Math.floor(height)"
        stripe
        :row-key="rowKey"
        :default-expand-all="props.defaultExpandAll !== false"
        @select-all="selectAll"
        @select="select"
        @selection-change="selectionChange"
        ref="tableRef"
      >
        <slot></slot>
        <template v-for="(slot, name) in slots" #[name]="scope">
          <slot :name="name" v-bind="scope || {}"></slot>
        </template>
      </ElTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, useAttrs, useSlots } from 'vue'
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

const { tableRef, selectAll, select, selectionChange } = useIndex(props, emit)

const attrs = useAttrs()
const getAttrs = computed(() => {
  return Object.assign(props, attrs)
})
const slots = useSlots()

defineExpose({
  tableRef,
  selectAll,
  select,
  selectionChange
})
</script>

<style lang="scss">
@forward './index.scss';
</style>
