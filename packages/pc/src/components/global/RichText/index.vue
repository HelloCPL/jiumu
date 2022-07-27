<!--
  @describe: 富文本展示组件 用于展示接口返回的富文本字段
  @author cpl
  @update 2022-07-25 15:53:08
-->

<template>
  <span v-html="xss.process(text)"></span>
</template>

<script lang="ts" setup>
import { xss } from '@jiumu/utils'
import { richTextProps } from './type'
defineExpose({
  name: 'GRichText'
})

defineProps(richTextProps)

</script>

<style lang="scss" scoped>
</style>