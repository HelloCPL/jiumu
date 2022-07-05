<!--
  @describe: 主页面入口
  @author: cpl
  @create: 2022-07-04 17:20:19
-->

<template>
  <div>
    home
    <button @click="click">按钮</button>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useKeepAliveStore } from '@/store/keep-alive'
const ss = useKeepAliveStore()
ss.handleKeepAlive(123)
const router = useRouter()
const click = () => {
  router.push({
    // path: '/role/a',
    name: 'User',
    query: { a: 123 },
    params: { b: 'abc' }
  })
}
</script>
