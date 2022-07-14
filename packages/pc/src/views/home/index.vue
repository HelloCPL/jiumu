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
      <div class="h-full flex-1 shrink-0 flex flex-col">
        <!-- 中间导航栏 -->
        <Navigator></Navigator>
        <div class="w-full py-4 px-5 flex-1 flex-shrink-0">
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
import { useUserStore } from '@/store'

defineOptions({
  name: 'Home'
})

// 初始化用户信息
const userStore = useUserStore()
if (userStore.token && !userStore) userStore.getUser()
</script>

<style lang="scss" scoped>
.wrapper {
  height: calc(100% - 55px);
}
</style>
