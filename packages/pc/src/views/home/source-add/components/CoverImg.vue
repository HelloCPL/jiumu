<!--
  @describe: 封面图上传弹框
  @author: cpl
  @create: 2023-03-12 20:14:06
-->

<template>
  <Dialog title="封面图上传" @close="$emit('close')" class-content="p-4 relative cover-img-container">
    <div class="flex items-center">
      <span class="text-sm text-lighter mr-4">图片类型</span>
      <ElRadioGroup v-model="type" :validate-event="false">
        <ElRadio label="1">本地选择</ElRadio>
        <ElRadio label="2">外部链接</ElRadio>
      </ElRadioGroup>
    </div>
    <div v-if="type === '1'">
      <Upload type="images" :limit="2" :limited="_coverImg1.length" @change="handleChange"></Upload>
      <ShowImage v-model="_coverImg1" is-delete class="mt-4"></ShowImage>
    </div>
    <div v-else-if="type === '2'">
      <ElInput
        type="text"
        placeholder="请输入封面图地址"
        v-model="img2"
        @blur="handleBlur"
        :validate-event="false"
        clearable
      ></ElInput>
      <ShowImage v-model="_coverImg2" is-delete class="mt-4" @change="handleChangeImg2"></ShowImage>
    </div>
    <div class="text-xs text-lighter absolute left-4 bottom-2">提示：封面图类型只需选择上传一种即可。</div>
    <template #footer>
      <ElButton type="primary" :disabled="disabled" @click="confirm">确认</ElButton>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from '@/components/Dialog/index.vue'
import { ElRadioGroup, ElRadio, ElInput, ElButton } from 'element-plus'
import { coverImgProps, coverImgEmit } from './type'
import { ref, computed, watch } from 'vue'
import Upload from '@/components/Upload/index.vue'
import ShowImage from '@/components/ShowImage/index.vue'

const props = defineProps(coverImgProps)
const emit = defineEmits(coverImgEmit)

const type = ref<'1' | '2'>('1')

// 内部文件
const _coverImg1 = ref<DataBaseFile[]>([])
const handleChange = (file: DataBaseFile) => {
  _coverImg1.value = [file[0]]
}

// 外部链接
const img2 = ref<string>('')
const _coverImg2 = ref<string[]>([])
const handleBlur = () => {
  _coverImg2.value = [img2.value]
}
const handleChangeImg2 = (file: string[]) => {
  if (!file.length) img2.value = ''
}

const disabled = computed(() => {
  const flag =
    (type.value === '1' && _coverImg1.value.length) || (type.value === '2' && _coverImg2.value.length)
  if (flag) return false
  return true
})

// 回调
const confirm = () => {
  if (type.value === '1') emit('confirm', _coverImg1.value[0], type.value)
  else if (type.value === '2') emit('confirm', _coverImg2.value[0], type.value)
}

watch(
  () => props.coverImg1,
  (val) => {
    if (val) {
      type.value = '1'
      _coverImg1.value = [val]
    }
  },
  {
    immediate: true,
    deep: true
  }
)
watch(
  () => props.coverImg2,
  (val) => {
    if (val && !_coverImg1.value.length) {
      type.value = '2'
      _coverImg2.value = [val]
      img2.value = val
    }
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

<style lang="scss" scope>
.cover-img-container {
  min-height: 320px;
}
</style>
