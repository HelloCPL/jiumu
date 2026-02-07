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
        <FilterButton class="px-0 pt-0 border-0" :list="btnList" @click="handleClickBtn"></FilterButton>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { pageBoxProps, pageBoxEmits } from './type'
import FilterButton from '../FilterButton/index.vue'
import { FilterButtonList } from '../FilterButton/type'
import { computed, ref, watch } from 'vue'
import { isArray } from 'lodash-es'

const props = defineProps(pageBoxProps)

const emit = defineEmits(pageBoxEmits)

const handleClickBtn = (item: FilterButtonList) => {
  emit('changeBtn', item)
}

const btnList = computed<FilterButtonList[]>(() => {
  if (isArray(props.list) && props.list.length > 0) {
    return props.list
  }
  const btns: FilterButtonList[] = []
  if (props.footerButtonConfig?.id && props.footerButtonConfig?.isDraft === '1') {
    if (props.footerButtonConfig?.hasSaveButton !== false)
      btns.push({ name: '发布', key: 'save', type: 'primary', code: props.updateCode })
    if (props.footerButtonConfig?.hasDraftButton !== false)
      btns.push({ name: '保存草稿', key: 'draft', code: props.updateCode })
    if (props.footerButtonConfig?.hasDeleteButton !== false)
      btns.push({ name: '删除', key: 'delete', code: props.deleteCode })
  } else if (props.footerButtonConfig?.id) {
    if (props.footerButtonConfig?.hasSaveButton !== false)
      btns.push({ name: '保存', key: 'save', type: 'primary', code: props.updateCode })
    if (props.footerButtonConfig?.hasDraftButton !== false)
      btns.push({ name: '转为草稿', key: 'draft', code: props.updateCode })
    if (props.footerButtonConfig?.hasDeleteButton !== false)
      btns.push({ name: '删除', key: 'delete', code: props.deleteCode })
  } else {
    if (props.footerButtonConfig?.hasSaveButton !== false)
      btns.push({ name: '发布', key: 'save', type: 'primary', code: props.addCode })
    if (props.footerButtonConfig?.hasDraftButton !== false)
      btns.push({ name: '保存草稿', key: 'draft', code: props.addCode })
  }
  if (props.footerButtonConfig?.hasCancelButton !== false) btns.push({ name: '取消', key: 'cancel' })
  return btns
})
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
