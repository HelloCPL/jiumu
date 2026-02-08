<!--
  @describe: 连载详情
  @author: cpl
  @create: 2023-01-20 18:27:53
-->

<template>
  <div class="w-full">
    <div class="w-full bg-white shadow p-6 info-container" v-if="dataInfo">
      <div class="flex flex-wrap items-baseline text-sm text-lighter mb-4 relative">
        <span class="text text-xl font-bold mr-4">{{ dataInfo.name }}</span>
        <span class="flex items-center">
          <IconSvg name="author"></IconSvg>
          <span class="ml-1">{{ dataInfo.author }}</span>
        </span>
        <img
          :src="$STATIC_URL + '/pc/icons/icon_caogao.png'"
          alt=""
          class="absolute right-0 top-1 w-9"
          v-if="dataInfo.isDraft === '1'"
        />
      </div>
      <div
        class="flex flex-wrap gap-x-6 gap-y-4 mb-4"
        v-if="isHot || dataInfo.isSelf === '1' || dataInfo.classify?.length"
      >
        <ElTag effect="dark" size="small" type="danger" v-if="isHot">热门</ElTag>
        <ElTag effect="plain" size="small" type="success" v-if="dataInfo.isSelf === '1'">我的</ElTag>
        <template v-if="dataInfo.classify?.length">
          <ElTag effect="plain" size="small" v-for="item in dataInfo.classify" :key="item.id">
            {{ item.label }}
          </ElTag>
        </template>
      </div>
      <div class="text-lighter mb-4">
        <span class="mr-4">类型：{{ dataInfo.typeLabel }}</span>
        <span class="mr-4" v-if="dataInfo.likeCount + dataInfo.chapterLikeCoun > 0">
          <IconSvg name="like" fill="var(--jm-color-primary)"></IconSvg>
          <span class="ml-1">收获{{ dataInfo.likeCount + dataInfo.chapterLikeCount }}赞</span>
        </span>
        <span v-if="dataInfo.collectionCount + dataInfo.chapterCollectionCount > 0">
          <IconSvg name="collection" fill="var(--jm-color-primary)"></IconSvg>
          <span class="ml-1">收获{{ dataInfo.collectionCount + dataInfo.chapterCollectionCount }}收藏</span>
        </span>
      </div>
      <div class="text-lighter mb-4">
        <span>最近更新时间：</span>
        <span class="ml-1">{{ formatDate(dataInfo.updateTime, 'YYYY-MM-DD HH:mm') }}</span>
      </div>
      <div class="mb-8 flex justify-between">
        <ElButton
          type="primary"
          class="px-12"
          :disabled="dataList.length === 0"
          @click="handleToChapterIndex(0)"
          v-if="targetIndex === -1"
        >
          开始阅读
        </ElButton>
        <ElButton
          type="primary"
          class="px-12"
          :disabled="dataList.length === 0"
          @click="handleToChapterIndex(targetIndex)"
          v-else
        >
          继续阅读
        </ElButton>
        <span class="flex items-center text-lighter text-sm">
          <IconSvg name="source"></IconSvg>
          <span class="ml-1">{{ dataInfo.terminal }}</span>
        </span>
      </div>
      <div class="mb-8">{{ dataInfo.introduce }}</div>
      <div class="mb-8">
        <div class="text-lg mb-4">
          <span class="mr-4">章节总数({{ dataInfo.chapterCount }}章)</span>
          <ElButton
            size="small"
            type="info"
            text
            v-if="targetIndex !== -1"
            @click="handleToChapterIndex(targetIndex)"
          >
            上次读到第{{ targetIndex + 1 }}章
          </ElButton>
        </div>
        <div class="w-full flex flex-wrap gap-x-6 gap-y-4">
          <div v-for="(item, index) in dataList" :key="item.id" class="g-line-1" :class="itemClass">
            <span
              class="cursor-pointer hover:text-primary-500"
              :class="{ 'text-lighter': chapter.ids && chapter.ids.includes(item.id) }"
              @click="handleToChapter(item)"
            >
              <span>第{{ index + 1 }}章</span>
              <span class="pl-1">{{ item.title }}</span>
            </span>
          </div>
        </div>
      </div>

      <!-- 备注 -->
      <div class="text-sm text-lighter" v-if="dataInfo.remarks">{{ dataInfo.remarks }}</div>
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
    <Lasyloader :delay="100">
      <AboutUs></AboutUs>
    </Lasyloader>
  </div>
</template>

<script lang="ts" setup>
import { ElTag, ElButton } from 'element-plus'
import { useIndex } from './hooks/use-index'
import { formatDate } from '@jiumu/utils'
import Interation from '@/components/Interation/index.vue'
import Comment from '@/components/Comment/index.vue'
import IconSvg from '@/components/IconSvg/index'
import { useWidth } from '@/hooks/use-width'
import { computed, defineAsyncComponent } from 'vue'
import Lasyloader from '@/components/LazyLoader/index.vue'

const AboutUs = defineAsyncComponent(() => import('@/components/AboutUs/index.vue'))

defineOptions({
  name: 'NovelInfo'
})

const { dataInfo, dataList, isHot, handleToChapter, handleToChapterIndex, chapter, targetIndex } = useIndex()

const { width } = useWidth()
const itemClass = computed(() => {
  if (width.value <= 768) {
    return 'w-full'
  }
  return 'g-w-280'
})
</script>

<style lang="scss" scoped>
.info-container {
  max-width: 1200px;
  min-height: 100vh;
  margin: 0 auto;
}
</style>
