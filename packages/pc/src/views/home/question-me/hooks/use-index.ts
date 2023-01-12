/*
 * 我的问答列表逻辑处理
 */
import { deleteQuestion, getQuestionListSelf } from '@/api/question'
import { debounce } from 'lodash-es'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { FilterButtonList } from '@/components/FilterButton/type'
import { Confirm, Message } from '@/utils/interaction'
import { addTop, deleteTop } from '@/api/do-top'

export const useIndex = () => {
  const keyword = ref<string>('')
  const isSecret = ref<'1' | '0'>()
  const classify = ref<string>('')

  const pageNo = ref<number>(1)
  const pageSize = ref<number>(10)
  const total = ref<number>(0)

  const data = ref<DataQuestion[]>([])
  const getDataList = debounce(async (num?: number) => {
    if (num) pageNo.value = num
    const params: ParamsQuestionListSelf = {
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      keyword: keyword.value,
      classify: classify.value,
      isSecret: isSecret.value,
      highlight: '1',
      isDraft: '0'
    }
    const res = await getQuestionListSelf(params)
    if (res.code === 200) {
      data.value = res.data
      total.value = res.total
    }
  }, 300)
  getDataList()

  // 重置
  const handleReset = () => {
    keyword.value = ''
    classify.value = ''
    isSecret.value = undefined
    getDataList(1)
  }

  return {
    keyword,
    isSecret,
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
          name: 'QuestionAdd',
          params: { _metaTitle: '问答新增', _refreshOne: '1' }
        })
        return
    }
  }

  // 点击编辑
  const handleEdit = (row: DataQuestion) => {
    router.push({
      name: 'QuestionAdd',
      params: { _metaTitle: '问答编辑', _refreshOne: '1', id: row.id }
    })
  }

  // 删除
  const handleDelete = (row: DataQuestion) => {
    Confirm('确定删除这项数据吗？').then(async () => {
      const res = await deleteQuestion(row.id)
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
  const handleTop = (row: DataQuestion) => {
    const message = row.isTop === '1' ? '确定取消置顶该文章吗？' : '确定置顶该文章吗？'
    Confirm(message).then(() => {
      _handleTop(row)
    })
  }

  const _handleTop = debounce(async (row: DataQuestion) => {
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
  const handleShowInfo = (row: DataQuestion) => {
    const routeUrl = router.resolve({
      path: '/question-info',
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
