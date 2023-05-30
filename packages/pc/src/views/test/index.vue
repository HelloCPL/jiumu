<template>
  <div class=" box">
    <BaseEcharts :option="option"></BaseEcharts>
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


</script>

<style lang="scss" scoped>
.box {
  background: #04061b;
  width: 100%;
  min-height: 100vh;
  padding: 36px;
}
</style>