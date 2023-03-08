<template>
  <div class="m-4 box">
    <!-- <Upload @change="handleChange" type="files_big"></Upload> -->
    <button @click="hh">按钮</button>

  </div>
</template>

<script setup lang="ts">
// import Upload from '@/components/Upload/index.vue'

// const handleChange = (file) => {
//   console.log(file)
// }
import {toChineseNum} from '@jiumu/utils'

const hh = () => {
  toChineseNum(10)
  toChineseNum(100)
  toChineseNum(1000)
  toChineseNum(10000)
  toChineseNum(100000)
  toChineseNum(1000000)
  toChineseNum(10000000)
  toChineseNum(100000000)
  toChineseNum(1000000000)
  toChineseNum(10000000000)
  toChineseNum(100000000000)
  toChineseNum(1000000000000)
  // toChineseNum(10000000000000)
  toChineseNum(100000100)
  toChineseNum(1002000)
}
</script>

<style lang="scss" scoped>
</style>