/**
 * @describe: 我的文章草稿箱处理逻辑
 * @author: cpl
 * @create: 2022-10-23 01:00:37
 */

import { getArticleListSelf } from '@/api/article'
import { debounce } from 'lodash-es'
import { ref } from 'vue'

export const useIndex = () => {
  const keyword = ref<string>('')
  const type = ref<string>('')
  const classify = ref<string>('')

  const pageNo = ref<number>(1)
  const pageSize = ref<number>(10)
  const total = ref<number>(0)

  const data = ref<DataArticle[]>([])
  const getDataList = debounce(async (num?: number) => {
    if (num) pageNo.value = num
    const params: ParamsArticleListSelf = {
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      keyword: keyword.value,
      type: type.value,
      classify: classify.value,
      highlight: '1',
      isDraft: '1'
    }
    const res = await getArticleListSelf(params)
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
    classify.value = ''
    getDataList()
  }
  return {
    keyword,
    type,
    classify,
    pageNo,
    pageSize,
    total,
    data,
    getDataList,
    handleReset
  }
}
