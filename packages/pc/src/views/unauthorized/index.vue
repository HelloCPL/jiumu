<!--
  @describe: 未授权页面
  @author: cpl
  @create: 2022-07-06 11:16:56
-->

<template>
  <div class="w-full h-full bg-white flex flex-col items-center justify-center">
    <IconSvg name="unauthorized" :width="256" :height="256"></IconSvg>
    <div class="text-lg">你没有权限访问!</div>
    <div class="mt-4 text-lighter" v-if="msg">{{ msg }}</div>
    <div class="mt-4">
      <ElButton type="primary" @click="goHome">返回首页</ElButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconSvg from '@/components/IconSvg'
import { ElButton } from 'element-plus'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const msg = ref<any>('')
const route = useRoute()
onMounted(() => {
  if (route.query?.msg) {
    msg.value = route.query.msg
  }
})
const goHome = () => {
  location.href = '/'
}
</script>
