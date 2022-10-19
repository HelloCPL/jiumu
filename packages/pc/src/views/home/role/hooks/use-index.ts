/**
 * @author chen
 * @description 角色页面逻辑
 * @update 2022-07-25 15:12:44
 */

import { ref, reactive } from 'vue'
import { getRoleList, deleteRole } from '@/api/role'
import { FilterButtonList } from '@/components/FilterButton/type'
import { debounce } from 'lodash-es'
import { Confirm, Message } from '@/utils/interaction'
import { useUserStore } from '@/store'

export const useIndex = () => {
  const keyword = ref<string>('')

  const pageNo = ref<number>(1)
  const pageSize = ref<number>(10)
  const total = ref<number>(0)

  const data = ref<DataRole[]>([])

  const getDataList = debounce(async (num?: number) => {
    if (num) pageNo.value = num
    const params: ParamsRoleList = {
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      keyword: keyword.value,
      highlight: '1'
    }
    const res = await getRoleList(params)
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

// 处理角色新增 编辑 查看等逻辑
export const useIndexInfo = ({ getDataList }: ObjectAny) => {
  const userStore = useUserStore()

  const state = reactive({
    showInfo: false,
    show: false,
    id: '',
    label: '',
    showRoleUser: false,
    showRoleMenu: false,
    showRolePermission: false
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

  // 点击查看详情
  const handleShowInfo = (row: DataRole) => {
    state.id = row.id
    state.showInfo = true
  }

  // 点击编辑
  const handleEdit = (row: DataRole) => {
    state.id = row.id
    state.show = true
  }

  // 删除
  const handleDelete = (row: DataRole) => {
    Confirm('确定删除这项数据吗？').then(async () => {
      const res = await deleteRole(row.id)
      if (res.code === 200) {
        Message({
          message: res.message,
          type: 'success'
        })
        getDataList()
      }
    })
  }

  // 处理确认回调
  const handleConfirm = (type: string) => {
    getDataList()
    state.show = false
    if (type === 'update') userStore.getUser('2')
  }

  // 显示角色-用户关联
  const handleShowRoleInfo = (row: DataRole) => {
    state.id = row.id
    state.label = row.label
    state.showRoleUser = true
  }

  // 显示角色-用户关联
  const handleShowRoleMenu = (row: DataRole) => {
    state.id = row.id
    state.label = row.label
    state.showRoleMenu = true
  }

  // 显示角色-权限关联
  const handleShowRolePermission = (row: DataRole) => {
    state.id = row.id
    state.label = row.label
    state.showRolePermission = true
  }

  return {
    state,
    btnList,
    handleBtn,
    handleShowInfo,
    handleEdit,
    handleDelete,
    handleConfirm,
    handleShowRoleInfo,
    handleShowRoleMenu,
    handleShowRolePermission
  }
}
