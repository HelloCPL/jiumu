/**
 * @describe: 我的自定义标签
 * @author: cpl
 * @create: 2022-10-13 21:44:19
 */

import { ref, reactive } from 'vue'
import { debounce } from 'lodash-es'
import { getTagCustomListTypeSelf, getTagCustomListSelf } from '@/api/classify'
import { FilterButtonList } from '@/components/FilterButton/type'

export const useIndex = () => {
  const keyword = ref<string>('')
  const type = ref<string>('')
  const typeList = ref<DataTagCustomType[]>([])
  const getTypeList = async () => {
    const res = await getTagCustomListTypeSelf()
    if (res.code === 200) {
      typeList.value = res.data
    }
  }
  getTypeList()

  const pageNo = ref<number>(1)
  const pageSize = ref<number>(10)
  const total = ref<number>(0)

  // 列表数据
  const data = ref<DataTagCustom[]>([])
  const getDataList = debounce(async () => {
    const params: ParamsTagCustomListSelf = {
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      keyword: keyword.value,
      type: type.value,
      highlight: '1'
    }
    const res = await getTagCustomListSelf(params)
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
    getDataList()
  }

  return {
    keyword,
    type,
    typeList,
    pageNo,
    pageSize,
    total,
    data,
    getDataList,
    handleReset
  }
}

// 处理新增 导出 编辑 删除 查看等逻辑
export const useIndexInfo = ({ getDataList }: ObjectAny) => {
  const state = reactive({
    id: '',
    show: false, // 显示新增或编辑
    showInfo: false
  })
  const btnList: FilterButtonList[] = [
    { name: '新增', key: 'add', type: 'primary' },
    { name: '导出', key: 'export' }
  ]

  // 点击按钮
  const handleBtn = (item: FilterButtonList) => {
    switch (item.key) {
      case 'add':
        state.id = ''
        state.show = true
        return
      case 'export':
    }
  }

  // 处理确认回调
  const handleConfirm = () => {
    getDataList()
    state.show = false
  }

  return {
    state,
    btnList,
    handleBtn,
    handleConfirm
  }
}
