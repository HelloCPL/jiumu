/**
 * 特殊标签-用户关联逻辑处理
 */
import { TagInfoProps } from '../components/type'
import { ref } from 'vue'
import { debounce } from 'lodash-es'
import { getUserList } from '@/api/user'
import { addUserTag, deleteUserTag, getUserByTagCode } from '@/api/user-tag'
import { _push, _pop, _find, _relevance } from '@/hooks/use-relevance'
import { getDataDiff } from '@jiumu/utils'

export const useTagUser = (props: TagInfoProps) => {
  // 用户列表
  const keyword = ref<string>('')
  const total = ref<number>(0)
  let pageNo = 1
  const dataList = ref<DataUserInfo[]>([])
  const getDataList = debounce(async () => {
    if (pageNo === 1) dataList.value = []
    const res = await getUserList({
      pageNo,
      pageSize: 20,
      keyword: keyword.value,
      simple: '1'
    })
    if (res.code === 200) {
      dataList.value = getDataDiff(dataList.value, res.data)
      _relevance(dataList2, dataList)
      total.value = res.total
      ++pageNo
    }
  }, 300)
  const search = () => {
    pageNo = 1
    getDataList()
  }
  getDataList()

  // 已关联的用户
  const dataList2 = ref<DataUserInfo[]>([])
  const getDataList2 = debounce(async () => {
    const res = await getUserByTagCode({
      tagCode: props.code,
      pageNo: 1,
      pageSize: 10000
    })
    if (res.code === 200) {
      dataList2.value = res.data
      _relevance(dataList2, dataList)
    }
  })
  getDataList2()

  // 关联交互
  const changeCheck = (checked: boolean, info: DataUserInfo) => {
    const flag = _find(dataList2, info.id)
    if (checked && !flag) addRelevance(info)
    if (!checked && flag) deleteRelevance(info)
  }

  // 新增关联
  const addRelevance = async (info: DataUserInfo) => {
    const res = await addUserTag({
      tagCode: props.code,
      userId: info.id
    })
    if (res.code === 200) {
      _push(dataList2, dataList, info)
    }
  }
  // 取消关联
  const deleteRelevance = async (info: DataUserInfo) => {
    const res = await deleteUserTag({
      tagCode: props.code,
      userId: info.id
    })
    if (res.code === 200) {
      _pop(dataList2, dataList, info)
    }
  }

  return {
    keyword,
    total,
    dataList,
    getDataList,
    search,
    dataList2,
    getDataList2,
    changeCheck,
    addRelevance,
    deleteRelevance
  }
}
