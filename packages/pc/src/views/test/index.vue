<template>
  <div class="m-4 box">
    <Upload @change="handleChange" type="files_big"></Upload>

  </div>
</template>

<script setup lang="ts">
import Upload from '@/components/Upload/index.vue'

const handleChange = (file) => {
  console.log(file)
}

</script>

<style lang="scss" scoped>
</style>