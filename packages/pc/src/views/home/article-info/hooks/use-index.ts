/**
 * @describe: 文章详情处理逻辑
 * @author: cpl
 * @create: 2022-10-23 11:04:25
 */

import { getArticleOne } from '@/api/article'
import { ref, computed } from 'vue'
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
  // 文章类型
  const iconType = computed(() => {
    if (dataInfo.value?.isDraft === '1') return '/pc/icons/icon_caogao.png'
    else if (dataInfo.value?.type === '301') return '/pc/icons/icon_yuanchuang.png'
    else if (dataInfo.value?.type === '302') return '/pc/icons/icon_zhuanzai.png'
    else if (dataInfo.value?.type === '303') return '/pc/icons/icon_fanyi.png'
    else return '/pc/icons/icon_qita.png'
  })
  // 是否热门
  const isHot = computed(() => {
    return (
      dataInfo.value &&
      dataInfo.value.isDraft === '0' &&
      (dataInfo.value.likeCount > 1000 || dataInfo.value.collectionCount > 100)
    )
  })

  if (route.query.id) {
    getDataInfo(<string>route.query.id)
  }

  return {
    dataInfo,
    iconType,
    isHot
  }
}
