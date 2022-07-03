<template>
  <div>
    你好
    {{ Test.name }}
    {{ Test.user }}
    <button @click="change">change</button>
    <button @click="change2">change2</button>
  </div>
</template>

<script setup lang="ts">
import { useTestStore } from './store'
import { login } from '@/api/user'
import { getArticleList } from '@/api/article'
import { useUserStore } from './store'
const Test = useTestStore()
const User = useUserStore()

const change = async () => {
  // Test.setCurrent()
  const params = {
    phone: 'root',
    password: '123456'
  }
  const res = await login(params)
  if (res) {
    User.setToken(res)
  }
  console.log(111)
}

const change2 = async () => {
  const res = await getArticleList()
  if (res) {
    res.data.forEach
  }
}
</script>
