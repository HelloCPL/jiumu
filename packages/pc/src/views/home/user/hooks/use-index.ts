/**
 * @author chen
 * @description 用户页面逻辑
 * @update 2022-07-25 15:12:44
 */

import { ref, reactive } from 'vue'
import { getUserList } from '@/api/user'
import { debounce } from 'lodash-es'

export const useIndex = () => {
  const keyword = ref<string>('')
  const pageNo = ref<number>(1)
  const pageSize = ref<number>(10)
  const total = ref<number>(0)

  const data = ref<DataUserInfo[]>([])

  const getDataList = debounce(async () => {
    const params: ParamsUserList = {
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      keyword: keyword.value
    }
    const res = await getUserList(params)
    if (res.code === 200) {
      data.value = res.data
      total.value = res.total
    }
  }, 300)
  getDataList()

  return {
    keyword,
    pageNo,
    pageSize,
    total,
    data,
    getDataList
  }
}

// 处理用户查看等逻辑
export const useIndexInfo = ({ getDataList }: ObjectAny) => {
  const state = reactive({
    showInfo: false,
    id: ''
  })

  // 点击查看详情
  const handleShowInfo = (row: DataRole) => {
    state.id = row.id
    state.showInfo = true
  }

  return {
    state,
    handleShowInfo
  }
}
