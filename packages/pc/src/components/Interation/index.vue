<!--
  @describe: 点赞 收藏
  @author: cpl
  @create: 2022-12-06 16:43:18
-->

<template>
  <div v-if="modelValue.isDraft !== '1'" class="w-full flex items-center py-4">
    <!-- 点赞  -->
    <div
      class="flex items-center py-2 px-3 rounded text-sm cursor-pointer mr-8 border-primary border-1"
      :class="
        modelValue.isLike === '1'
          ? 'hover:opacity-90 bg-primary text-basic-white'
          : 'hover:bg-primary-2  text-primary'
      "
      @click="handleClick('like')"
    >
      <IconSvg
        name="like"
        width="14"
        class="mr-1"
        fill="var(--jm-color-basic-white)"
        v-if="modelValue.isLike === '1'"
      ></IconSvg>
      <IconSvg name="like" width="14" class="mr-1" fill="var(--jm-color-primary)" v-else></IconSvg>
      <span class="mr-1">{{ modelValue.isLike === '1' ? '已点赞' : '点赞' }}</span>
      <span v-if="modelValue.likeCount">({{ modelValue.likeCount }})</span>
    </div>
    <!-- 收藏 -->
    <div
      class="flex items-center py-2 px-3 rounded text-sm cursor-pointer border-primary border-1"
      :class="
        modelValue.isCollection === '1'
          ? 'hover:opacity-90 bg-primary text-basic-white'
          : 'hover:bg-primary-2  text-primary'
      "
      @click="handleClick('collection')"
    >
      <IconSvg
        name="collection"
        width="14"
        class="mr-1"
        fill="var(--jm-color-basic-white)"
        v-if="modelValue.isCollection === '1'"
      ></IconSvg>
      <IconSvg name="collection" width="14" class="mr-1" fill="var(--jm-color-primary)" v-else></IconSvg>
      <span class="mr-1">{{ modelValue.isCollection === '1' ? '已收藏' : '收藏' }}</span>
      <span v-if="modelValue.collectionCount">({{ modelValue.collectionCount }})</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import { addLike, deleteLike, addCollection, deleteCollection } from '@/api/interaction'
import IconSvg from '@/components/IconSvg'

type Props = {
  modelValue: {
    id: string
    isLike: DataBaseStatus
    isCollection: DataBaseStatus
    isDraft?: DataBaseStatus
    likeCount: number
    collectionCount: number
    [x: string]: any
  }
  type: string
}
const props = defineProps<Props>()
const emit = defineEmits(['change', 'update:modelValue'])
watch(
  () => props.modelValue,
  () => {},
  { deep: true, immediate: true }
)

// 点击操作
const handleClick = async (type: string) => {
  if (type === 'like') {
    const isLike = props.modelValue.isLike === '1' ? '0' : '1'
    if (props.modelValue.isLike === '1') {
      const res = await deleteLike(props.modelValue.id)
      if (res.code === 200) {
        const info = {
          ...props.modelValue,
          isLike,
          likeCount: props.modelValue.likeCount - 1
        }
        emit('update:modelValue', info)
        emit('change', info)
      }
    } else {
      const res = await addLike({ targetId: props.modelValue.id, type: props.type })
      if (res.code === 200) {
        const info = {
          ...props.modelValue,
          isLike,
          likeCount: props.modelValue.likeCount + 1
        }
        emit('update:modelValue', info)
        emit('change', info)
      }
    }
  } else if (type === 'collection') {
    const isCollection = props.modelValue.isCollection === '1' ? '0' : '1'
    if (props.modelValue.isCollection === '1') {
      const res = await deleteCollection(props.modelValue.id)
      if (res.code === 200) {
        const info = {
          ...props.modelValue,
          isCollection,
          collectionCount: props.modelValue.collectionCount - 1
        }
        emit('update:modelValue', info)
        emit('change', info)
      }
    } else {
      const res = await addCollection({ targetId: props.modelValue.id, type: props.type })
      if (res.code === 200) {
        const info = {
          ...props.modelValue,
          isCollection,
          collectionCount: props.modelValue.collectionCount + 1
        }
        emit('update:modelValue', info)
        emit('change', info)
      }
    }
  }
}
</script>
