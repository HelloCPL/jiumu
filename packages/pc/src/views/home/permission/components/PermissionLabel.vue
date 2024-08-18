<!--
  @describe 权限标识文字显示
  @author cpl
  @create 2023-03-29 11:49:25
-->

<template>
  <span class="flex items-center">
    <GRichText :html="_html" />
    <icon-svg name="api" fill="var(--jm-color-success-400)" :size="28" v-if="isApi" class="mt-0.5"></icon-svg>
    <icon-svg
      name="button"
      fill="var(--jm-color-warning-400)"
      size="28"
      v-else-if="isButton"
      class="mt-1"
    ></icon-svg>
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import IconSvg from '@/components/IconSvg'
const props = defineProps({
  html: {
    type: String,
    default: ''
  }
})

const isApi = computed(() => props.html && props.html.startsWith('(') && props.html.endsWith(')'))
const isButton = computed(() => props.html && props.html.startsWith('[') && props.html.endsWith(']'))

const _html = computed(() => {
  if (isApi.value) {
    return props.html
      .replace(/^\(/, '<span class="text-success-400"><icon-svg name="button"></icon-svg>(</span>')
      .replace(/\)$/, '<span class="text-success-400">)</span>')
  } else if (isButton.value) {
    return props.html
      .replace(/^\[/, '<span class="text-warning-400">[</span>')
      .replace(/\]$/, '<span class="text-warning-400">]</span>')
  }
  return props.html
})
</script>
