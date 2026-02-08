/*
 * 评论组件逻辑处理
 */
import { CommentEmit, CommentProps } from './type'
import { ref } from 'vue'
import {
  addLike,
  deleteLike,
  addComment,
  getCommentOne,
  deleteCommentSelf,
  deleteCommentById,
  getCommentList
} from '@/api/interaction'
import { mergeArray } from '@/utils/tools'
import { Confirm, Message } from '@/utils/interaction'

export const useIndex = (props: CommentProps, emit: CommentEmit) => {
  // 请求评论列表
  let pageNo = 1
  const pageSize = 10
  const total = ref(0)
  const list = ref<DataCommentList[]>([])
  const handleGetList = async () => {
    if (pageNo === 1) list.value = []
    const res = await getCommentList({
      pageNo,
      pageSize,
      targetId: props.modelValue.id,
      type: props.type
    })
    if (res.code === 200) {
      // 处理返回数据
      res.data.forEach((item) => {
        item._showComment = false
        item._pageNo = 1
      })
      list.value = mergeArray(list.value, res.data)
      total.value = res.total
      pageNo += 1
      for (let i = 0, len = list.value.length; i < len; i++) {
        const info = list.value[i]
        if (info._pageNo === 1 && info.commentCount > 0) {
          await handleGetChildrenList(i)
        }
      }
    }
  }
  handleGetList()

  // 请求子评论列表
  const handleGetChildrenList = async (index: number, pageSize = 10) => {
    const info = list.value[index]
    if (info._pageNo === 1) info.children = []
    const res = await getCommentList({
      pageNo: info._pageNo,
      pageSize,
      targetId: info.id,
      type: '501'
    })
    if (res.code === 200) {
      res.data.forEach((item) => {
        item._showComment = false
      })
      info.children = mergeArray(info.children, res.data)
      info._pageNo += 1
    }
  }

  // 新增评论
  const value = ref<string>('')
  const handleAddComment = async () => {
    if (!value.value) {
      Message('请输入评论内容!')
      return
    }
    const res = await addComment({
      targetId: props.modelValue.id,
      type: props.type,
      content: value.value
    })
    if (res.code === 200) {
      total.value += 1
      const info = {
        ...props.modelValue,
        commentCount: props.modelValue.commentCount + 1
      }
      emit('update:modelValue', info)
      emit('change', info)
      value.value = ''
      const res1 = await getCommentOne({ id: res.data })
      if (res1.code === 200 && res1.data) {
        list.value.unshift(res1.data)
      }
    }
  }

  // 删除某条评论
  const handleDelete = (index: number, parentIndex: number) => {
    Confirm('确定删除这条评论吗？').then(async () => {
      const item = parentIndex === -1 ? list.value[index] : list.value[parentIndex].children[index]
      let res
      if (item.isSelf === '1') {
        res = await deleteCommentSelf(item.id)
      } else {
        res = await deleteCommentById(item.id)
      }
      if (res && res.code === 200) {
        const info = {
          ...props.modelValue,
          commentCount: props.modelValue.commentCount - 1
        }
        emit('update:modelValue', info)
        emit('change', info)
        if (parentIndex === -1) {
          total.value -= 1
          list.value.splice(index, 1)
        } else {
          list.value[parentIndex].children.splice(index, 1)
          list.value[parentIndex].commentCount -= 1
        }
      }
    })
  }

  // 点赞/取消点赞 某条评论
  const handleLike = async (index: number, parentIndex: number) => {
    const item = parentIndex === -1 ? list.value[index] : list.value[parentIndex].children[index]
    if (item.isLike === '1') {
      const res = await deleteLike(item.id)
      if (res.code === 200) {
        if (parentIndex === -1) {
          list.value[index].isLike = '0'
          list.value[index].likeCount -= 1
        } else {
          list.value[parentIndex].children[index].isLike = '0'
          list.value[parentIndex].children[index].likeCount -= 1
        }
      }
    } else {
      const res = await addLike({
        targetId: item.id,
        type: '501'
      })
      if (res.code === 200) {
        if (parentIndex === -1) {
          list.value[index].isLike = '1'
          list.value[index].likeCount += 1
        } else {
          list.value[parentIndex].children[index].isLike = '1'
          list.value[parentIndex].children[index].likeCount += 1
        }
      }
    }
  }

  // 回复评论
  const showComment = (index: number, parentIndex: number) => {
    if (parentIndex === -1) {
      list.value[index]._showComment = !list.value[index]._showComment
    } else {
      list.value[parentIndex].children[index]._showComment =
        !list.value[parentIndex].children[index]._showComment
    }
  }
  const handleReply = async (value: string, index: number, parentIndex: number) => {
    const item = parentIndex === -1 ? list.value[index] : list.value[parentIndex].children[index]
    const res = await addComment({
      targetId: item.id,
      type: '501',
      content: value
    })
    if (res.code === 200) {
      item._showComment = false
      const info = {
        ...props.modelValue,
        commentCount: props.modelValue.commentCount + 1
      }
      emit('update:modelValue', info)
      emit('change', info)
      if (parentIndex === -1) {
        item.commentCount += 1
        const res1 = await getCommentOne({ id: res.data })
        if (res1.code === 200 && res1.data) {
          item.children.unshift(res1.data)
        }
      } else {
        list.value[parentIndex].commentCount += 1
        const res1 = await getCommentOne({ id: res.data })
        if (res1.code === 200 && res1.data) {
          list.value[parentIndex].children.splice(index + 1, 0, res1.data)
        }
      }
    }
  }
  return {
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
  }
}
