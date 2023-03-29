<!--
  @describe 权限标识文字显示
  @author cpl
  @create 2023-03-29 11:49:25
-->

<template>
  <GRichText :html="_html" />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
const props = defineProps({
  html: {
    type: String,
    default: ''
  }
})

const _html = computed(() => {
  const flag1 = props.html && props.html.startsWith('(') && props.html.endsWith(')')
  const flag2 = props.html && props.html.startsWith('[') && props.html.endsWith(']')
  if (flag1) {
    return props.html
      .replace(/^\(/, '<span class="text-success-400">(</span>')
      .replace(/\)$/, '<span class="text-success-400">)</span>')
  } else if (flag2) {
    return props.html
      .replace(/^\[/, '<span class="text-warning-400">[</span>')
      .replace(/\]$/, '<span class="text-warning-400">]</span>')
  }
  return props.html
})
</script>
