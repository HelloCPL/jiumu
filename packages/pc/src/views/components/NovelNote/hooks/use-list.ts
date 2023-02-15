/**
 * 笔记逻辑处理
 */

import { deleteNovelNote, getNovelNoteList } from '@/api/novel'
import { FilterButtonList } from '@/components/FilterButton/type'
import { Confirm, Message } from '@/utils/interaction'
import { debounce } from 'lodash-es'
import { ref, computed } from 'vue'
import { NovelNoteProps, NovelNoteEmit } from '../type'

export const useList = (props: NovelNoteProps, emit: NovelNoteEmit) => {
  // 控制显隐
  const isShow = ref(true)
  const beforeClose = () => {
    isShow.value = false
    setTimeout(() => {
      emit('close', 'close')
    }, 500)
  }
  const _title = computed(() => {
    if (props.title) return `笔记列表(${props.title})`
    return '笔记列表'
  })

  const targetShare = computed(() => {
    if (props.share) return props.share
    else if (props.type === '504') return props.id
    else return ''
  })

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
      showUserInfo: '0'
    }
    const res = await getNovelNoteList(params)
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
  const btnList: FilterButtonList[] = [
    { name: '新增', key: 'add', type: 'primary' },
    { name: '关联', key: 'relevance' }
  ]
  // 点击按钮
  const handleBtn = (item: FilterButtonList) => {
    switch (item.key) {
      case 'add':
        showAdd.value = true
        currentId.value = ''
        break
      case 'relevance':
        showRelevance.value = true
        break
    }
  }

  // 点击编辑
  const handleEdit = (row: DataNovelNote) => {
    showAdd.value = true
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

  const handleClose = (type?: string) => {
    showAdd.value = false
    showRelevance.value = false
    if (type !== 'close') getDataList()
  }

  const showRelevance = ref<boolean>(false)

  return {
    isShow,
    beforeClose,
    _title,
    targetShare,

    keyword,
    classify,
    pageNo,
    pageSize,
    total,
    data,
    getDataList,
    handleReset,

    currentId,
    showAdd,
    btnList,
    handleBtn,
    handleEdit,
    handleDelete,
    handleClose,

    showRelevance
  }
}
