/*
 * 所有问答页面处理逻辑
 */

import { getQuestionList } from '@/api/question'
import { debounce } from 'lodash-es'
import { ref } from 'vue'

export const useIndex = () => {
  const keyword = ref<string>('')

  const pageNo = ref<number>(1)
  const pageSize = ref<number>(10)
  const total = ref<number>(0)

  const data = ref<DataQuestion[]>([])
  const getDataList = debounce(async (num?: number) => {
    if (num) pageNo.value = num
    const params: ParamsQuestionList = {
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      keyword: keyword.value,
      highlight: '1'
      // showUserInfo: '1'
    }
    const res = await getQuestionList(params)
    if (res.code === 200) {
      data.value = res.data
      total.value = res.total
    }
  }, 300)
  getDataList()

  // 重置
  const handleReset = () => {
    keyword.value = ''
    getDataList(1)
  }

  return {
    keyword,
    pageNo,
    pageSize,
    total,
    data,
    getDataList,
    handleReset
  }
}
