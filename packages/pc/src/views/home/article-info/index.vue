<!--
  @describe: 文章详情
  @author: cpl
  @create: 2022-10-23 00:46:36
-->

<template>
  <div class="w-full bg-white shadow p-6 info-container">
    <div class="text-xl font-bold">{{ dataInfo?.title }}</div>
    <div class="w-full border bg py-3 pl-10 pr-3 relative mt-4">
      <div class="text-light">
        <span class="mr-4">名称</span>
      </div>
      <div class="w-full mt-3 flex items-center justify-between text-lighter text-sm">
        <div>
          <span>标签：</span>
          <ElTag round size="small" class="ml-2">哈哈</ElTag>
          <ElTag round size="small" class="ml-2">哈哈</ElTag>
        </div>
        <div>
          <span class="mr-4">终端来源</span>
          <span class="mr-4">2022-12-12 10:00</span>
        </div>
      </div>
      <img :src="$STATIC_URL + '/pc/icons/icon_qita.png'" alt="" class="absolute left-0 -top-1 w-9" />
      <div class="absolute top-2 right-8">
        <ElTag effect="dark" size="small" disable-transitions type="danger">热门</ElTag>
        <ElTag effect="dark" size="small" disable-transitions class="ml-2">置顶</ElTag>
      </div>
    </div>
    <!-- 封面图 -->
    <img :src="$STATIC_URL + 'pc/images/login_bg.jpg'" class="mt-4 info-cover-img" alt="" />
    <!-- 内容 -->
    <EditorPreview type="401" value="哈哈哈" class="mt-4"></EditorPreview>
    <!-- 附件 -->
    <div>
      <div class="text-light mb-2">附件：</div>
      <ShowFile :model-value="[]"></ShowFile>
    </div>
    <!-- 点赞收藏 -->
    点赞收藏
    <!-- 评论列表 -->
    评论列表
    <!-- 关于我们 -->
    关于我们
  </div>
</template>

<script lang="ts" setup>
import { ElTag } from 'element-plus'
import EditorPreview from '@/components/EditorPreview/index.vue'
import ShowFile from '@/components/ShowFile/index.vue'
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

  .info-cover-img {
    width: 100%;
    height: 100%;
    max-height: 300px;
    object-fit: contain;
  }
}
</style>
