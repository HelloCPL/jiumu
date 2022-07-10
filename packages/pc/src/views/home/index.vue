<!--
  @describe: 主页面入口
  @author: cpl
  @create: 2022-07-04 17:20:19
-->

<template>
  <div class="w-full h-screen bg">
    <!-- 头部 -->
    <Header></Header>
    <div class="w-full flex wrapper">
      <!-- 左侧导航 -->
      <Sidebar></Sidebar>
      <div class="h-full flex-1 shrink-0">
        <!-- 中间导航栏 -->
        <Navigator></Navigator>
        <div class="w-full h-full p-4 content">
          <Content></Content>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import Navigator from './components/Navigator.vue'
import Content from './components/Content.vue'

defineOptions({
  name: 'Home'
})
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
.wrapper {
  height: calc(100% - 55px);

  .content {
    height: calc(100% - 38px);
  }
}
</style>
