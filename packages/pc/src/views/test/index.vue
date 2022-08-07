<template>
  <div class="m-4 box">
    <SelectUser v-model="vv" class="mb-6"></SelectUser>
    <Upload @change="handleChange" type="images" accept="*" :limit="10" :limited="files.length" :multiple="true"></Upload>
    <ShowFile v-model="files"></ShowFile>
  </div>
</template>

<script setup lang="ts">
import SelectUser from '@/components/SelectUser/index.vue'
import Upload from '@/components/Upload/index.vue'
import ShowFile from '@/components/ShowFile/index.vue'
import {ref} from 'vue'

const vv = ref([])

const  files = ref<DataBaseFile[]>([])

const handleChange = (val: any) => {
  files.value.push(...val)
  console.log(11, files.value);
  
}

</script>

<style lang="scss" scoped>
</style>