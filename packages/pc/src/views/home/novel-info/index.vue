<!--
  @describe: 连载详情
  @author: cpl
  @create: 2023-01-20 18:27:53
-->

<template>
  <div class="w-full">
    <div class="w-full bg-white shadow p-6 info-container" v-if="dataInfo">
      <div class="text-sm text-lighter mb-4 relative">
        <span class="text text-xl font-bold mr-4">{{ dataInfo.name }}</span>
        <span class="mr-4">{{ dataInfo.author }}</span>
        <span>更新时间 {{ formatDate(dataInfo.updateTime, 'YYYY-MM-DD HH:mm') }}</span>
        <img
          :src="$STATIC_URL + '/pc/icons/icon_caogao.png'"
          alt=""
          class="absolute right-0 top-1 w-9"
          v-if="dataInfo.isDraft === '1'"
        />
      </div>
      <div class="mb-4" v-if="isHot || dataInfo.isSelf === '1'">
        <ElTag effect="dark" size="small" type="danger" class="mr-4" v-if="isHot">热门</ElTag>
        <ElTag effect="plain" size="small" v-if="dataInfo.isSelf === '1'">我的</ElTag>
      </div>
      <div class="text-lighter mb-4">
        <span class="mr-4">类型：{{ dataInfo.typeLabel }}</span>
        <span class="mr-4">{{ dataInfo.wordCount }}字</span>
        <span class="mr-4">{{ dataInfo.likeCount + dataInfo.chapterLikeCount }}赞</span>
        <span>{{ dataInfo.collectionCount + dataInfo.chapterCollectionCount }}收藏</span>
      </div>
      <div class="mb-8 flex justify-between">
        <ElButton type="primary" class="px-12">开始阅读</ElButton>
        <span class="text-lighter text-sm">来源：{{ dataInfo.terminal }}</span>
      </div>
      <div class="mb-8">{{ dataInfo.introduce }}</div>
      <div class="mb-8">
        <div class="text-lg mb-4">
          <span class="mr-4">列表({{ dataInfo.chapterCount }}章)</span>
          <ElButton size="small" type="info" text>上次读到第12章</ElButton>
        </div>
        <div class="w-full flex flex-wrap">
          <div v-for="(item, index) in dataList" :key="item.id" class="w-1/3 mb-4 pr-4 g-line-1">
            <span class="text-light cursor-pointer hover:text-primary-500">
              第{{ index + 1 }}章 {{ item.title }}
            </span>
          </div>
        </div>
      </div>
      <div>{{ dataInfo.remarks }}</div>
      <!-- 点赞收藏 -->
      <Interation v-model="dataInfo" type="504" class="mt-4"></Interation>
      <!-- 评论列表 -->
      <Comment
        v-model="dataInfo"
        :id="dataInfo.id"
        type="504"
        :comment-count="dataInfo.commentCount"
      ></Comment>
    </div>
    <!-- 关于我们 -->
    <AboutUs></AboutUs>
  </div>
</template>

<script lang="ts" setup>
import { ElTag, ElButton } from 'element-plus'
import { useIndex } from './hooks/use-index'
import { formatDate } from '@jiumu/utils'
import Interation from '@/components/Interation/index.vue'
import Comment from '@/components/Comment/index.vue'
import AboutUs from '@/components/AboutUs/index.vue'

defineOptions({
  name: 'NovelInfo'
})

const { dataInfo, dataList, isHot } = useIndex()
</script>

<style lang="scss" scoped>
.info-container {
  max-width: 1200px;
  min-height: 100vh;
  margin: 0 auto;
}
</style>
