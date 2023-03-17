<!--
  @describe: 章节详情页面
  @author: cpl
  @create: 2023-02-04 18:42:48
-->

<template>
  <div class="w-full">
    <div class="w-full bg-white shadow p-6 info-container" v-if="dataInfo">
      <div class="text-xl font-bold mb-4 relative">
        <span>第{{ targetIndex + 1 }}章</span>
        <span class="ml-2">{{ dataInfo.title }}</span>
        <img
          :src="$STATIC_URL + '/pc/icons/icon_caogao.png'"
          alt=""
          class="absolute right-0 top-1 w-9"
          v-if="dataInfo.isDraft === '1'"
        />
      </div>
      <div class="flex justify-between items-center text-sm text-lighter mb-4">
        <div class="flex">
          <ElTag effect="plain" size="small" class="mr-4" v-if="dataInfo.isSelf === '1'">我的</ElTag>
          <span class="flex items-center mr-4">
            <IconSvg name="book"></IconSvg>
            <span class="ml-1">{{ dataInfo.novelName }}</span>
          </span>
          <span class="flex items-center mr-4">
            <IconSvg name="author"></IconSvg>
            <span class="ml-1">{{ dataInfo.novelAuthor }}</span>
          </span>
          <span class="flex items-center">
            <IconSvg name="word"></IconSvg>
            <span class="ml-1">{{ dataInfo.wordCount }}字</span>
          </span>
        </div>
        <div class="flex">
          <span class="flex items-center mr-4">
            <IconSvg name="time"></IconSvg>
            <span class="ml-1">{{ formatDate(dataInfo.updateTime, 'YYYY-MM-DD HH:mm') }}</span>
          </span>
          <span class="flex items-center">
            <IconSvg name="source"></IconSvg>
            <span class="ml-1">{{ dataInfo.terminal }}</span>
          </span>
        </div>
      </div>
      <div class="box-border relative mb-4 info-content" :style="{ 'padding-right': width + 20 + 'px' }">
        <!-- 内容 -->
        <EditorPreview type="401" :value="dataInfo.content" class="mt-4 flex-1"></EditorPreview>
        <div class="absolute top-0 right-0 h-full pt-10" :style="{ width: width + 'px' }">
          <div class="absolute top-0 left-0 w-full h-8 flex justify-center items-center bg-info-1">
            目录列表
          </div>
          <div class="h-full g-scroll-y-0">
            <div class="w-full flex flex-col">
              <span
                v-for="(item, index) in data"
                class="text-sm cursor-pointer mb-2 hover:text-primary g-line-1"
                :class="{
                  'text-lighter': chapter.ids && chapter.ids.includes(item.id),
                  'text-primary': item.id === id
                }"
                :key="item.id"
                @click="handleToOther(item)"
              >
                <span>第{{ index + 1 }}章</span>
                <span class="pl-2">{{ item.title }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- 备注 -->
      <div class="mb-4 text-sm text-lighter" v-if="dataInfo.remarks">{{ dataInfo.remarks }}</div>
      <div class="flex justify-center">
        <ElButton type="primary" text class="mr-4" :disabled="targetIndex === 0" @click="handleNext(false)">
          上一章
        </ElButton>
        <ElButton type="primary" text :disabled="targetIndex >= data.length - 1" @click="handleNext(true)">
          下一章
        </ElButton>
      </div>

      <!-- 点赞收藏 -->
      <Interation v-model="dataInfo" type="507" class="mt-4"></Interation>
      <!-- 评论列表 -->
      <Comment
        v-model="dataInfo"
        :id="dataInfo.id"
        type="507"
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
import EditorPreview from '@/components/EditorPreview/index.vue'
import IconSvg from '@/components/IconSvg/index'

defineOptions({
  name: 'NovelChapterInfo'
})

const width = 180

const { dataInfo, data, handleToOther, id, targetIndex, handleNext, chapter } = useIndex()
</script>

<style lang="scss" scoped>
.info-container {
  max-width: 1200px;
  min-height: 100vh;
  margin: 0 auto;

  .info-content {
    min-height: 500px;
  }
}
</style>
