/**
 * @describe: 笔记关联逻辑处理
 * @author: cpl
 * @create: 2023-02-11 01:10:03
 */

import { debounce } from 'lodash-es'
import { ref } from 'vue'
import { NoteProps, NoteAddEmit } from '../type'
import { getDataDiff } from '@jiumu/utils'
import { addNoteLink, deleteNoteLink, getNoteLinkListByRootId } from '@/api/note'

export const useRelevance = (props: NoteProps, emit: NoteAddEmit) => {
  // 笔记列表
  const keyword = ref<string>('')
  const total = ref<number>(0)
  let pageNo = 1
  const dataList = ref<DataNoteLink[]>([])
  const getDataList = debounce(async () => {
    if (pageNo === 1) dataList.value = []
    const res = await getNoteLinkListByRootId({
      rootId: <string>props.rootId,
      targetId: <string>props.targetId,
      keyword: keyword.value,
      highlight: '1',
      pageNo,
      pageSize: 20
    })
    if (res.code === 200) {
      dataList.value = getDataDiff(dataList.value, res.data)
      _setChecked()
      total.value = res.total
      ++pageNo
    }
  }, 300)
  const search = () => {
    pageNo = 1
    getDataList()
  }
  getDataList()

  // 所有笔记的关联交互
  const changeCheck = (checked: boolean, info: DataNoteLink) => {
    let flag = false
    dataList.value.find((item) => {
      if (item.id === info.id) {
        flag = item._checked
      }
    })
    if (checked && !flag) {
      _addRelevance(info)
    } else if (!checked && flag) {
      _deleteRelevance(info)
    }
  }

  // 新增关联
  const _addRelevance = async (info: DataNoteLink) => {
    const res = await addNoteLink({
      targetId: <string>props.targetId,
      noteId: info.id
    })
    if (res.code === 200) {
      info._checked = true
      closeWord = 'add'
    }
  }

  // 取消关联
  const _deleteRelevance = async (info: DataNoteLink) => {
    const res = await deleteNoteLink({
      targetId: <string>props.targetId,
      noteId: info.id
    })
    if (res.code === 200) {
      info._checked = false
      closeWord = 'delete'
    }
  }

  // 设置关联
  const _setChecked = () => {
    dataList.value.forEach((item) => {
      item._checked = item.isTargetRelevance === '1'
    })
  }

  // 关闭
  let closeWord = 'close'
  const handleClose = () => {
    if (closeWord !== 'close') {
      emit('confirm')
    } else {
      emit('cancel')
    }
  }

  return {
    keyword,
    total,
    dataList,
    getDataList,
    search,
    changeCheck,
    handleClose
  }
}
