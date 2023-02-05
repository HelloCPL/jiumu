<!--
  @describe: 主页面入口
  @author: cpl
  @create: 2022-07-04 17:20:19
-->

<template>
  <div class="w-full h-screen bg">
    <!-- 头部 -->
    <Header @show-user-info="showUserInfo"></Header>
    <div class="w-full flex home-wrapper">
      <!-- 左侧导航 -->
      <Sidebar></Sidebar>
      <div class="h-full flex-1 shrink-0 flex flex-col">
        <!-- 中间导航栏 -->
        <Navigator></Navigator>
        <div class="w-full py-4 px-5 home-content">
          <Content></Content>
        </div>
      </div>
    </div>

    <!-- 用户信息 -->
    <UserInfo @close="isShowUserInfo = false" v-if="isShowUserInfo"></UserInfo>
  </div>
</template>

<script lang="ts" setup>
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import Navigator from './components/Navigator.vue'
import Content from './components/Content.vue'
import UserInfo from '../components/UserInfo/index.vue'
import { useUserStore } from '@/store'
import { ref } from 'vue'

defineOptions({
  name: 'Home'
})

// 初始化用户信息
const userStore = useUserStore()
if (userStore.token && !userStore.userInfo) userStore.updateUser()

const isShowUserInfo = ref<boolean>(false)
const showUserInfo = () => {
  console.log(userStore.userInfo)

  if (userStore.userInfo) isShowUserInfo.value = true
}
</script>

<style lang="scss" scoped>
.home-wrapper {
  height: calc(100% - 55px);
}

.home-content {
  height: calc(100% - 2.5rem);
}
</style>
