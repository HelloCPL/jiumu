<!--
  @describe 外部文件/外部链接
  @author cpl
  @create 2023-03-08 10:54:37
-->

<template>
  <div class="w-full">
    <div class="flex pt-2 source-box" v-for="(item, index) in dataList" :key="item.id || index">
      <span class="w-24 text-sm text-lighter pt-3">外部链接{{ toChineseNumber(index + 1) }}</span>
      <div class="pt-3 mr-4">
        <div
          class="w-20 h-20 flex flex-col items-center justify-center border-1 border-dashed cursor-pointer"
          @click="handleClickCoverImg(index)"
        >
          <template v-if="item.coverImg1 || item.coverImg2">
            <ElImage
              class="w-full h-full rounded"
              :src="item.coverImg1.filePath"
              lazy
              fit="cover"
              v-if="<DataBaseFile>item.coverImg1 && item.coverImg1.id"
            ></ElImage>
            <ElImage
              class="w-full h-full rounded"
              :src="item.coverImg2"
              lazy
              fit="cover"
              v-else-if="item.coverImg2"
            ></ElImage>
          </template>
          <template v-else>
            <ElIcon>
              <Plus />
            </ElIcon>
            <span class="text-xs text-lighter mt-2">封面图</span>
          </template>
        </div>
      </div>
      <div class="w-3/5 mr-4">
        <div class="pb-4 mt-2 relative" :class="{ 'source-box-error': item.titleError }">
          <ElInput
            type="text"
            placeholder="请输入标题"
            :validate-event="false"
            :model-value="item.title"
            @update:model-value="updateModelValue($event, index, 'title')"
            @blur="handleBlur(index, 'title')"
          ></ElInput>
          <span class="absolute bottom-0 left-0 text-xs text-danger" v-if="item.titleError">
            请输入链接标题
          </span>
        </div>
        <div class="pb-4 mt-2 relative" :class="{ 'source-box-error': item.linkError }">
          <ElInput
            type="text"
            placeholder="请输入链接地址"
            :validate-event="false"
            :model-value="item.link"
            @update:model-value="updateModelValue($event, index, 'link')"
            @blur="handleBlur(index, 'link')"
          ></ElInput>
          <span class="absolute bottom-0 left-0 text-xs text-danger" v-if="item.linkError">
            {{ linkTip }}
          </span>
        </div>
      </div>
      <div class="flex items-end pb-6 text-ml text-lighter" v-if="dataList.length > 1">
        <ElIcon
          class="mr-3 cursor-pointer opacity-0 source-icon"
          color="var(--jm-color-danger)"
          @click="handleDeleteOne(index)"
        >
          <RemoveFilled />
        </ElIcon>
        <ElIcon
          class="mr-3 cursor-pointer opacity-0 source-icon"
          @click="handleMove(index, 'up')"
          v-if="index !== 0"
        >
          <Top />
        </ElIcon>
        <ElIcon
          class="mr-3 cursor-pointer opacity-0 source-icon"
          @click="handleMove(index, 'down')"
          v-if="index !== dataList.length - 1"
        >
          <Bottom />
        </ElIcon>
      </div>
    </div>
    <div class="flex pl-16">
      <span class="cursor-pointer text-primary flex items-center" @click="handleAddOne">
        <ElIcon>
          <CirclePlusFilled />
        </ElIcon>
        <span class="ml-1">新增</span>
      </span>
    </div>

    <!-- 封面图上传组件 -->
    <CoverImg
      v-if="showCoverImg"
      :cover-img1="<DataBaseFile>dataList[targetCoverImgIndex].coverImg1"
      :cover-img2="dataList[targetCoverImgIndex].coverImg2"
      @close="showCoverImg = false"
      @confirm="handleConfirmCoverImg"
    ></CoverImg>
  </div>
</template>

<script lang="ts" setup>
import { toChineseNumber } from '@jiumu/utils'
import { ElIcon, ElInput, ElImage } from 'element-plus'
import { Plus, RemoveFilled, Top, Bottom, CirclePlusFilled } from '@element-plus/icons-vue'
import { uploadSourceProps, uploadSourceEmit } from './type'
import { useUploadSourceLink } from '../hooks/use-upload-source-link'
import CoverImg from './CoverImg.vue'

const props = defineProps(uploadSourceProps)
const emit = defineEmits(uploadSourceEmit)

const {
  linkTip,
  dataList,
  showCoverImg,
  targetCoverImgIndex,
  handleClickCoverImg,
  handleConfirmCoverImg,
  handleAddOne,
  handleDeleteOne,
  handleMove,
  updateModelValue,
  handleBlur
} = useUploadSourceLink(props, emit)
</script>

<style lang="scss">
.source-box-error .el-input__wrapper {
  box-shadow: 0 0 0 1px var(--el-color-danger) inset;
}
</style>

<style lang="scss" scoped>
.source-box:hover .source-icon {
  opacity: 1;
}
</style>
