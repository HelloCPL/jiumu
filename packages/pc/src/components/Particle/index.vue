<!--
  @describe: 粒子时间
  @author: cpl
  @create: 2023-08-20 15:47:37
-->

<template>
  <canvas class="clock-canvas" ref="box" :width="width" :height="height"></canvas>
</template>

<script lang="ts" setup>
import { particleProps } from './type'
import { useIndex } from './hooks/index'

const props = defineProps(particleProps)

const { box } = useIndex(props)
</script>
