<template>
  <div class="m-4 box">
    <!-- <Editor class="mb-6" v-model="vv" type="402" @change="handleChange"></Editor> -->
    <!-- <EditorPreview :value="vv" type="401"></EditorPreview> -->
    <Interation v-model:isLike="isLike" v-model:isCollection="isCollection" :targetId="targetId" :type="type" @change="change"></Interation>
    
  </div>
</template>

<script setup lang="ts">
import Interation from '@/components/Interation/index.vue'
  import {ref} from 'vue'
// import Editor from '@/components/Editor/index.vue'
// import EditorPreview from '@/components/EditorPreview/index.vue'
// const vv = ref('chushizhi')
// const v = ref('')
// const handleChange = (val) => {
//   console.log('change', vv.value);
// }
const isLike = ref<'1' | '0'>('0')
const isCollection = ref<'1' | '0'>('0')
const targetId = ref('0fd0fe16-9362-42b7-8ca4-957c0b755ec8')
const type = ref('505')
const change = (a, b) => {
  console.log(a, b);
  
}

</script>

<style lang="scss" scoped>
</style>