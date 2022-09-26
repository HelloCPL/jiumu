<!--
  @describe: 标题目录预览
  @author: cpl
  @create: 2022-09-22 16:04:04
-->

<template>
  <div
    class="flex-shrink-0 overflow-hidden border-l-1"
    :style="{ width: catalog.width + 'px', opacity: catalog.opacity }"
  >
    <div class="g-scroll-y" style="width: 220px">
      <p class="text-lg text-lighter p-2">导航目录</p>
      <p
        class="p-2 cursor-pointer"
        :style="{ paddingLeft: item.paddingLeft, fontSize: item.fontSize }"
        v-for="item in titles"
        :key="item.id"
        @click="$emit('change', item)"
      >
        {{ item.text }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  active: {
    // 是否激活状态
    type: Boolean,
    default: false
  },
  headers: {
    // 标题列表
    type: Array,
    default: () => []
  }
})
defineEmits(['change'])

const catalog = ref({
  width: 0,
  opacity: 0
})

type TitlesType = {
  text: string
  id: string
  type: string
  paddingLeft?: string
  fontSize?: string
}
const titles = ref<TitlesType[]>([])

const handleTitles = (headers: any[], active: boolean) => {
  if (active) {
    const _title: TitlesType[] = []
    headers.forEach((item: any) => {
      if (item.children && item.children.length) {
        const obj: TitlesType = {
          text: item.children[0].text,
          id: item.id,
          type: item.type
        }
        if (item.type === 'header1') {
          obj.paddingLeft = '0.5rem'
          obj.fontSize = '2rem'
        } else if (item.type === 'header2') {
          obj.paddingLeft = '0.75rem'
          obj.fontSize = '1.5rem'
        } else if (item.type === 'header3') {
          obj.paddingLeft = '1rem'
          obj.fontSize = '1.17rem'
        } else if (item.type === 'header4') {
          obj.paddingLeft = '1.25rem'
        } else {
          obj.paddingLeft = '1.5rem'
          obj.fontSize = '0.83rem'
        }
        _title.push(obj)
      }
    })
    titles.value = _title
  }
}

watch(
  () => props.active,
  (val) => {
    if (val) {
      gsap.to(catalog.value, {
        width: 220,
        opacity: 1
      })
    } else {
      gsap.to(catalog.value, {
        width: 0,
        opacity: 0
      })
    }
    handleTitles(props.headers, val)
  }
)
watch(
  () => props.headers,
  (val) => {
    handleTitles(val, props.active)
  },
  { deep: true }
)
</script>

<style lang="scss" scoped></style>
