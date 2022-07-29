<!--
  @describe: 选择用户弹框
  @author: cpl
  @create: 2022-07-28 17:18:48
-->

<template>
  <Dialog title="选择用户" class-content="bg-danger">
    <ElRow class="select-user-box-item">
      <ElCol :span="12" class="h-full pt-14 relative border-r-1">
        <!-- 搜索盒子 -->
        <div class="w-full h-14 absolute left-0 top-0 bg pt-3 px-4">
          <Search v-model="keyword" @search="search" @change="change"></Search>
        </div>
        <div class="w-full h-full pl-4 g-scroll-y">
          <p v-for="(item, index) in 100">ha哈哈{{ index }}--{{ item }}</p>
        </div>
      </ElCol>
      <ElCol :span="12" class="h-full">
        <div class="w-full h-full pl-4 pt-3 g-scroll-y">
          <p v-for="(item, index) in 100">ha哈哈{{ index }}--{{ item }}</p>
        </div>
      </ElCol>
    </ElRow>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from '@/components/Dialog/index.vue'
import Search from '@/components/Search/index.vue'
import { ElRow, ElCol } from 'element-plus'
import { ref } from 'vue'

const keyword = ref<string>('')

const search = () => {
  console.log(111, keyword.value)
}

const change = () => {
  console.log(123123, keyword.value)
}
</script>

<style lang="scss" scoped>
.select-user-box-item {
  height: 50vh;
}
</style>
