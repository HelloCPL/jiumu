<!--
  @describe: 图片列表展示组件
  @author cpl
  @update 2022-08-07 01:10:59
-->

<template>
  <div class="flex flex-wrap w-40 h-40" v-if="list.length">
    <div
      class="w-full h-full relative rounded show-image-wrapper"
      :class="{ 'mr-3': list.length > 1, 'mb-3': list.length > 1 }"
      v-for="(item, index) in list"
      :key="item"
    >
      <ElImage class="w-full h-full rounded" :src="item" lazy fit="cover"></ElImage>
      <!-- 遮罩层 -->
      <div
        class="absolute top-0 left-0 w-full h-full overlay-lighter text-xl text-white-8 items-center justify-center hidden show-image-item"
        v-if="isPreview || isDelete"
      >
        <ElIcon class="cursor-pointer" @click="handlePreview(index)" v-if="isPreview">
          <View />
        </ElIcon>
        <ElIcon class="ml-3 cursor-pointer" @click="handleDelete(index)" v-if="isDelete">
          <Delete />
        </ElIcon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElImage, ElIcon } from 'element-plus'
import { View, Delete } from '@element-plus/icons-vue'
import { showImageProps, showImageEmits } from './type'
import { computed, ref, watch } from 'vue'
import { isArray, isObject } from 'lodash-es'
import { Confirm } from '@jiumu/utils'
import { deleteFile } from '../../api/file'
import PreviewImage from '../ShowFile/components/PreviewImage'

defineOptions({
  name: 'ShowImageComponent'
})

const props = defineProps(showImageProps)
const emit = defineEmits(showImageEmits)

const computedDeleteFileApi = computed(() => props.deleteFileApi || deleteFile)

const list = ref<string[]>([])
watch(
  () => props.modelValue,
  (val) => {
    if (isArray(val)) {
      list.value = val.map((item) => {
        if (typeof item === 'string') return item
        return item.filePath
      })
    }
  },
  {
    deep: true,
    immediate: true
  }
)
// 预览
const handlePreview = (index: number) => {
  PreviewImage({
    url: list.value[index]
  })
}
// 删除
const handleDelete = (index: number) => {
  Confirm('确定删除这个图片吗？').then(async () => {
    const file = props.modelValue[index]
    if (isObject(file)) {
      // const res =
      await computedDeleteFileApi.value(file.id, false)
      // if (res.code === 200) {
      const arr = props.modelValue
      const item = arr.splice(index, 1)
      emit('update:modelValue', arr)
      emit('change', arr, item)
      // }
    } else {
      const arr = props.modelValue
      const item = arr.splice(index, 1)
      emit('update:modelValue', arr)
      emit('change', arr, item)
    }
  })
}
</script>

<style lang="scss" scoped>
.show-image-wrapper:hover {
  .show-image-item {
    display: flex;
  }
}
</style>
