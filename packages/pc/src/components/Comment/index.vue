<!--
  @describe: 评论列表
  @author: cpl
  @create: 2022-12-06 16:44:00
-->

<template>
  <div class="w-full py-4 border-t-1">
    <div class="text-lg flex items-center">
      <span>评论</span>
      <span class="ml-2 text-sm text-light">({{ total }})</span>
    </div>
    <ElInput
      type="textarea"
      placeholder="请输入内容"
      :autosize="{ minRows: 3, maxRows: 6 }"
      class="mt-4"
      v-model="value"
    ></ElInput>
    <div class="mt-4">
      <ElButton type="primary" @click="_addComment" :disabled="!value">发表评论</ElButton>
    </div>
    <div class="w-full mt-4 pt-4 border-t-1 flex" v-for="(item, index) in list" :key="item.id">
      <img
        :src="item.createUserAvatar.filePath"
        v-if="item.createUserAvatar"
        class="w-12 h-12 object-cover rounded-full mr-4"
      />
      <img
        :src="$STATIC_URL + '/pc/images/avatar2.png'"
        class="w-12 h-12 object-cover rounded-full mr-4"
        alt=""
        v-else
      />
      <div class="flex-1 bg-white-4">
        <div class="flex flex-col">
          <div class="flex items-center">
            <span class="text-light">{{ item.createUserName }}</span>
            <ElTag size="small" effect="plain" class="ml-2" v-if="item.isSelf === '1'">我的</ElTag>
            <ElTag size="small" effect="dark" class="ml-2" v-if="item.isTop === '1'">置顶</ElTag>
          </div>
          <span class="mt-2 leading-normal whitespace-pre">{{ item.content }}</span>
          <div class="flex justify-between items-center mt-2 text-sm">
            <span class="text-lighter">{{ formatDate(item.createTime, 'YYYY-MM-DD HH:mm') }}</span>
            <div class="flex items-center">
              <span
                class="text-danger cursor-pointer"
                v-if="item.isSelf === '1' || isSuper"
                @click="handleDelete(item, index)"
                >删除</span
              >
              <span class="ml-4 text-primary cursor-pointer">回复</span>
              <span
                class="ml-4 flex items-center cursor-pointer text-lighter"
                :class="{ 'text-primary': item.isLike === '1' }"
                @click="handleLike(item, index)"
              >
                <img
                  :src="$STATIC_URL + '/pc/icons/icon_like1.png'"
                  class="w-5"
                  alt=""
                  v-if="item.isLike === '0'"
                />
                <img :src="$STATIC_URL + '/pc/icons/icon_like2.png'" class="w-5" alt="" v-else />
                <span class="pl-1" v-if="item.likeCount">({{ item.likeCount }})</span>
              </span>
            </div>
          </div>
          <div class="mt-4" v-if="item.showComnent">
            <ElInput
              type="textarea"
              placeholder="请输入内容"
              :autosize="{ minRows: 3, maxRows: 3 }"
              v-model="value"
            ></ElInput>
            <div class="mt-4 flex justify-end">
              <ElButton type="primary">回复</ElButton>
            </div>
          </div>
        </div>
        <!-- 评论列表  -->
      </div>
    </div>
    <!-- 更多评论 -->
    <div class="mt-4 flex justify-center items-center" v-if="total && total > list.length">
      <span class="text-sm text-primary cursor-pointer flex items-center">
        <span>更多</span>
        <ElIcon class="duration-500 ml-1"><ArrowDownBold /></ElIcon>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElInput, ElButton, ElIcon, ElTag } from 'element-plus'
import { ArrowDownBold } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { commentProps, commentEmit } from './type'
import {
  addLike,
  deleteLike,
  addComment,
  getCommentOne,
  deleteCommentSelf,
  deleteCommentById,
  getCommentList
} from '@/api/interaction'
import { Confirm, Message } from '@/utils/interaction'
import { mergeArray } from '@/utils/tools'
import { formatDate } from '@jiumu/utils'
import { useUserStore } from '@/store/index'

const props = defineProps(commentProps)
const emit = defineEmits(commentEmit)

const isSuper = ref(false)

const userStore = useUserStore()
userStore.getUser('2').then((data) => {
  if (Array.isArray(data)) {
    data.find((item) => {
      if (item.code === 'super') {
        isSuper.value = true
        return true
      }
    })
  }
})

const pageNo = ref(1)
const pageSize = ref(10)
const total = ref(0)
const list = ref<DataCommentList[]>([])
const _getCommentList = async () => {
  if (pageNo.value === 1) list.value = []
  const res = await getCommentList({
    pageNo: pageNo.value,
    pageSize: pageSize.value,
    targetId: props.id,
    type: props.type
  })
  if (res.code === 200) {
    list.value = mergeArray(list.value, res.data)
    total.value = res.total
    pageNo.value += 1
  }
  console.log(res)
}
_getCommentList()

const value = ref<string>('')
// 新增
const _addComment = async () => {
  if (!value.value) {
    Message('请输入评论内容!')
    return
  }
  const res = await addComment({
    targetId: props.id,
    type: props.type,
    content: value.value
  })
  if (res.code === 200) {
    total.value += 1
    value.value = ''
    const res1 = await getCommentOne({ id: res.data })
    if (res1.code === 200 && res1.data) {
      list.value.unshift(res1.data)
    }
  }
}

// 删除
const handleDelete = (item: DataCommentList, index: number) => {
  Confirm('确定删除这条评论吗？').then(async () => {
    if (item.isSelf === '1') {
      const res = await deleteCommentSelf(item.id)
      if (res.code === 200) {
        total.value -= 1
        list.value.splice(index, 1)
      }
    } else {
      const res = await deleteCommentById(item.id)
      if (res.code === 200) {
        total.value -= 1
        list.value.splice(index, 1)
      }
    }
  })
}

// 点赞
const handleLike = async (item: DataCommentList, index: number) => {
  if (item.isLike === '1') {
    const res = await deleteLike(item.id)
    if (res.code === 200) {
      list.value[index].isLike = '0'
      list.value[index].likeCount -= 1
    }
  } else {
    const res = await addLike({
      targetId: item.id,
      type: '501'
    })
    if (res.code === 200) {
      list.value[index].isLike = '1'
      list.value[index].likeCount += 1
    }
  }
}
</script>
