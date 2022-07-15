<template>
  <div>
    <div ref="box" class="box"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMousewheel } from '@jiumu/utils'
import { ref } from 'vue'
const box = ref<HTMLDivElement>()
// 只有在 .box 盒子内滚轮才会触发事件
onMousewheel(box, (type) => {
  console.log(type)
  // 向下滚动为 -1 向上滚动为 1
})
</script>

<style>
.box {
  height: 100px;
  width: 100px;
  background: red;
}
</style>
