<!--
  @describe: 评论列表
  @author: cpl
  @create: 2022-12-06 16:44:00
-->

<template>
  <div class="w-full py-4 border-t-1">
    <!-- 发表评论  -->
    <div class="text-lg flex items-center">
      <span>评论</span>
      <span class="ml-2 text-sm text-light">({{ _commentCount }})</span>
    </div>
    <ElInput
      type="textarea"
      placeholder="请输入内容"
      :autosize="{ minRows: 3, maxRows: 6 }"
      class="mt-4"
      v-model="value"
    ></ElInput>
    <div class="mt-4">
      <ElButton type="primary" @click="handleAddComment" :disabled="!value">发表评论</ElButton>
    </div>
    <!-- 评论列表  -->
    <CommentItem
      v-for="(item, index) in list"
      :target="item"
      :index="index"
      :is-super="isSuper"
      :key="item.id"
      @delete="handleDelete"
      @show-comment="showComment"
      @like="handleLike"
      @reply="handleReply"
    >
      <template v-if="item.children && item.children.length">
        <CommentItem
          v-for="(row, i) in item.children"
          :target="row"
          :index="i"
          :parent-index="index"
          :is-super="isSuper"
          :key="row.id"
          @delete="handleDelete"
          @show-comment="showComment"
          @like="handleLike"
          @reply="handleReply"
        ></CommentItem>
        <!-- 更多子评论 -->
        <div
          class="mt-4 flex justify-center items-center"
          v-if="item.commentCount && item.commentCount > item.children.length"
        >
          <span
            class="text-sm text-primary cursor-pointer flex items-center"
            @click="handleGetChildrenList(index)"
          >
            <span>更多({{ item.commentCount - item.children.length }})</span>
            <ElIcon class="duration-500 ml-1"><ArrowDownBold /></ElIcon>
          </span>
        </div>
      </template>
    </CommentItem>
    <!-- 更多评论 -->
    <div class="mt-4 flex justify-center items-center" v-if="total && total > list.length">
      <span class="text-sm text-primary cursor-pointer flex items-center" @click="handleGetList">
        <span>更多</span>
        <ElIcon class="duration-500 ml-1"><ArrowDownBold /></ElIcon>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElInput, ElButton, ElIcon } from 'element-plus'
import { ArrowDownBold } from '@element-plus/icons-vue'
import { commentProps } from './type'
import { useIndex } from './index'
import CommentItem from './CommentItem.vue'

const props = defineProps(commentProps)

const {
  isSuper,
  _commentCount,
  total,
  list,
  handleGetList,
  handleGetChildrenList,
  value,
  handleAddComment,
  handleDelete,
  handleLike,
  showComment,
  handleReply
} = useIndex(props)
</script>
