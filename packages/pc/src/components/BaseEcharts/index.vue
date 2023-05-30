<!--
  @describe echarts 基础组件
  @author cpl
  @create 2023-05-30 18:11:24
-->

<template>
  <div ref="refChart" :style="{ width: w, height: h }"></div>
</template>

<script lang="ts" setup>
import { baseEchartsProps, baseEchartsEmit } from './type'
import { useIndex } from './index'

const props = defineProps(baseEchartsProps)
const emit = defineEmits(baseEchartsEmit)

const { refChart, w, h } = useIndex(props, emit)
</script>
