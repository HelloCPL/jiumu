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
      keyword: keyword.value,
      highlight: '1'
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
export const useIndexInfo = () => {
  const state = reactive({
    showInfo: false,
    id: '',
    showUserRole: false,
    showUserTag: false,
    showUserMenu: false,
    showUserPermission: false
  })

  // 点击查看详情
  const handleShowInfo = (row: DataUserInfo) => {
    state.id = row.id
    state.showInfo = true
  }
  // 点击查看角色
  const handleShowUserRole = (row: DataUserInfo) => {
    state.id = row.id
    state.showUserRole = true
  }
  // 点击查看标签
  const handleShowUserTag = (row: DataUserInfo) => {
    state.id = row.id
    state.showUserTag = true
  }
  // 点击查看菜单
  const handleShowUserMenu = (row: DataUserInfo) => {
    state.id = row.id
    state.showUserMenu = true
  }
  // 点击查看权限
  const handleShowUserPermission = (row: DataUserInfo) => {
    state.id = row.id
    state.showUserPermission = true
  }

  return {
    state,
    handleShowInfo,
    handleShowUserRole,
    handleShowUserTag,
    handleShowUserMenu,
    handleShowUserPermission
  }
}
