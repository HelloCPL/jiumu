<!--
  @describe 权限标识文字显示
  @author cpl
  @create 2023-03-29 11:49:25
-->

<template>
  <span class="flex items-center">
    <GRichText :html="_html" class="pr-2" />
    <template v-if="isApi">
      <ElTooltip content="此类权限标识主要用于API接口访问权限控制" placement="top">
        <icon-svg name="api" fill="var(--jm-color-success-400)" :size="28" class="mt-0.5"></icon-svg>
      </ElTooltip>
    </template>
    <template v-else-if="isButton">
      <ElTooltip content="此类权限标识主要用于前端按钮级别的权限控制" placement="top">
        <icon-svg name="button" fill="var(--jm-color-warning-400)" size="28" class="mt-1"></icon-svg>
      </ElTooltip>
    </template>
  </span>
</template>

<script lang="ts" setup>
import { ElTooltip } from 'element-plus'
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
      .replace(
        /^\(/,
        '<span class="text-success-400 font-bold pr-0.5"><icon-svg name="button"></icon-svg>(</span>'
      )
      .replace(/\)$/, '<span class="text-success-400 font-bold pl-0.5">)</span>')
  } else if (isButton.value) {
    return props.html
      .replace(/^\[/, '<span class="text-warning-400 font-bold  pr-0.5">[</span>')
      .replace(/\]$/, '<span class="text-warning-400 font-bold pl-0.5">]</span>')
  }
  return props.html
})
</script>
