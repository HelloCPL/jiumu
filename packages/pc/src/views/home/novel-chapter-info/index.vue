<!--
  @describe: 章节详情页面
  @author: cpl
  @create: 2023-02-04 18:42:48
-->

<template>
  <div class="w-full">
    <div class="w-full bg-white shadow p-6 chapter-info-container" v-if="dataInfo">
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
      <div class="flex flex-wrap gap-x-6 gap-y-4 mb-4" v-if="dataInfo.isSelf === '1'">
        <ElTag effect="plain" size="small">我的</ElTag>
      </div>
      <div class="text-lighter flex flex-wrap items-center gap-x-6 gap-y-2 mb-4">
        <span>
          <IconSvg name="book"></IconSvg>
          <span class="ml-1">{{ dataInfo.novelName }}</span>
        </span>
        <span>
          <IconSvg name="author"></IconSvg>
          <span class="ml-1">{{ dataInfo.novelAuthor }}</span>
        </span>
      </div>
      <div class="flex justify-between items-center text-sm text-lighter mb-4">
        <div class="flex"></div>
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
      <div class="w-full flex relative chapter-info-content">
        <!-- 内容 -->
        <EditorPreview
          type="401"
          :value="dataInfo.content"
          :is-show-title="false"
          :style="{ width: contentWidth }"
        ></EditorPreview>
        <div
          class="affix-chapter-info-content-preview bg-white shrink-0 pl-2"
          :class="previewTitleClass"
          :style="{ width: width + 'px', 'z-index': 999 }"
        >
          <ElAffix target=".affix-chapter-info-content-preview" :offset="40">
            <div class="w-full h-full bg-white relative title-wrapper">
              <!-- 展开收起按钮 -->
              <span
                class="absolute cursor-pointer title-icon"
                :class="{ 'title-icon-arrow': width === 0 }"
                @click="handleClickArrow"
              >
                <ElIcon>
                  <ArrowLeftBold></ArrowLeftBold>
                </ElIcon>
              </span>
              <!-- 目录列表 -->
              <div class="h-full pt-10 overflow-hidden" :style="{ width: width + 'px' }">
                <div style="min-width: 200px" class="w-full h-full flex flex-col">
                  <div class="w-full h-8 flex justify-center items-center bg-info-1">章节列表</div>
                  <div class="h-full g-scroll-y-0">
                    <div class="w-full flex flex-col">
                      <span
                        v-for="(item, index) in data"
                        class="text-sm cursor-pointer mb-4 hover:text-primary g-line-1"
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
            </div>
          </ElAffix>
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
import { ElTag, ElButton, ElAffix, ElIcon } from 'element-plus'
import { useIndex } from './hooks/use-index'
import { formatDate } from '@jiumu/utils'
import Interation from '@/components/Interation/index.vue'
import Comment from '@/components/Comment/index.vue'
import AboutUs from '@/components/AboutUs/index.vue'
import EditorPreview from '@/components/EditorPreview/index.vue'
import IconSvg from '@/components/IconSvg/index'
import { ArrowLeftBold } from '@element-plus/icons-vue'

defineOptions({
  name: 'NovelChapterInfo'
})

const {
  dataInfo,
  data,
  handleToOther,
  id,
  targetIndex,
  handleNext,
  chapter,
  width,
  contentWidth,
  previewTitleClass,
  handleClickArrow
} = useIndex()
</script>

<style lang="scss">
.chapter-info-content {
  .el-affix {
    width: auto !important;
  }
}
</style>

<style lang="scss" scoped>
.chapter-info-container {
  max-width: 1200px;
  min-height: 100vh;
  margin: 0 auto;
}

.title-wrapper {
  max-height: calc(100vh - 50px);
}

.title-icon {
  right: 0px;
  top: 5px;
  transition: transform ease 0.5s;
  transform: rotate(180deg);
}

.title-icon-arrow {
  transform: rotate(0deg);
}
</style>
