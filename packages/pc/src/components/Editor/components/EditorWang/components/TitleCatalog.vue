<!--
  @describe: 标题目录预览
  @author: cpl
  @create: 2022-09-22 16:04:04
-->

<template>
  <div class="h-full flex-shrink-0 flex flex-col border-l-1" style="width: 200px">
    <div class="border-b-1 title-catalog">目录导航</div>
    <div class="flex-1 g-scroll-y title-ul">
      <div
        class="mb-4 cursor-pointer g-line-1 title-li"
        :style="{ paddingLeft: item.paddingLeft }"
        v-for="item in titles"
        :key="item.id"
        @click="$emit('change', item)"
      >
        {{ item.text }}
      </div>
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
  indent: number
}
const titles = ref<TitlesType[]>([])

const handleTitles = (headers: any[], active: boolean) => {
  if (active) {
    const _title: TitlesType[] = []
    let min = 4
    headers.forEach((item: any) => {
      const h = ['header1', 'header2', 'header3', 'header4', 'header5']
      let i = h.indexOf(item.type)
      if (item.children && item.children.length && i !== -1) {
        const obj: TitlesType = {
          text: item.children[0].text,
          id: item.id,
          type: item.type,
          indent: i
        }
        _title.push(obj)
        if (i < min) min = i
      }
    })
    _title.forEach((item) => {
      item.indent = item.indent - min
      item.paddingLeft = item.indent * 16 + 'px'
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
    console.log(99, val)

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

.title-ul {
  padding: 8px;
  padding-left: 14px;
}

.title-li {
  line-height: 1;
}
</style>
