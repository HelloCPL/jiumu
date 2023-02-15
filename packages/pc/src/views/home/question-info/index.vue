<!--
  @describe: 我的问答详情页面
  @author: cpl
  @create: 2023-01-12 14:36:27
-->

<template>
  <div class="w-full">
    <div class="w-full bg-white shadow p-6 info-container" v-if="dataInfo">
      <div class="text-xl font-bold">{{ dataInfo.title }}</div>
      <!-- 问答信息 -->
      <div class="w-full border bg py-3 pl-10 pr-3 relative mt-4">
        <div class="text-light">
          <span
            class="mr-4 hover:text-primary cursor-pointer"
            @click="toPage((dataInfo as DataQuestion).createUser)"
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
        <img :src="$STATIC_URL + iconType" alt="" class="absolute left-0 -top-1 w-9" v-if="iconType" />
        <div class="absolute top-0 right-0">
          <ElTag effect="dark" size="small" disable-transitions type="danger" v-if="isHot">热门</ElTag>
          <ElTag effect="dark" size="small" disable-transitions class="ml-2" v-if="dataInfo.isTop === '1'">
            置顶
          </ElTag>
        </div>
      </div>
      <!-- 内容 -->
      <EditorPreview type="402" :value="dataInfo.content" class="mt-4"></EditorPreview>
      <!-- 备注 -->
      <div class="mt-4 text-sm text-lighter">{{ dataInfo.remarks }}</div>
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
import { useIndex } from './hooks/use-index'
import { formatDate } from '@jiumu/utils'
import Interation from '@/components/Interation/index.vue'
import Comment from '@/components/Comment/index.vue'
import AboutUs from '@/components/AboutUs/index.vue'
import IconSvg from '@/components/IconSvg/index'

defineOptions({
  name: 'QuestionInfo'
})

const { dataInfo, iconType, isHot, toPage } = useIndex()
</script>

<style lang="scss" scoped>
.info-container {
  max-width: 1200px;
  min-height: 100vh;
  margin: 0 auto;
}
</style>
