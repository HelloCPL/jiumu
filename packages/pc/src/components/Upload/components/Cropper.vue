<!--
  @cpl
  @create 2026-02-06 01:18:56
  @description 图片裁剪
-->

<template>
  <Dialog
    :width="cropperConfig.width"
    :content-height="cropperConfig.contentHeight"
    title="图片裁剪"
    @close="$emit('close')"
    @confirm="confirm"
  >
    <div class="w-full h-full flex flex-col gap-y-4 cropper-wrapper">
      <div class="flex-1">
        <vue-cropper v-bind="cropperConfig" ref="refCropper" :img="previewUrl" />
      </div>
      <div class="shrink-0 flex items-start flex-wrap gap-x-8 gap-y-4">
        <div>
          <div class="text-lighter mb-2">裁剪比例</div>
          <div class="flex flex-wrap items-center gap-4">
            <ElButton
              :type="item.value === targetCrop ? 'primary' : ''"
              v-for="item in cropList"
              :key="item.value"
              @click="changeCrop(item.value)"
              >{{ item.label }}</ElButton
            >
          </div>
        </div>
        <div>
          <div class="text-lighter mb-1">裁剪框范围</div>
          <ElCheckbox
            v-model="cropperConfig.centerBox"
            @change="changeCrop(targetCrop, true)"
            label="裁剪框限制在图片内"
          />
        </div>
        <div>
          <div class="text-lighter mb-2">图片输出方式</div>
          <ElSelect
            v-model="cropperConfig.infoTrue"
            :options="infoTrueList"
            size="small"
            style="width: 200px"
          />
        </div>
        <div>
          <div class="text-lighter mb-2">图片输出格式</div>
          <ElSelect
            v-model="cropperConfig.outputType"
            :options="outputTypeList"
            size="small"
            style="width: 200px"
          />
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from '../../Dialog/index.vue'
import { isNumber, isObject } from 'lodash-es'
import { onMounted, PropType, reactive, ref } from 'vue'
import { VueCropper } from 'vue-cropper'
import 'vue-cropper/dist/index.css'
import { ElButton, ElCheckbox, ElSelect } from 'element-plus'

defineOptions({
  name: 'UploadCropperComponent'
})

const props = defineProps({
  file: {
    type: Object as PropType<File>
  },
  config: {
    type: Object
  }
})
const emit = defineEmits(['confirm', 'close'])

const refCropper = ref<any>(null)

// https://www.npmjs.com/package/vue-cropper
const previewUrl = ref<any>()
const cropperConfig = reactive<any>({
  width: '80vw', // 弹窗宽度
  contentHeight: '75vh', // 弹窗内容高度
  autoCrop: true, // 是否默认生成截图框
  // autoCropWidth: 500, // 默认生成截图框宽度
  // autoCropHeight: 500, // 默认生成截图框高度
  fixed: false, // 是否开启截图框宽高固定比例
  fixedNumber: [1, 1], // 截图框的宽高比例, 开启fixed生效
  full: true, // 是否输出原图比例的截图
  infoTrue: true, // 	true 为展示真实输出图片宽高 false 展示看到的截图框宽高
  original: true, // 上传图片按照原始比例渲染
  outputType: 'png', // 裁剪生成图片的格式
  centerBox: true // 截图框是否被限制在图片里面
})

// 裁剪比例
const targetCrop = ref('')
const cropList = ref([
  { label: '1:1', value: '1:1' },
  { label: '2:1', value: '2:1' },
  { label: '3:2', value: '3:2' },
  { label: '4:3', value: '4:3' },
  { label: '16:9', value: '16:9' },
  { label: '21:9', value: '21:9' },
  { label: '2:3', value: '2:3' },
  { label: '3:4', value: '3:4' },
  { label: '自由', value: 'custom' },
  { label: '原图', value: 'original' }
])

const changeCrop = (crop: string, force?: boolean) => {
  if (crop !== targetCrop.value || force) {
    targetCrop.value = crop
    if (crop === 'custom') {
      cropperConfig.fixed = false
      return
    }
    if (!refCropper.value) return
    let cw = 0
    let ch = 0
    if (crop === 'original') {
      cropperConfig.fixed = false
      cw = refCropper.value.trueWidth
      ch = refCropper.value.trueHeight
    } else {
      cropperConfig.fixed = true
      const trueW = refCropper.value.trueWidth
      const trueH = refCropper.value.trueHeight
      cropperConfig.fixedNumber = crop.split(':').map(Number)
      const w =
        cropperConfig?.autoCropWidth && isNumber(cropperConfig.autoCropWidth)
          ? cropperConfig.autoCropWidth > trueW
            ? trueW
            : cropperConfig.autoCropWidth
          : trueW * 0.8
      const h =
        cropperConfig?.autoCropHeight && isNumber(cropperConfig.autoCropHeight)
          ? cropperConfig.autoCropHeight > trueH
            ? trueH
            : cropperConfig.autoCropHeight
          : trueH * 0.8
      cw = w
      ch = (cw * cropperConfig.fixedNumber[1]) / cropperConfig.fixedNumber[0]
      if (ch > trueH) {
        ch = h
        cw = (ch * cropperConfig.fixedNumber[0]) / cropperConfig.fixedNumber[1]
      }
    }
    const scale = refCropper.value.scale
    if (scale) {
      cw = cw * scale
      ch = ch * scale
    }
    if (cw && ch) {
      setTimeout(() => {
        refCropper.value?.goAutoCrop(Math.round(cw), Math.round(ch))
      })
    }
  }
}

onMounted(() => {
  previewUrl.value = URL.createObjectURL(props.file as File)
  if (isObject(props.config)) {
    Object.assign(cropperConfig, props.config)
  }

  // 处理默认比例
  let scale = 'custom'
  if (cropperConfig.fixed && cropperConfig.fixedNumber.length === 2) {
    const value = cropperConfig.fixedNumber.join(':')
    const row = cropList.value.find((item) => item.value === value)
    if (row) scale = value
  }
  targetCrop.value = scale
})

const infoTrueList = ref([
  { label: '按真实图片宽高输出图片', value: true },
  { label: '按裁剪框宽高输出图片', value: false }
])

const outputTypeList = ref([
  { label: 'png', value: 'png' },
  { label: 'jpeg', value: 'jpeg' },
  { label: 'jpg', value: 'jpg' }
])

const confirm = () => {
  refCropper.value?.getCropBlob((blob: Blob) => {
    const file = new File([blob], props.file?.name as string, { type: props.file?.type })
    emit('confirm', file)
  })
}
</script>

<style lang="scss">
.cropper-wrapper {
  .el-button + .el-button {
    margin-left: 0;
  }
}
</style>
