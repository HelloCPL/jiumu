<template>
  <div class="m-4 box">
    <Editor class="mb-6" v-model="vv" @change="handleChange"></Editor>
  </div>
</template>

<script setup lang="ts">
  import {ref} from 'vue'
import Editor from '@/components/Editor/index.vue'
const vv = ref('chushizhi')
const handleChange = (val) => {
  console.log('change', val);
}

</script>

<style lang="scss" scoped>
</style>