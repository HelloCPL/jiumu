/**
 * @describe: 我的文章管理处理逻辑
 * @author: cpl
 * @create: 2022-10-15 01:01:58
 */

import { getArticleListSelf } from '@/api/article'
import { FilterButtonList } from '@/components/FilterButton/type'
import { debounce } from 'lodash-es'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

export const useIndex = () => {
  const keyword = ref<string>('')
  const isSecret = ref<'1' | '0'>()
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
    getDataList()
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

// 处理新增 编辑 删除 查看等逻辑
export const useIndexInfo = ({ getDataList }: ObjectAny) => {
  const router = useRouter()
  const btnList: FilterButtonList[] = [{ name: '新增', key: 'add', type: 'primary' }]
  // 点击按钮
  const handleBtn = (item: FilterButtonList) => {
    switch (item.key) {
      case 'add':
        router.push({
          name: 'ArticleAdd',
          params: { _metaTitle: '文章新增', _refreshOne: '1' }
        })
        return
    }
  }
  // 处理确认回调
  const handleConfirm = () => {
    getDataList()
  }

  // 点击编辑
  const handleEdit = (row: DataArticle) => {
    router.push({
      name: 'ArticleAdd',
      params: { _metaTitle: '文章编辑', _refreshOne: '1', id: row.id }
    })
  }

  // 删除
  const handleDelete = (row: DataArticle) => {
    // Confirm('确定删除这项数据吗？').then(async () => {
    //   const res = await deleteTagCustom(row.id)
    //   if (res.code === 200) {
    //     Message({
    //       message: res.message,
    //       type: 'success'
    //     })
    //     getDataList()
    //     getTypeList()
    //   }
    // })
  }

  // 显示详情
  const handleShowInfo = (row: DataArticle) => {}

  return {
    btnList,
    handleBtn,
    handleConfirm,
    handleEdit,
    handleDelete,
    handleShowInfo
  }
}
