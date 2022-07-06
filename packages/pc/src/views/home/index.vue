<!--
  @describe: 主页面入口
  @author: cpl
  @create: 2022-07-04 17:20:19
-->

<template>
  <div>
    home
    <button class="text-red-500" @click="click">按钮</button>
    <span class="dark:text-red-500 text-lg">哈哈哈</span>
    <span class="box">哈哈哈</span>
    <router-view></router-view>
    <ElButton type="primary">安安</ElButton>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { changeRootVar } from '@/utils/theme'
const router = useRouter()
const click = () => {
  changeRootVar()
  // router.push({
  //   // path: '/role/a',
  //   name: 'Role',
  //   query: { a: 123 },
  //   params: { b: 123 }
  // })
}
</script>

<style lang="scss" scoped>
.box {
  color: var(--theme-sky);
  // color: blue;
}
</style>
