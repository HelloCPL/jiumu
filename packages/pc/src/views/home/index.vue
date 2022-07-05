<!--
  @describe: 主页面入口
  @author: cpl
  @create: 2022-07-04 17:20:19
-->

<template>
  <div>
    home
    <button @click="click">按钮</button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const click = () => {
  router.push({
    path: '/test',
    query: { a: 123 },
    params: { b: 'abc' }
  })
}
</script>
