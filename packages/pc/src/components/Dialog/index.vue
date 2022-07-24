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
    custom-class="dialog-wrapper"
    :draggable="draggable"
    :width="width"
    :open-delay="50"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="$emit('close')"
  >
    <template #header>
      <div class="w-full h-6 text-lg g-line-1">{{ title }}</div>
    </template>
    <template #footer v-if="showFooter">
      <slot name="footer">
        <ElButton @click="handleCancel">取消</ElButton>
        <ElButton type="primary" @click="$emit('confirm')">确认</ElButton>
      </slot>
    </template>
    <div class="w-full g-scroll-y dialog-content">
      <slot></slot>
    </div>
  </ElDialog>
</template>

<script lang="ts" setup>
import { ElDialog, ElButton } from 'element-plus'
import { ref, onMounted, onUnmounted } from 'vue'
const isShow = ref<boolean>(false)
onMounted(() => {
  isShow.value = true
})
onUnmounted(() => {
  isShow.value = false
})

const emit = defineEmits(['confirm', 'cancel', 'close'])

const handleCancel = () => {
  isShow.value = false
  emit('close')
}

type Props = {
  title?: string
  draggable?: boolean
  width?: string | number
  showFooter?: boolean
  [x: string]: any // 其余参数跟 ElDialog 参数保持一致
}
withDefaults(defineProps<Props>(), {
  title: '',
  draggable: true,
  width: '50%',
  showFooter: true
})
</script>

<style lang="scss">
.dialog-wrapper {
  .el-dialog__header {
    width: 100%;
    padding-top: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--jm-color-border-light);
  }

  .el-dialog__headerbtn {
    top: 12px;
    right: 10px;
    width: 24px;
    height: 24px;
  }

  .el-dialog__body {
    padding-top: 0;
    padding-bottom: 0;
    padding-right: 0;
  }

  .el-dialog__footer {
    border-top: 1px solid var(--jm-color-border-light);
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .dialog-content {
    max-height: 65vh;
  }
}
</style>
