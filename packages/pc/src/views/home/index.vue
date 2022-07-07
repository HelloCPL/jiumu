<!--
  @describe: 主页面入口
  @author: cpl
  @create: 2022-07-04 17:20:19
-->

<template>
  <div class="container">
    home
    <!-- <button @click="click">按钮</button> -->
    <div class="box" style="background-color: #c6e2ff">C6E2FF</div>
    <div class="box" style="background-color: #a0cfff">#A0CFFF</div>
    <div class="box" style="background-color: #79bbff">79BBFF</div>
    <div class="box" style="background-color: #409eff">409EFF</div>
    <div class="box" style="background-color: #337ecc">337ECC</div>

    <h1 style="color: #c6e2ff">一段文本内容 C6E2FF</h1>
    <h1 style="color: #a0cfff">一段文本内容 A0CFFF</h1>
    <h1 style="color: #79bbff">一段文本内容 79BBFF</h1>
    <h1 style="color: #409eff">一段文本内容 409EFF</h1>
    <h1 style="color: #337ecc">一段文本内容 337ECC</h1>
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
.box {
  width: 100px;
  height: 100px;
  margin: 20px;
  // background: #F56C6C;
  background: #f1a7a7;
}

h1 {
  font-size: 16px;
}
</style>
