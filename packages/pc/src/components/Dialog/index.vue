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
    custom-class="dialog-wrapper shadow-lg"
    :draggable="draggable"
    :width="width"
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
        <ElButton type="primary" @click="$emit('confirm')">确认</ElButton>
      </slot>
    </template>
    <div class="w-full h-full g-scroll-y dialog-content" :class="classContent">
      <slot></slot>
    </div>
  </ElDialog>
</template>

<script lang="ts" setup>
import { ElDialog, ElButton } from 'element-plus'
import { ref, onMounted, onUnmounted } from 'vue'
import { dialogProps, dialogEmit } from './type'

const isShow = ref<boolean>(false)
onMounted(() => {
  isShow.value = true
})
onUnmounted(() => {
  isShow.value = false
})

const emit = defineEmits(dialogEmit)

const handleCancel = () => {
  isShow.value = false
  emit('close')
}

defineProps(dialogProps)
</script>

<style lang="scss">
@import './index.scss';
</style>
