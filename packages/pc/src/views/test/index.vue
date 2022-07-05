<template>
  <div>
    你好
    {{ Test.name }}
    {{ Test.user }}
    <button @click="change">change</button>
    <button @click="change2">change2</button>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { useTestStore, useUserStore } from '@/store'
import { login } from '@/api/user'
import { getArticleList } from '@/api/article'
const Test = useTestStore()
const User = useUserStore()

const change = async () => {
  // Test.setCurrent()
  const params = {
    phone: 'root',
    password: '123456'
  }
  const res = await login(params)
  if (res.code === 200) {
    User.setToken(res.data)
  }
}

const change2 = async () => {
  const res = await getArticleList()
  if (res.code === 200) {
    // res.data.forEach
  }
}
</script>
