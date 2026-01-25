/**
 * 我的连载逻辑处理
 */

import { addTop, deleteTop } from '@/api/do-top'
import { getNovelListSelf, deleteNovel } from '@/api/novel'
import { FilterButtonList } from '@/components/FilterButton/type'
import { Confirm, Message } from '@/utils/interaction'
import { debounce } from 'lodash-es'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useIndex = () => {
  const keyword = ref<string>('')
  const isSecret = ref<DataBaseStatus>()
  // 标签类型
  const type = ref<string>('')
  // 自定义标签类型
  const classify = ref<string>('')

  const pageNo = ref<number>(1)
  const pageSize = ref<number>(10)
  const total = ref<number>(0)

  // 列表数据
  const data = ref<DataNovel[]>([])
  const getDataList = debounce(async (num?: number) => {
    if (num) pageNo.value = num
    const params: ParamsNovelListSelf = {
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      keyword: keyword.value,
      type: type.value,
      classify: classify.value,
      isSecret: isSecret.value,
      highlight: '1',
      isDraft: '0'
    }
    const res = await getNovelListSelf(params)
    if (res.code === 200) {
      data.value = res.data
      total.value = res.total
    }
  }, 300)
  getDataList()

  // 重置
  const handleReset = () => {
    keyword.value = ''
    type.value = ''
    classify.value = ''
    isSecret.value = undefined
    getDataList(1)
  }

  return {
    keyword,
    isSecret,
    type,
    classify,
    pageNo,
    pageSize,
    total,
    data,
    getDataList,
    handleReset
  }
}

// 处理新增 编辑 删除 查看 置顶等逻辑
export const useIndexInfo = ({ getDataList }: ObjectAny) => {
  const router = useRouter()
  const btnList: FilterButtonList[] = [
    { name: '新增', key: 'add', type: 'primary', code: 'pc:novel:me:add:btn' }
  ]
  // 点击按钮
  const handleBtn = (item: FilterButtonList) => {
    switch (item.key) {
      case 'add':
        router.push({
          name: 'NovelAdd',
          params: { _metaTitle: '连载新增', _refreshOne: '1' }
        })
        return
    }
  }

  // 点击编辑
  const handleEdit = (row: DataNovel) => {
    router.push({
      name: 'NovelAdd',
      params: { _metaTitle: '连载编辑', _refreshOne: '1', id: row.id }
    })
  }

  // 删除
  const handleDelete = (row: DataNovel) => {
    Confirm('确定删除这项数据吗？').then(async () => {
      const res = await deleteNovel(row.id)
      if (res.code === 200) {
        Message({
          message: res.message,
          type: 'success'
        })
        getDataList()
      }
    })
  }

  // 置顶或取消置顶
  const handleTop = (row: DataNovel) => {
    const message = row.isTop === '1' ? '确定取消置顶该连载吗？' : '确定置顶该连载吗？'
    Confirm(message).then(() => {
      _handleTop(row)
    })
  }
  const _handleTop = debounce(async (row: DataNovel) => {
    if (row.isTop === '0') {
      const res = await addTop({
        id: row.id,
        type: '504'
      })
      if (res.code === 200) {
        Message({
          message: res.message,
          type: 'success'
        })
        getDataList()
      }
    } else {
      const res = await deleteTop({
        id: row.id,
        type: '504'
      })
      if (res.code === 200) {
        Message({
          message: res.message,
          type: 'success'
        })
        getDataList()
      }
    }
  }, 300)

  // 显示详情
  const handleShowInfo = (row: DataNovel) => {
    const routeUrl = router.resolve({
      path: '/novel-info',
      query: {
        id: row.id
      }
    })
    window.open(routeUrl.href, '_blank')
  }

  // 查看章节列表
  const handleShowNovelChapter = (row: DataNovel) => {
    router.push({
      name: 'NovelChapter',
      query: { id: row.id, _refreshOne: '1' }
    })
  }

  return {
    btnList,
    handleBtn,
    handleEdit,
    handleDelete,
    handleTop,
    handleShowInfo,
    handleShowNovelChapter
  }
}
