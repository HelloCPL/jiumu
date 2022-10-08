<!--
  @describe: 弹窗左右两侧组件
  @author cpl
  @update 2022-07-30 03:58:04
-->

<template>
  <ElRow :style="{ height }">
    <!-- 左侧 -->
    <ElCol
      :span="spanLeft"
      class="h-full relative"
      :class="{ 'pt-14': showLeftTop, 'border-r-1': showRight }"
      v-if="showLeft"
    >
      <!-- 左侧头部 -->
      <div class="w-full h-14 absolute left-0 top-0 bg flex items-center" v-if="showLeftTop">
        <slot name="leftTop">
          <Search
            class="mx-4"
            :class="{ 'popup-two-search': !showRight }"
            :model-value="keyword"
            @update:modelValue="$emit('update:keyword', $event)"
            @search="$emit('search', $event)"
          ></Search>
        </slot>
      </div>
      <!-- 左侧内容 -->
      <div class="w-full h-full g-scroll-y" v-infinite-scroll="scrollLeft" :infinite-scroll-distance="80">
        <slot name="left"></slot>
        <MoreBtn v-if="!moreLeft && showMore"></MoreBtn>
      </div>
    </ElCol>
    <!-- 右侧 -->
    <ElCol :span="spanRight" class="h-full relative" :class="{ 'pt-14': showRightTop }" v-if="showRight">
      <!-- 右侧头部 -->
      <div class="w-full h-14 absolute right-0 top-0 bg flex items-center border-b-1" v-if="showRightTop">
        <slot name="rightTop">
          <span class="pl-4 text-lg"
            >已选择
            <span v-if="total">({{ total }})</span>
          </span>
        </slot>
        <span
          class="absolute right-4 text-sm text-lighter hover:text-primary cursor-pointer g-center-y"
          v-if="showDelete"
          @click="$emit('delete')"
          >清空</span
        >
      </div>
      <!-- 右侧内容 -->
      <div class="w-full h-full g-scroll-y" v-infinite-scroll="scrollRight" :infinite-scroll-distance="80">
        <slot name="right"></slot>
        <MoreBtn v-if="!moreRight && showMore"></MoreBtn>
      </div>
    </ElCol>
  </ElRow>
</template>

<script lang="ts" setup>
import { ElRow, ElCol } from 'element-plus'
import Search from '@/components/Search/index.vue'
import { popupTwoProps, popupTwoEmits } from './type'
import { onMounted } from 'vue'
import MoreBtn from '@/components/MoreBtn/index.vue'

const props = defineProps(popupTwoProps)
const emit = defineEmits(popupTwoEmits)

let _mounted = false
onMounted(() => {
  _mounted = true
})

const scrollLeft = () => {
  if (_mounted && props.moreLeft) emit('scrollLeft')
}

const scrollRight = () => {
  if (_mounted && props.moreRight) emit('scrollRight')
}
</script>

<style lang="scss" scoped>
.popup-two-search {
  max-width: 260px;
}
</style>
