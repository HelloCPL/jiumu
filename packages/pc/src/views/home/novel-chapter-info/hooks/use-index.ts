/**
 * @describe: 章节详情逻辑处理
 * @author: cpl
 * @create: 2023-02-04 18:43:12
 */

import { getNovelChapterList, getNovelChapterOne } from '@/api/novel'
import { debounce, isPlainObject } from 'lodash-es'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storage } from '@jiumu/utils'
import { useUserStore } from '@/store'

export const useIndex = () => {
  const route = useRoute()
  const router = useRouter()

  const id = <string>route.query.id
  const novelId = <string>route.query.novelId

  const dataInfo = ref<DataNovelChapter | null>(null)
  const getDataInfo = async () => {
    if (!id) return
    const res = await getNovelChapterOne({ id }, true)
    if (res.code === 200) {
      dataInfo.value = res.data
      handleStorage()
    }
  }

  const data = ref<DataNovelChapter[]>([])
  const getDataList = debounce(async () => {
    if (!novelId) return
    const res = await getNovelChapterList({
      novelId: novelId,
      pageSize: 10000,
      isConcise: '1'
    })
    if (res.code === 200) {
      data.value = res.data
      handleTargetIndex()
    }
  })

  onMounted(() => {
    getDataInfo()
    getDataList()
  })

  // 当前章节
  const targetIndex = ref<number>(0)
  const handleTargetIndex = () => {
    data.value.find((item, index) => {
      if (item.id === id) {
        targetIndex.value = index
        return true
      }
    })
  }

  // 显示另外章节
  const handleToOther = (row: DataNovelChapter) => {
    if (row.id === id) return
    router.push({
      path: '/redirect',
      query: {
        __path: '/novel-chapter-info',
        novelId: novelId,
        id: row.id
      }
    })
  }

  // 上一章或下一章
  const handleNext = (isNext: boolean) => {
    if (isNext) {
      if (targetIndex.value >= data.value.length) return
      handleToOther(data.value[targetIndex.value + 1])
    } else {
      if (targetIndex.value === 0) return
      handleToOther(data.value[targetIndex.value - 1])
    }
  }

  // 处理已阅读
  const chapter = ref<any>({})
  const userStore = useUserStore()
  const handleStorage = async () => {
    const userInfo = (await userStore.getUser('1')) || {}
    let _chapter: any = storage.getItem(novelId, {
      prefix: userInfo.id || ''
    })
    if (!isPlainObject(_chapter)) {
      _chapter = {
        id: id,
        ids: ''
      }
    }
    if (!_chapter.ids || !_chapter.ids.includes(id)) {
      _chapter.id = id
      _chapter.ids = _chapter.ids ? _chapter.ids + ',' + id : id
      storage.setItem(novelId, _chapter, {
        expire: 60 * 60 * 24 * 30,
        prefix: userInfo.id || '',
        encrypt: false
      })
    }
    chapter.value = _chapter
  }

  return {
    dataInfo,
    data,
    handleToOther,
    id,
    targetIndex,
    handleNext,
    chapter
  }
}
