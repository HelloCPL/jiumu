/*
 * 连载详情逻辑处理
 */

import { getNovelChapterList, getNovelOne } from '@/api/novel'
import { isPlainObject } from 'lodash-es'
import { useUserStore } from '@/store'
import { storage } from '@jiumu/utils'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useIndex = () => {
  const route = useRoute()
  const router = useRouter()

  const id = <string>route.query.id

  // 连载信息
  const dataInfo = ref<DataNovel | null>(null)
  const getDataInfo = async () => {
    if (!id) return
    const res = await getNovelOne({ id })
    if (res.code === 200) {
      dataInfo.value = res.data
    }
  }
  // 章节列表
  const dataList = ref<DataNovelChapter[]>([])
  const getDataList = async () => {
    if (!id) return
    const res = await getNovelChapterList({
      novelId: id,
      isConcise: '1',
      pageSize: 10000
    })
    if (res.code === 200) {
      dataList.value = res.data
      handleStorage()
    }
  }

  onMounted(() => {
    getDataInfo()
    getDataList()
  })

  // 是否热门
  const isHot = computed(() => {
    return (
      dataInfo.value &&
      dataInfo.value.isDraft === '0' &&
      (dataInfo.value.likeCount > 1000 || dataInfo.value.collectionCount > 100)
    )
  })

  // 跳转到指定章节
  const handleToChapter = (row: DataNovelChapter) => {
    const routeUrl = router.resolve({
      path: '/novel-chapter-info',
      query: {
        novelId: id,
        id: row.id
      }
    })
    window.open(routeUrl.href, '_blank')
  }

  const handleToChapterIndex = (num: number) => {
    handleToChapter(dataList.value[num])
  }

  // 获取已阅读信息
  const userStore = useUserStore()
  const chapter = ref<any>({})
  const targetIndex = ref<number>(-1)
  const handleStorage = async () => {
    const userInfo = (await userStore.getUser('1')) || {}
    chapter.value = storage.getItem(id, {
      prefix: userInfo.id || ''
    })
    if (!isPlainObject(chapter.value)) {
      chapter.value = {
        id: '',
        ids: ''
      }
    }
    // 寻找上次读到的章节
    if (chapter.value.id) {
      dataList.value.find((item, index) => {
        if (item.id === chapter.value.id) {
          targetIndex.value = index
          return true
        }
      })
    }
  }

  return {
    dataInfo,
    dataList,
    isHot,
    handleToChapter,
    handleToChapterIndex,
    chapter,
    targetIndex
    // toPage
  }
}
