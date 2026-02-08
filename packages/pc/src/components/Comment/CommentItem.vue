<!--
  @describe: 评论的每一项
  @author: cpl
  @create: 2022-12-29 10:57:23
-->

<template>
  <div class="w-full mt-4 pt-4 border-t-1 flex">
    <img
      :src="target.createUserAvatar.filePath"
      v-if="target.createUserAvatar"
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
        <div class="flex flex-wrap items-center gap-4 text-light">
          <span class="text-primary cursor-pointer" @click="toPage(target.createUser)">{{
            target.createUserName
          }}</span>
          <span v-if="target.replyUser">
            <span>回复</span>
            <span class="pl-1 text-primary cursor-pointer" @click="toPage(target.replyUser)">{{
              target.replyUserName
            }}</span>
          </span>
          <ElTag size="small" effect="plain" v-if="target.isSelf === '1'">我的</ElTag>
          <ElTag type="danger" size="small" effect="plain" v-else-if="target.isTargetUser === '1'">
            作者
          </ElTag>
          <ElTag size="small" effect="dark" v-if="target.isTop === '1'">置顶</ElTag>
        </div>
        <span class="mt-4 leading-normal whitespace-pre">{{ target.content }}</span>
        <div class="flex flex-wrap items-center gap-4 mt-4 text-sm">
          <span
            class="flex items-center text-danger cursor-pointer"
            v-if="target.isSelf === '1' || isSuper()"
            @click="$emit('delete', index, parentIndex)"
          >
            <IconSvg name="delete" fill="var(--jm-color-danger)"></IconSvg>
            <span class="pl-1">删除</span>
          </span>
          <span
            class="flex items-center text-primary cursor-pointer"
            @click="$emit('showComment', index, parentIndex)"
          >
            <IconSvg name="comment" fill="var(--jm-color-primary)"></IconSvg>
            <span class="pl-1">回复</span>
            <span v-if="parentIndex === -1 && target.commentCount > 0" class="pl-1">
              ({{ target.commentCount }})
            </span>
          </span>
          <span
            class="flex items-center cursor-pointer text-lighter"
            :class="{ 'text-primary': target.isLike === '1' }"
            @click="$emit('like', index, parentIndex)"
          >
            <IconSvg name="like" width="14" v-if="target.isLike === '0'"></IconSvg>
            <IconSvg name="like" width="14" fill="var(--jm-color-primary)" v-else></IconSvg>
            <span class="pl-1">{{ target.isLike === '1' ? '已点赞' : '点赞' }}</span>
            <span class="pl-1" v-if="target.likeCount">({{ target.likeCount }})</span>
          </span>
        </div>
        <div class="mt-2 text-lighter">{{ formatDate(target.createTime, 'YYYY-MM-DD HH:mm') }}</div>
        <div class="mt-4" v-if="target._showComment">
          <ElInput
            type="textarea"
            placeholder="请输入内容"
            :autosize="{ minRows: 3, maxRows: 3 }"
            v-model="value"
          ></ElInput>
          <div class="mt-4 flex justify-end">
            <ElButton type="primary" @click="handleReply(index, parentIndex)" :disabled="!value">
              回复
            </ElButton>
          </div>
        </div>
      </div>
      <!-- 插槽 -->
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue'
import { formatDate } from '@jiumu/utils'
import { ElInput, ElButton, ElTag } from 'element-plus'
import { useRouter } from 'vue-router'
import IconSvg from '@/components/IconSvg'
import { isSuper } from '@/utils/permission'

defineProps({
  target: {
    type: Object as PropType<DataCommentList>,
    require: true,
    default: () => ({})
  },
  index: {
    // 索引
    type: Number,
    default: -1
  },
  parentIndex: {
    // 父级索引
    type: Number,
    default: -1
  }
})
const emit = defineEmits({
  delete: (index: number, parentIndex: number) => true,
  showComment: (index: number, parentIndex: number) => true,
  like: (index: number, parentIndex: number) => true,
  reply: (value: string, index: number, parentIndex: number) => true
})
const value = ref('')
defineExpose({
  value
})

const handleReply = (index: number, parentIndex: number) => {
  emit('reply', value.value, index, parentIndex)
  setTimeout(() => {
    value.value = ''
  }, 1000)
}

const router = useRouter()
const toPage = (id: string) => {
  const routeUrl = router.resolve({
    path: '/user-info',
    query: {
      id
    }
  })
  window.open(routeUrl.href, '_blank')
}
</script>
