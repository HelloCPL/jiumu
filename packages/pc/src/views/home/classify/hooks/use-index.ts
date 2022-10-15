import { getTagCustomList } from '@/api/classify'

/**
 * 所有自定义标签处理逻辑
 */

import { ref, reactive } from 'vue'
import { debounce } from 'lodash-es'
import { FilterButtonList } from '@/components/FilterButton/type'

export const useIndex = () => {
  const pageNo = ref<number>(1)
  const pageSize = ref<number>(10)
  const total = ref<number>(0)
  const keyword = ref<string>('')
  const data = ref<DataTagCustom[]>([])
  const getDataList = debounce(async (num?: number) => {
    if (num) pageNo.value = num
    const params: ParamsTagCustomList = {
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      keyword: keyword.value,
      highlight: '1'
    }
    const res = await getTagCustomList(params)
    if (res.code === 200) {
      data.value = res.data
      total.value = res.total
    }
  })
  getDataList()

  return {
    pageNo,
    pageSize,
    total,
    keyword,
    data,
    getDataList
  }
}

// 处理导出等逻辑
export const useIndexInfo = ({}: ObjectAny) => {
  const state = reactive({
    showExport: false
  })
  const btnList: FilterButtonList[] = [
    {
      name: '导出',
      key: 'export'
    }
  ]
  // 点击按钮
  const handleBtn = (item: FilterButtonList) => {
    switch (item.key) {
      case 'export':
        return
    }
  }

  return {
    state,
    btnList,
    handleBtn
  }
}
