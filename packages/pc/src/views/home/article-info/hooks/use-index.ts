/**
 * @describe: 文章详情处理逻辑
 * @author: cpl
 * @create: 2022-10-23 11:04:25
 */

import { getArticleOne } from '@/api/article'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export const useIndex = () => {
  const route = useRoute()
  const dataInfo = ref<DataArticleInfo | null>()
  const getDataInfo = async (id: string) => {
    const res = await getArticleOne(id)
    if (res.code === 200) {
      dataInfo.value = res.data
    }
  }

  if (route.query.id) {
    getDataInfo(<string>route.query.id)
  }

  return {
    dataInfo
  }
}
