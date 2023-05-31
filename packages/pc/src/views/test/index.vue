<template>
  <div class=" box">
    <BaseEcharts :option="option"></BaseEcharts>

    <div class="wrapp bg-danger" id="box1" @click="handle1"> </div>
    <div class="wrapp bg-primary" id="box2" @click="handle2"> </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import BaseEcharts from '@/components/BaseEcharts/index.vue'
import {getBarData} from './data'

const option = ref({})

setTimeout(() => {
  const o = getBarData()
  console.log('o', o);
  option.value = o

}, 1000)

const myBox = ref(null)
const handle1 = () => {
  const box: any = document.getElementById('box1')
  console.dir(box)
  console.log(box.style.backgroundColor)
  if(box.style.backgroundColor === 'green') {
    box.style.backgroundColor = 'red'
  } else {
    box.style.backgroundColor = 'green'
  }
}

let count = 1
const  handle2 = () => {
  count = count === 1 ? 2 : 1
  const box: any = document.getElementById('box2')
  // const div = `<div style=" background: ${count === 1 ? 'red' : 'green'}"><div>`
  const div = `<div class="ww2"><div>`
  if(box.innerHTML) {
    box.innerHTML = null
  } else {
    box.innerHTML = div
  }
}


</script>

<style lang="scss" scoped>
.box {
  background: #04061b;
  width: 100%;
  min-height: 100vh;
  padding: 36px;
}

.wrapp {
  margin-top: 20px;
  width: 300px;
  height: 300px;
  position: relative;
}


</style>

<style>
.ww2 {
  position: absolute; 
  top: 50px; 
  left: 50px; 
  width: 50px;
   height: 50px;
   background: pink;
}
</style>