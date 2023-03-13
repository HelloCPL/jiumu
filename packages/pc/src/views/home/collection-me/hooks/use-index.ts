/**
 * @description 我的收藏列表处理逻辑
 * @author cpl
 * @create 2023-03-13 11:38:59
 */

import { getCollectionListSelf } from '@/api/interaction'
import { debounce } from 'lodash-es'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useIndex = () => {
  // 标签类型
  const type = ref<string>('')

  const pageNo = ref<number>(1)
  const pageSize = ref<number>(10)
  const total = ref<number>(0)

  const data = ref<DataCollection[]>([])
  const getDataList = debounce(async (num?: number) => {
    if (num) pageNo.value = num
    const params: ParamsArticleList = {
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      type: type.value,
      highlight: '1'
      // showUserInfo: '1'
    }
    const res = await getCollectionListSelf(params)
    if (res.code === 200) {
      data.value = res.data
      total.value = res.total
    }
  }, 300)
  getDataList()

  // 重置
  const handleReset = () => {
    type.value = ''
    getDataList(1)
  }

  // 跳转
  const router = useRouter()
  const handleShowInfo = (row: DataCollection) => {
    const list: ObjectAny = {
      502: 'QuestionInfo',
      503: 'SourceInfo',
      504: 'NovelInfo',
      505: 'ArticleInfo',
      507: 'NovelChapterInfo'
    }
    if (list[row.type]) {
      const routeUrl = router.resolve({
        name: list[row.type],
        query: {
          id: row.id
        }
      })
      window.open(routeUrl.href, '_blank')
    }
  }

  return {
    type,
    pageNo,
    pageSize,
    total,
    data,
    getDataList,
    handleReset,
    handleShowInfo
  }
}
