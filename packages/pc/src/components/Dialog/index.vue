<!--
  @describe: 弹窗容器
  @author: cpl
  @create: 2022-07-19 16:14:09
-->

<template>
  <ElDialog
    v-model="isShow"
    append-to-body
    destroy-on-close
    class="dialog-wrapper shadow-lg"
    :draggable="draggable"
    :width="getWidth"
    :open-delay="50"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="$emit('close')"
  >
    <template #header v-if="showHeader">
      <slot name="header">
        <div class="w-full h-12 pl-4 pr-9 text-lg flex items-center">
          <span class="g-line-1">{{ title }}</span>
        </div>
      </slot>
    </template>
    <template #footer v-if="showFooter">
      <slot name="footer">
        <ElButton @click="handleCancel">取消</ElButton>
        <ElButton type="primary" @click="handleConfirm" v-permission="addCode">确认</ElButton>
      </slot>
    </template>
    <div
      class="w-full h-full g-scroll-y p-4 dialog-content"
      :style="[getcontentHeight]"
      :class="classContent"
    >
      <div class="w-full h-full g-scroll-y bg-white p-4">
        <slot></slot>
      </div>
    </div>
  </ElDialog>
</template>

<script lang="ts" setup>
import { ElDialog, ElButton } from 'element-plus'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { dialogProps, dialogEmit } from './type'
import { useWidth } from '@/hooks/use-width'

const isShow = ref<boolean>(false)
onMounted(() => {
  isShow.value = true
})
onUnmounted(() => {
  isShow.value = false
})

const emit = defineEmits(dialogEmit)

const handleConfirm = () => {
  emit('confirm')
}
const handleCancel = () => {
  isShow.value = false
  emit('close')
}

const props = defineProps(dialogProps)

const { width: screenWidth } = useWidth()

const getWidth = computed(() => {
  if (screenWidth.value <= 768 && props.width > screenWidth.value) {
    return screenWidth.value - 24
  }
  return props.width
})

const getcontentHeight = computed(() => {
  if (props.contentHeight) {
    if (props.showFooter) {
      return `height: calc(${props.contentHeight} - 58px)`
    }
    return `height: ${props.contentHeight}`
  }
  return ''
})
</script>

<style lang="scss">
@forward './index.scss';
</style>
