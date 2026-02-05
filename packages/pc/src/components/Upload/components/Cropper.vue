<!--
  @cpl
  @create 2026-02-06 01:18:56
  @description 图片裁剪
-->

<template>
  <Dialog :width="getWidth" title="图片裁剪" @close="$emit('close')" @confirm="confirm">
    <div :style="{ height: getHeight + 'px' }">
      <vue-cropper v-bind="cropperConfig" ref="refCropper" :img="previewUrl" />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from '@/components/Dialog/index.vue'
import { isObject } from 'lodash-es'
import { computed, onMounted, PropType, reactive, ref } from 'vue'
import { VueCropper } from 'vue-cropper'
import 'vue-cropper/dist/index.css'

const props = defineProps({
  file: {
    type: Object as PropType<File>
  },
  config: {
    type: Object
  }
})
const emit = defineEmits(['confirm', 'close'])

const previewUrl = ref<any>()
const cropperConfig = reactive({
  width: 300,
  height: 300,
  autoCrop: true,
  full: true,
  intoTrue: true,
  original: true
})
onMounted(() => {
  previewUrl.value = URL.createObjectURL(props.file as File)
  if (isObject(props.config)) {
    Object.assign(cropperConfig, props.config)
  }
})

const refCropper = ref<any>(null)
const confirm = () => {
  refCropper.value?.getCropBlob((blob: Blob) => {
    const file = new File([blob], props.file?.name as string, { type: props.file?.type })
    emit('confirm', file)
  })
}

const getWidth = computed(() => {
  const w = cropperConfig.width + 164
  return w < 500 ? 500 : w
})
const getHeight = computed(() => {
  const h = cropperConfig.height + 100
  return h < 500 ? 500 : h
})
</script>
