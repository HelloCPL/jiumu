<!--
  @describe: 
  @author chen
  @update 2022-06-05 12:25:50
-->

<template>
  <div>
    <input v-model="message" type="text" />
    <div ref="div">{{ message }}</div>
    <button @click="change">change</button>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
const message = ref<string>('哈哈')
const div = ref<HTMLElement>()
const change = async () => {
  message.value = '大哈哈'
  await nextTick()
  console.log(div.value?.innerText)
}
</script>
