<template>
  <div class="box">
    <Table v-model:pageNo="pageNo" :small="true" :total="100" @change="handleChange">
    djdjdj
    <template #empty>你哈</template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import Table from '@/components/Table/index.vue';
import {ref} from 'vue'
const pageNo = ref<number>(2)
const pageSize = ref<number>(10)

const handleChange = () => {
  // console.log('pageNo', pageNo.value);
  // console.log('pageSize', pageSize.value);

}

const nextClick = (a) => {
  console.log('a99', a);

}

</script>

<style lang="scss" scoped>
</style>