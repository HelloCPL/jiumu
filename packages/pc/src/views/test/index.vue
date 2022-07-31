<template>
  <div class="m-4 box">
    <SelectUser v-model="aa"></SelectUser>
    哈哈哈
    <UpDown v-model="show">
      <p v-for="(item, index) in 15">哈哈哈{{index}}</p>
    </UpDown>
  </div>
</template>

<script setup lang="ts">
import SelectUser from '@/components/SelectUser/index.vue'
import UpDown from '@/components/UpDown/index.vue'
import {ref} from 'vue'
const aa = ref([])

const show = ref(false)

</script>

<style lang="scss" scoped>
</style>