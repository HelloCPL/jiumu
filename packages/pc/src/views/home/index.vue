<!--
  @describe: 主页面入口
  @author: cpl
  @create: 2022-07-04 17:20:19
-->

<template>
  <div class="container">
    home
    <!-- <button @click="click">按钮</button> -->
    <div class="text-primary-500">一段文本内容</div>
    <div class="text-red-500">一段文本内容</div>
    <div class="text-white">一段文本内容</div>
    <div class="text-green-500">一段文本内容</div>
  </div>
</template>

<script lang="ts" setup>
// import { useRouter } from 'vue-router'
// const router = useRouter()
// const click = () => {
//   router.push({
//     // path: '/role/a',
//     name: 'Role',
//     query: { a: 123 },
//     params: { b: 123 }
//   })
// }
</script>

<style lang="scss" scoped>
.container {
  background: #f3f4f6;
}
</style>
