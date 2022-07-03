<template>
  <div>
    你好
    {{ Test.name }}
    {{ Test.user }}
    <button @click="change">change</button>
    你好
    {{ Test2.name }}
    {{ Test2.fav }}
    <button @click="change2">change2</button>
  </div>
</template>

<script setup lang="ts">
import { useTestStore } from './store/test'
import { useTestStore2 } from './store/test2'
const Test = useTestStore()

const change = () => {
  Test.setCurrent()
}

const Test2 = useTestStore2()
console.log(Test2)

let a = 1
const change2 = () => {
  a++
  Test2.setFav(a)
  console.log(Test2)
}
</script>
