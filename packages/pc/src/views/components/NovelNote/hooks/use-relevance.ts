/**
 * @describe: 笔记关联逻辑处理
 * @author: cpl
 * @create: 2023-02-11 01:10:03
 */

import { addNovelNoteLink, deleteNovelNoteLink, getNovelNoteLinkList } from '@/api/novel'
import { debounce } from 'lodash-es'
import { ref } from 'vue'
import { NovelNoteRelevanceProps, NovelNoteEmit } from '../type'

export const useRelevance = (props: NovelNoteRelevanceProps, emit: NovelNoteEmit) => {
  // 笔记列表
  const keyword = ref<string>('')
  const total = ref<number>(0)
  let pageNo = 1
  const dataList = ref<DataNovelNoteLink[]>([])
  const getDataList = debounce(async () => {
    if (pageNo === 1) dataList.value = []
    const res = await getNovelNoteLinkList({
      share: <string>props.targetShare,
      keyword: keyword.value,
      highlight: '1',
      pageNo,
      pageSize: 20
    })
    if (res.code === 200) {
      dataList.value = dataList.value.concat(res.data)
      _setChecked()
      total.value = res.total
      ++pageNo
    }
  }, 300)
  const search = () => {
    pageNo = 1
    getDataList()
  }

  // 所有笔记的关联交互
  const changeCheck = (checked: boolean, info: DataNovelNoteLink) => {
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
  const _addRelevance = async (info: DataNovelNoteLink) => {
    const res = await addNovelNoteLink({
      targetId: <string>props.targetId,
      targetType: <ParamsNovelNoteTargetType>props.targetType,
      share: <string>props.targetShare,
      noteId: info.id
    })
    if (res.code === 200) {
      info._checked = true
    }
  }

  // 取消关联
  const _deleteRelevance = async (info: DataNovelNoteLink) => {
    const res = await deleteNovelNoteLink({
      noteId: info.id,
      targetId: <string>props.targetId
    })
    if (res.code === 200) {
      info._checked = false
    }
  }

  // 设置关联
  const _setChecked = () => {
    dataList.value.forEach((item) => {
      item._checked = item.targetId === props.targetId
    })
  }

  return {}
}
