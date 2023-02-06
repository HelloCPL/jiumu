/**
 * 笔记逻辑处理
 */

import { deleteNovelNote, getNovelNoteList } from '@/api/novel'
import { FilterButtonList } from '@/components/FilterButton/type'
import { Confirm, Message } from '@/utils/interaction'
import { debounce } from 'lodash-es'
import { ref } from 'vue'
import { NovelNoteProps, NovelNoteEmit } from '../type'

export const useList = (props: NovelNoteProps, emit: NovelNoteEmit) => {
  const isShow = ref(false)
  const currentId = ref('')
  const handleShow = () => {
    isShow.value = !isShow.value
  }

  const keyword = ref<string>('')
  // 自定义标签类型
  const classify = ref<string>('')

  const pageNo = ref<number>(1)
  const pageSize = ref<number>(10)
  const total = ref<number>(0)

  const data = ref<DataNovelNote[]>([])
  const getDataList = debounce(async (num?: number) => {
    if (num) pageNo.value = num
    const params: ParamsNovelNoteList = {
      targetId: props.id,
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      keyword: keyword.value,
      classify: classify.value,
      highlight: '1',
      showUserInfo: '1'
    }
    const res = await getNovelNoteList(params)
    if (res.code === 200) {
      data.value = res.data
      total.value = res.total
    }
  }, 300)

  // 重置
  const handleReset = () => {
    keyword.value = ''
    classify.value = ''
    getDataList(1)
  }

  const btnList: FilterButtonList[] = [{ name: '新增', key: 'add', type: 'primary' }]
  // 点击按钮
  const handleBtn = (item: FilterButtonList) => {
    switch (item.key) {
      case 'add':
        isShow.value = true
        currentId.value = ''
        return
    }
  }

  // 点击编辑
  const handleEdit = (row: DataNovelNote) => {
    isShow.value = true
    currentId.value = row.id
  }

  // 删除
  const handleDelete = (row: DataNovelNote) => {
    Confirm('确定删除这项数据吗？').then(async () => {
      const res = await deleteNovelNote(row.id)
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
    isShow,
    currentId,
    keyword,
    classify,
    pageNo,
    pageSize,
    total,
    data,
    getDataList,
    handleReset,

    btnList,
    handleBtn,
    handleEdit,
    handleDelete
  }
}
