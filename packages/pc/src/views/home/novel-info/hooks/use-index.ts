/*
 * 连载详情逻辑处理
 */

import { getNovelChapterList, getNovelOne } from '@/api/novel'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useIndex = () => {
  const route = useRoute()
  const router = useRouter()

  // 连载信息
  const dataInfo = ref<DataNovel | null>(null)
  const getDataInfo = async (id: string) => {
    const res = await getNovelOne({ id })
    if (res.code === 200) {
      dataInfo.value = res.data
    }
  }
  // 章节列表
  const dataList = ref<DataNovelChapter[]>([])
  const getDataList = async (id: string) => {
    const res = await getNovelChapterList({
      novelId: id,
      isConcise: '1'
    })
    if (res.code === 200) {
      dataList.value = res.data
    }
  }

  onMounted(() => {
    const id = <string>route.query.id
    if (id) {
      getDataInfo(id)
      getDataList(id)
    }
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
  // const toPage = (id: string) => {
  //   const routeUrl = router.resolve({
  //     path: '/user-info',
  //     query: {
  //       id
  //     }
  //   })
  //   window.open(routeUrl.href, '_blank')
  // }

  return {
    dataInfo,
    dataList,
    isHot
    // toPage
  }
}
