/**
 * 章节列表逻辑处理
 */

import { getNovelOne, getNovelChapterList, deleteNovelChapter } from '@/api/novel'
import { FilterButtonList } from '@/components/FilterButton/type'
import { Confirm, Message } from '@/utils/interaction'
import { debounce } from 'lodash-es'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useIndex = () => {
  const route = useRoute()
  const router = useRouter()
  const id = <string>route.query.id
  const isSelf = ref<boolean>(false)
  const isDraft = ref<boolean>(false)

  const dataInfo = ref<DataNovel | null>(null)
  const getDataInfo = async () => {
    if (!id) return
    const res = await getNovelOne({ id }, true)
    if (res.code === 200) {
      dataInfo.value = res.data
      isSelf.value = res.data.isSelf === '1'
      isDraft.value = res.data.isDraft === '1'
    }
  }

  const pageNo = ref<number>(1)
  const pageSize = ref<number>(10)
  const total = ref<number>(0)

  const data = ref<DataNovelChapter[]>([])
  const getDataList = debounce(async (num?: number) => {
    if (!id) return
    if (num) pageNo.value = num
    const res = await getNovelChapterList({
      novelId: id,
      pageNo: pageNo.value,
      pageSize: pageSize.value
    })
    if (res.code === 200) {
      data.value = res.data
      total.value = res.total
    }
  })

  onMounted(() => {
    getDataInfo()
    getDataList()
  })

  const btnList: FilterButtonList[] = [{ name: '新增', key: 'add', type: 'primary' }]
  // 点击按钮
  const handleBtn = (item: FilterButtonList) => {
    switch (item.key) {
      case 'add':
        router.push({
          name: 'NovelChapterAdd',
          params: { _metaTitle: '章节新增', _refreshOne: '1', novelId: id }
        })
        return
    }
  }

  // 点击编辑
  const handleEdit = (row: DataNovelChapter) => {
    router.push({
      name: 'NovelChapterAdd',
      params: { _metaTitle: '章节编辑', _refreshOne: '1', id: row.id, novelId: id }
    })
  }

  // 删除
  const handleDelete = (row: DataNovelChapter) => {
    Confirm('确定删除这项数据吗？').then(async () => {
      const res = await deleteNovelChapter(row.id)
      if (res.code === 200) {
        Message({
          message: res.message,
          type: 'success'
        })
        getDataList()
      }
    })
  }

  return {
    dataInfo,
    isSelf,
    isDraft,
    pageNo,
    pageSize,
    total,
    data,
    getDataList,
    btnList,
    handleBtn,
    handleEdit,
    handleDelete
  }
}
