/**
 * @description 资源详情页面处理逻辑
 * @author cpl
 * @create 2023-03-13 14:39:48
 */
import { getSourceOne } from '@/api/source'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useIndex = () => {
  const route = useRoute()
  const router = useRouter()

  const dataInfo = ref<DataSourceInfo | null>(null)
  const getDataInfo = async (id: string) => {
    const res = await getSourceOne({ id })
    if (res.code === 200) {
      dataInfo.value = res.data
    }
  }
  if (route.query.id) {
    getDataInfo(<string>route.query.id)
  }

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
    isHot,
    toPage
  }
}
