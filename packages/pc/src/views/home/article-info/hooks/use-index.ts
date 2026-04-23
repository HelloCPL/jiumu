/**
 * @describe: 文章详情处理逻辑
 * @author: cpl
 * @create: 2022-10-23 11:04:25
 */

import { getArticleOne } from '@/api/article'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import caogaoIcon from '@/assets/icons/icon_caogao.png'
import yuanchuangIcon from '@/assets/icons/icon_yuanchuang.png'
import zhuanzaiIcon from '@/assets/icons/icon_zhuanzai.png'
import fanyiIcon from '@/assets/icons/icon_fanyi.png'
import qitaIcon from '@/assets/icons/icon_qita.png'

export const useIndex = () => {
  const route = useRoute()
  const router = useRouter()

  const dataInfo = ref<DataArticleInfo | null>(null)
  const getDataInfo = async (id: string) => {
    const res = await getArticleOne({ id })
    if (res.code === 200) {
      dataInfo.value = res.data
    }
  }
  if (route.query.id) {
    getDataInfo(<string>route.query.id)
  }

  // 状态
  const iconType = computed(() => {
    if (dataInfo.value?.isDraft === '1') return caogaoIcon
    else if (dataInfo.value?.type === '301') return yuanchuangIcon
    else if (dataInfo.value?.type === '302') return zhuanzaiIcon
    else if (dataInfo.value?.type === '303') return fanyiIcon
    else return qitaIcon
  })

  // 是否热门
  const isHot = computed(() => {
    return (
      dataInfo.value &&
      dataInfo.value.isDraft === '0' &&
      (dataInfo.value.likeCount > 1000 || dataInfo.value.collectionCount > 100)
    )
  })

  // 跳转个人中心
  const toPage = (id: string) => {
    const routeUrl = router.resolve({
      path: '/user-info',
      query: {
        id
      }
    })
    window.open(routeUrl.href, '_blank')
  }

  return {
    dataInfo,
    iconType,
    isHot,
    toPage
  }
}
