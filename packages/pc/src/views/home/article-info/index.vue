<!--
  @describe: 文章详情
  @author: cpl
  @create: 2022-10-23 00:46:36
-->

<template>
  <div class="w-full bg-white shadow p-6 info-container">
    <div class="text-xl font-bold">标题标题标题标题标题标题标题标题标题标题</div>
    <div class="w-full border bg py-2 pl-10 pr-4 relative mt-4">
      <span class="left-0 top-1 absolute px-2 bg-danger-6 rounded-sm info-header-tag">原创</span>
      都好好的的
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useIndex } from './hooks/use-index'

defineOptions({
  name: 'ArticleInfo'
})
const { dataInfo } = useIndex()
</script>

<style lang="scss" scoped>
.info-container {
  max-width: 1200px;
  min-height: 100vh;
  margin: 0 auto;

  .info-header-tag {
    transform: skew(0, -10deg) rotate(10deg) perspective(800px);
  }
}
</style>
