/**
 * 所有连载逻辑处理
 */

import { getNovelList } from '@/api/novel'
import { debounce } from 'lodash-es'
import { ref } from 'vue'

export const useIndex = () => {
  const keyword = ref<string>('')
  // 标签类型
  const type = ref<string>('')

  const pageNo = ref<number>(1)
  const pageSize = ref<number>(10)
  const total = ref<number>(0)

  // 列表数据
  const data = ref<DataNovel[]>([])
  const getDataList = debounce(async (num?: number) => {
    if (num) pageNo.value = num
    const params: ParamsNovelList = {
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      keyword: keyword.value,
      type: type.value,
      highlight: '1'
      // showUserInfo: '1'
    }
    const res = await getNovelList(params)
    if (res.code === 200) {
      data.value = res.data
      total.value = res.total
    }
  }, 300)
  getDataList()

  // 重置
  const handleReset = () => {
    keyword.value = ''
    type.value = ''
    getDataList(1)
  }

  return {
    keyword,
    type,
    pageNo,
    pageSize,
    total,
    data,
    getDataList,
    handleReset
  }
}
