<!--
  @describe: 标题目录预览
  @author: cpl
  @create: 2022-09-22 16:04:04
-->

<template>
  <div class="h-full flex-shrink-0 border-l-1" style="width: 200px">
    <div class="g-scroll-y w-full">
      <p class="border-b-1 title-catalog">目录导航</p>
      <p
        class="px-2 my-2 cursor-pointer"
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
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  headers: {
    // 标题列表
    type: Array,
    default: () => []
  }
})
defineEmits(['change'])

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
          obj.paddingLeft = '1rem'
          obj.fontSize = '2rem'
        } else if (item.type === 'header2') {
          obj.paddingLeft = '1.25rem'
          obj.fontSize = '1.5rem'
        } else if (item.type === 'header3') {
          obj.paddingLeft = '1.5rem'
          obj.fontSize = '1.17rem'
        } else if (item.type === 'header4') {
          obj.paddingLeft = '1.75rem'
        } else {
          obj.paddingLeft = '2rem'
          obj.fontSize = '0.83rem'
        }
        _title.push(obj)
      }
    })
    titles.value = _title
  }
}

onMounted(() => {
  handleTitles(props.headers, true)
})

watch(
  () => props.headers,
  (val) => {
    handleTitles(val, true)
  },
  { deep: true, immediate: true }
)
</script>

<style lang="scss" scoped>
.title-catalog {
  height: 45px;
  line-height: 45px;
  padding: 0 14px;
  font-weight: 600;
  font-size: var(--jm-font-size-medium);
}
</style>
