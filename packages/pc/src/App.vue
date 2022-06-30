<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <div class="box">
    <span>你好</span>
    <span>{{ msg }}</span>
    <span>{{ aaa }}</span>
    <span>{{ ddd }}</span>
    <button @click="handleClicke">按钮</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const msg = ref<string>('哈哈')
// msg.value
type Props = {
  title: string
}
defineProps<Props>()
const aaa = '123'
const ddd = '123'
const aa = "123";

const handleClicke = () => {
  msg.value = '1123'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
