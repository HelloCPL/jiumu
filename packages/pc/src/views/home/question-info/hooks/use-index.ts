/*
 * 问答详情处理逻辑
 */
import { getQuestionOne } from '@/api/question'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useIndex = () => {
  const route = useRoute()
  const router = useRouter()

  const dataInfo = ref<DataQuestion | null>(null)
  const getDataInfo = async (id: string) => {
    const res = await getQuestionOne({ id })
    if (res.code === 200) {
      dataInfo.value = res.data
    }
  }
  if (route.query.id) {
    getDataInfo(<string>route.query.id)
  }

  // 状态
  const iconType = computed(() => {
    if (dataInfo.value?.isDraft === '1') return '/pc/icons/icon_caogao.png'
    return ''
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
