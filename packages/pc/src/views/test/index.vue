<template>
  <div class="m-4 box">
    <Editor class="mb-6" type="401" :height="1000" v-model="vv" @change="handleChange"></Editor>
    <EditorPreview :value="vv" type="401"></EditorPreview>
  </div>
</template>

<script setup lang="ts">
  import {ref} from 'vue'
import Editor from '@/components/Editor/index.vue'
import EditorPreview from '@/components/EditorPreview/index.vue'
const vv = ref('chushizhi')
const v = ref('')
const handleChange = (val) => {
  console.log('change', vv.value);
}

</script>

<style lang="scss" scoped>
</style>