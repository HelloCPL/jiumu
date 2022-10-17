<!--
  @describe: 新增或编辑页面盒子
  @author: cpl
  @create: 2022-10-16 00:02:51
-->

<template>
  <div class="w-full h-full relative page-box-container">
    <!-- 内容区 -->
    <div class="w-full h-full p-6 g-scroll-y">
      <slot></slot>
    </div>
    <!-- 底部按钮 -->
    <div
      v-if="showFooter"
      class="w-full absolute bottom-0 left-0 border-t-1 bg-white p-4 flex items-center page-box-bottom"
    >
      <slot name="footer">
        <FilterButton class="px-0 pt-0 border-0" :list="_list" @click="handleClickBtn"></FilterButton>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { pageBoxProps, pageBoxEmits } from './type'
import FilterButton from '../FilterButton/index.vue'
import { FilterButtonList } from '../FilterButton/type'
import { ref, watch } from 'vue'

const props = defineProps(pageBoxProps)

const emit = defineEmits(pageBoxEmits)

const handleClickBtn = (item: FilterButtonList) => {
  emit('changeBtn', item)
}

const _list = ref<FilterButtonList[]>([])

// 处理按钮列表
const handleBtnList = () => {
  if (props.list.length) _list.value = props.list
  else {
    if (props.id) {
      if (props.isDraft === '1') {
        _list.value = [
          { name: '发布', key: 'save', type: 'primary' },
          { name: '保存草稿', key: 'draft' },
          { name: '删除', key: 'delete' }
        ]
      } else {
        _list.value = [
          { name: '保存', key: 'save', type: 'primary' },
          { name: '转为草稿', key: 'draft' },
          { name: '删除', key: 'delete' }
        ]
      }
    } else {
      _list.value = [
        { name: '发布', key: 'save', type: 'primary' },
        { name: '保存草稿', key: 'draft' },
        { name: '取消', key: 'delete' }
      ]
    }
  }
}

watch(
  () => props.id,
  () => {
    handleBtnList()
  },
  { immediate: true }
)

watch(
  () => props.isDraft,
  () => {
    handleBtnList()
  },
  { immediate: true }
)

watch(
  () => props.list,
  () => {
    handleBtnList()
  },
  { deep: true }
)
</script>

<style lang="scss">
.page-box-container {
  .el-select {
    width: 100%;
  }
}
</style>

<style lang="scss" scoped>
.page-box-container {
  padding-bottom: 70px;
  box-sizing: border-box;
}
.page-box-bottom {
  height: 70px;
}
</style>
