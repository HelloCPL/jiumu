/*
 * 我的问答草稿箱
 */

import { getQuestionListSelf } from '@/api/question'
import { debounce } from 'lodash-es'
import { ref } from 'vue'

export const useIndex = () => {
  const keyword = ref<string>('')
  const classify = ref<string>('')

  const pageNo = ref<number>(1)
  const pageSize = ref<number>(10)
  const total = ref<number>(0)

  const data = ref<DataQuestion[]>([])
  const getDataList = debounce(async (num?: number) => {
    if (num) pageNo.value = num
    const params: ParamsQuestionListSelf = {
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      keyword: keyword.value,
      classify: classify.value,
      isDraft: '1',
      highlight: '1'
    }
    const res = await getQuestionListSelf(params)
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

  return {
    keyword,
    classify,
    pageNo,
    pageSize,
    total,
    data,
    getDataList,
    handleReset
  }
}
