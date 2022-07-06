<!--
  @describe: 主页面入口
  @author: cpl
  @create: 2022-07-04 17:20:19
-->

<template>
  <div>
    home
    <button class="text-red-500" @click="click">按钮</button>
    <span class="text-red-500 text-lg">哈哈哈</span>
    <router-view></router-view>
    <ElButton type="primary">安安</ElButton>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const click = () => {
  router.push({
    // path: '/role/a',
    name: 'Role',
    query: { a: 123 },
    params: { b: 123 }
  })
}
</script>
