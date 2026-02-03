<!--
  @describe: 更多按钮
  @author cpl
  @update 2022-07-23 13:49:45
-->

<template>
  <div class="flex items-center justify-center my-2 text-sm">
    <span class="text-primary-8 cursor-pointer hover:text-primary" v-if="show" @click="$emit('click')">
      <ElIcon :size="getPx(14)">
        <CaretBottom />
      </ElIcon>
      <span class="pl-1">{{ text }}</span>
    </span>
    <span class="text-lighter" v-else-if="!show && isMounted">没有更多了...</span>
  </div>
</template>

<script lang="ts" setup>
import { ElIcon } from 'element-plus'
import { CaretBottom } from '@element-plus/icons-vue'
import { moreBtnProps, moreBtnEmits } from './type'
import { ref } from 'vue'
import { getPx } from '@/utils/tools'

defineProps(moreBtnProps)

defineEmits(moreBtnEmits)

const isMounted = ref<boolean>(false)

setTimeout(() => {
  isMounted.value = true
}, 1000)
</script>

<style lang="scss" scoped></style>
