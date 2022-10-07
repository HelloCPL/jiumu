<!--
  @describe: 所有自定义标签管理页面
  @author: cpl
  @create: 2022-07-12 14:54:30
-->

<template>
  <div class="p-6">
    <Editor v-model="vv" type="401" @change="change"></Editor>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Editor from '@/components/Editor/index.vue'
defineOptions({
  name: 'Classify'
})

const vv = ref('')
const change = (val) => {
  console.log(val)
}
</script>
