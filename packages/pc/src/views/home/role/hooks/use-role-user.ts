/**
 * 角色-用户关联逻辑处理
 */
import { RoleInfoProps } from '../components/type'
import { ref, computed } from 'vue'
import { debounce } from 'lodash-es'
import { getUserList } from '@/api/user'
import { addUserRole, deleteUserRole, getUserByRoleId } from '@/api/user-role'
import { pushRelevance, popRelevance, findRevelance, relevanceData } from '@/hooks/use-relevance'
import { getDataDiff, getText } from '@jiumu/utils'
import { useUserStore } from '@/store'

export const useRoleUser = (props: RoleInfoProps) => {
  const userStore = useUserStore()

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
      highlight: '1',
      simple: '1'
    })
    if (res.code === 200) {
      dataList.value = getDataDiff(dataList.value, res.data)
      relevanceData(dataList2, dataList)
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
    const res = await getUserByRoleId({
      roleId: props.id,
      pageNo: 1,
      pageSize: 10000
    })
    if (res.code === 200) {
      dataList2.value = res.data
      relevanceData(dataList2, dataList)
    }
  }, 300)
  getDataList2()

  // 关联交互
  const changeCheck = (checked: boolean, info: DataUserInfo) => {
    const flag = findRevelance(dataList2, info.id)
    if (checked && !flag) addRelevance(info)
    if (!checked && flag) deleteRelevance(info)
  }

  // 新增关联
  const addRelevance = async (info: DataUserInfo) => {
    const res = await addUserRole({
      roleId: props.id,
      userId: info.id
    })
    if (res.code === 200) {
      pushRelevance(dataList2, dataList, info)
      if (userStore.userInfo?.id === info.id) {
        userStore.updateUser('12345')
      }
    }
  }
  // 取消关联
  const deleteRelevance = async (info: DataUserInfo) => {
    const res = await deleteUserRole({
      roleId: props.id,
      userId: info.id
    })
    if (res.code === 200) {
      popRelevance(dataList2, dataList, info)
      if (userStore.userInfo?.id === info.id) {
        userStore.updateUser('12345')
      }
    }
  }

  const _label = computed(() => {
    if (!props.label) return ''
    return '（' + getText(props.label) + '）'
  })

  return {
    _label,
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
