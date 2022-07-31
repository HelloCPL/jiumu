<!--
  @describe: 账号显示组件
  @author cpl
  @update 2022-07-30 00:58:20
-->

<template>
  <span>{{ _text }}</span>
</template>

<script lang="ts" setup>
import { usernameShowProps } from './type'
import { ref, watch } from 'vue'

const props = defineProps(usernameShowProps)
const _text = ref<string>('')
const calculate = () => {
  if (props.text && props.text.length > props.start + props.end) {
    _text.value =
      props.text.substring(0, props.start) + '***' + props.text.substring(props.text.length - props.end)
  } else {
    _text.value = props.text
  }
}
calculate()
watch(
  () => props.text,
  () => {
    calculate()
  }
)
</script>

<style lang="scss" scoped></style>
