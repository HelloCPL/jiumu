/**
 * 笔记逻辑处理
 */

import { FilterButtonList } from '@/components/FilterButton/type'
import { Confirm, Message } from '@/utils/interaction'
import { debounce } from 'lodash-es'
import { ref, computed } from 'vue'
import { NoteProps, NoteEmit } from '../type'
import { deleteNote, getNoteList } from '@/api/note'

export const useList = (props: NoteProps, emit: NoteEmit) => {
  // 控制显隐
  const beforeClose = () => {
    emit('close')
  }
  const _title = computed(() => {
    if (props.title) return `笔记列表(${props.title})`
    return '笔记列表'
  })

  const keyword = ref<string>('')
  const isSecret = ref<DataBaseStatus>()
  // 自定义标签类型
  const classify = ref<string>('')

  const pageNo = ref<number>(1)
  const pageSize = ref<number>(10)
  const total = ref<number>(0)

  const data = ref<DataNote[]>([])
  const getDataList = debounce(async (num?: number) => {
    if (num) pageNo.value = num
    const params: ParamsNoteList = {
      targetId: <string>props.targetId,
      relevance: '1',
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      keyword: keyword.value,
      highlight: '1',
      classify: classify.value,
      isSecret: isSecret.value,
      showUserInfo: '0'
    }
    const res = await getNoteList(params)
    if (res.code === 200) {
      data.value = res.data
      total.value = res.total
    }
  }, 300)

  getDataList()

  // 重置
  const handleReset = () => {
    keyword.value = ''
    classify.value = ''
    getDataList(1)
  }

  // 处理增加 编辑 删除
  const currentId = ref('')
  const showAdd = ref(false)
  const showRelevance = ref<boolean>(false)
  const btnList: FilterButtonList[] = [
    {
      name: '新增',
      key: 'add',
      type: 'primary',
      click: () => {
        showAdd.value = true
        currentId.value = ''
      }
    },
    {
      name: '关联',
      key: 'relevance',
      click: () => {
        showRelevance.value = true
      }
    }
  ]

  const handleCancelAdd = () => {
    showAdd.value = false
  }
  const handleConfirmAdd = () => {
    showAdd.value = false
    getDataList(1)
  }

  const handleCancelRelevance = () => {
    showRelevance.value = false
  }
  const handleConfirmRelevance = () => {
    showRelevance.value = false
    getDataList(1)
  }

  // 点击编辑
  const handleEdit = (row: DataNote) => {
    showAdd.value = true
    currentId.value = row.id
  }

  // 删除
  const handleDelete = (row: DataNote) => {
    Confirm('确定删除这项数据吗？').then(async () => {
      const res = await deleteNote(row.id)
      if (res.code === 200) {
        Message({
          message: res.message,
          type: 'success'
        })
        getDataList()
      }
    })
  }

  return {
    beforeClose,
    _title,

    keyword,
    isSecret,
    classify,
    pageNo,
    pageSize,
    total,
    data,
    getDataList,
    handleReset,

    currentId,
    showAdd,
    showRelevance,
    btnList,
    handleCancelAdd,
    handleConfirmAdd,
    handleCancelRelevance,
    handleConfirmRelevance,

    handleEdit,
    handleDelete
  }
}
