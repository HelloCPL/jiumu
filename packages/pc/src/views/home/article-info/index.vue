<!--
  @describe: 文章详情
  @author: cpl
  @create: 2022-10-23 00:46:36
-->

<template>
  <div class="w-full">
    <div class="w-full bg-white shadow p-6 info-container" v-if="dataInfo">
      <div class="text-xl font-bold">{{ dataInfo.title }}</div>
      <!-- 文章信息 -->
      <div class="w-full border bg py-3 pl-10 pr-3 relative mt-4">
        <div class="text-light">
          <span
            class="mr-4 hover:text-primary cursor-pointer"
            @click="toPage((dataInfo as DataArticleInfo).createUser)"
          >
            {{ dataInfo.createUserName }}
          </span>
        </div>
        <div class="w-full mt-3 flex items-center justify-between text-lighter text-sm">
          <div>
            <div v-if="dataInfo.classify && dataInfo.classify.length">
              <span>标签：</span>
              <ElTag round size="small" class="ml-2" v-for="item in dataInfo.classify" :key="item.id">
                {{ item.label }}
              </ElTag>
            </div>
          </div>
          <div class="flex">
            <span class="flex items-center mr-4">
              <IconSvg name="time"></IconSvg>
              <span class="ml-1"> {{ formatDate(dataInfo.updateTime, 'YYYY-MM-DD hh:mm') }}</span>
            </span>
            <span class="flex items-center">
              <IconSvg name="source"></IconSvg>
              <span class="ml-1">{{ dataInfo.terminal }}</span>
            </span>
          </div>
        </div>
        <img :src="$STATIC_URL + iconType" alt="" class="absolute left-0 -top-1 w-9" />
        <div class="absolute top-0 right-0">
          <ElTag effect="dark" size="small" disable-transitions type="danger" v-if="isHot">热门</ElTag>
          <ElTag effect="dark" size="small" disable-transitions class="ml-2" v-if="dataInfo.isTop === '1'">
            置顶
          </ElTag>
        </div>
      </div>
      <!-- 封面图 -->
      <img :src="dataInfo.coverImg.filePath" class="mt-4 info-cover-img" alt="" v-if="dataInfo.coverImg" />
      <!-- 内容 -->
      <EditorPreview :type="dataInfo.contentType" :value="dataInfo.content" class="mt-4"></EditorPreview>
      <!-- 附件 -->
      <div class="mt-4" v-if="dataInfo.attachment && dataInfo.attachment.length">
        <div class="text-light mb-2">附件：</div>
        <ShowFile :model-value="dataInfo.attachment"></ShowFile>
      </div>
      <!-- 备注 -->
      <div class="mt-4" v-if="dataInfo.remarks">
        <span class="text-light mb-2">备注：</span>
        <span>{{ dataInfo.remarks }}</span>
      </div>
      <!-- 点赞收藏 -->
      <Interation v-model="dataInfo" type="505" class="mt-4"></Interation>
      <!-- 评论列表 -->
      <Comment
        v-model="dataInfo"
        :id="dataInfo.id"
        type="505"
        :comment-count="dataInfo.commentCount"
      ></Comment>
    </div>
    <!-- 关于我们 -->
    <AboutUs></AboutUs>
  </div>
</template>

<script lang="ts" setup>
import { ElTag } from 'element-plus'
import EditorPreview from '@/components/EditorPreview/index.vue'
import ShowFile from '@/components/ShowFile/index.vue'
import { useIndex } from './hooks/use-index'
import { formatDate } from '@jiumu/utils'
import Interation from '@/components/Interation/index.vue'
import Comment from '@/components/Comment/index.vue'
import AboutUs from '@/components/AboutUs/index.vue'
import IconSvg from '@/components/IconSvg/index'

defineOptions({
  name: 'ArticleInfo'
})

const { dataInfo, iconType, isHot, toPage } = useIndex()
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
