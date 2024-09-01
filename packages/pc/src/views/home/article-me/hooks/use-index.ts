/**
 * @describe: 我的文章管理处理逻辑
 * @author: cpl
 * @create: 2022-10-15 01:01:58
 */

import { deleteArticle, getArticleListSelf } from '@/api/article'
import { addTop, deleteTop } from '@/api/do-top'
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
  const data = ref<DataArticle[]>([])
  const getDataList = debounce(async (num?: number) => {
    if (num) pageNo.value = num
    const params: ParamsArticleListSelf = {
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      keyword: keyword.value,
      type: type.value,
      classify: classify.value,
      isSecret: isSecret.value,
      highlight: '1',
      isDraft: '0'
    }
    const res = await getArticleListSelf(params)
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
  const btnList: FilterButtonList[] = [{ name: '新增', key: 'add', type: 'primary' }]
  // 点击按钮
  const handleBtn = (item: FilterButtonList) => {
    switch (item.key) {
    case 'add':
      router.push({
        name: 'ArticleAdd',
        params: { _metaTitle: '文章新增' }
      })
      return
    }
  }

  // 点击编辑
  const handleEdit = (row: DataArticle) => {
    router.push({
      name: 'ArticleAdd',
      params: { _metaTitle: '文章编辑', id: row.id }
    })
  }

  // 删除
  const handleDelete = (row: DataArticle) => {
    Confirm('确定删除这项数据吗？').then(async () => {
      const res = await deleteArticle(row.id)
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
  const handleTop = (row: DataArticle) => {
    const message = row.isTop === '1' ? '确定取消置顶该文章吗？' : '确定置顶该文章吗？'
    Confirm(message).then(() => {
      _handleTop(row)
    })
  }
  const _handleTop = debounce(async (row: DataArticle) => {
    if (row.isTop === '0') {
      const res = await addTop({
        id: row.id,
        type: '505'
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
        type: '505'
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
  const handleShowInfo = (row: DataArticle) => {
    const routeUrl = router.resolve({
      path: '/article-info',
      query: {
        id: row.id
      }
    })
    window.open(routeUrl.href, '_blank')
  }

  return {
    btnList,
    handleBtn,
    handleEdit,
    handleDelete,
    handleTop,
    handleShowInfo
  }
}
