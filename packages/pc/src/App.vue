<template>
  <div>
    你好
    {{ Test.name }}
    {{ Test.newName }}
    {{ Test.user }}
    <button @click="change">change</button>
    {{ Test2.fav }}
    {{ Test2.newFav }}
    {{ Test2.name }}
    <button @click="change2">change2</button>
  </div>
</template>

<script setup lang="ts">
import { useTestStore, useTestStore2 } from './store'
const Test = useTestStore()
const Test2 = useTestStore2()
const change = () => {
  Test.setCurrent()
}
const change2 = () => {
  Test2.setFav()
}
</script>
