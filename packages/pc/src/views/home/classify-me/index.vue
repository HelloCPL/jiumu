<!--
  @describe: 我的自定义标签管理页面
  @author: cpl
  @create: 2022-07-12 14:54:30
-->

<template>
  <div class="p-6">
    <Editor v-model="vv" v-model:type="type"></Editor>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Editor from '@/components/Editor/index.vue'
defineOptions({
  name: 'ClassifyMe'
})

const vv = ref('')
const type = ref('402')
</script>
