<!--
  @describe: 图片列表展示组件
  @author cpl
  @update 2022-08-07 01:10:59
-->

<template>
  <div class="flex flex-wrap" v-if="list.length">
    <div
      class="w-40 h-40 relative rounded mr-3 mb-3 show-image-wrapper"
      v-for="(item, index) in list"
      :key="item"
    >
      <ElImage class="w-full h-full rounded" :src="item" lazy fit="cover"></ElImage>
      <!-- 遮罩层 -->
      <div
        class="absolute top-0 left-0 w-full h-full overlay-lighter text-xl text-white-8 items-center justify-center hidden show-image-item"
        v-if="isPreview || isDelete"
      >
        <ElIcon class="mr-3 cursor-pointer" @click="handlePreview(index)" v-if="isPreview">
          <View />
        </ElIcon>
        <ElIcon class="cursor-pointer" @click="handleDelete(index)" v-if="isDelete">
          <Delete />
        </ElIcon>
      </div>
    </div>

    <!-- 图片预览 -->
    <PreviewImage
      :url-list="list"
      :initial-index="targetIndex"
      v-if="isShow"
      @close="isShow = false"
    ></PreviewImage>
  </div>
</template>

<script lang="ts" setup>
import { ElImage, ElIcon } from 'element-plus'
import { View, Delete } from '@element-plus/icons-vue'
import { showImageProps } from './type'
import { ref, watch } from 'vue'
import { isArray, isObject } from 'lodash-es'
import PreviewImage from '@/components/ShowFile/components/PreviewImage.vue'
import { Confirm } from '@/utils/interaction'
import { deleteFile } from '@/api/file'

const props = defineProps(showImageProps)
const emit = defineEmits(['update:modelValue', 'change'])

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

const isShow = ref(false)
const targetIndex = ref(0)
// 预览
const handlePreview = (index: number) => {
  targetIndex.value = index
  isShow.value = true
}
// 删除
const handleDelete = (index: number) => {
  Confirm('确定删除这个图片吗？').then(async () => {
    const file = props.modelValue[index]
    if (isObject(file)) {
      const res = await deleteFile(file.id)
      if (res.code === 200) {
        const arr = props.modelValue
        const item = arr.splice(index, 1)
        emit('update:modelValue', arr)
        emit('change', arr, item)
      }
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