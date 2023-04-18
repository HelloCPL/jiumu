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
import { titleCatalogProps, titleCatalogEmit } from './type'
import { useTitleCatalog } from '../hooks/use-title-catalog'

const props = defineProps(titleCatalogProps)
defineEmits(titleCatalogEmit)

const { titles } = useTitleCatalog(props)
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
