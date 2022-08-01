/**
 * 权限管理页面处理
 */

import { ref, reactive } from 'vue'
import { getPermissionList, deletePermission } from '@/api/permission'
import { PropsList } from '@/components/FilterButton/type'
import { debounce } from 'lodash-es'
import { Confirm, Message } from '@/utils/interaction'
import { useUserStore } from '@/store'

export const useIndex = () => {
  const keyword = ref<string>('')
  const btnList: PropsList[] = [
    { name: '新增', key: 'add', type: 'primary' },
    { name: '导出', key: 'export' }
  ]
  const pageNo = ref<number>(1)
  const pageSize = ref<number>(10)
  const total = ref<number>(0)

  const data = ref<DataPermission[]>([])

  const getDataList = debounce(async () => {
    const params: ParamsPermissionList = {
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      keyword: keyword.value,
      highlight: '1'
    }
    const res = await getPermissionList(params)
    if (res.code === 200) {
      data.value = res.data
      total.value = res.total
    }
  }, 300)
  getDataList()

  return {
    keyword,
    btnList,
    pageNo,
    pageSize,
    total,
    data,
    getDataList
  }
}

// 处理权限新增 编辑 查看等逻辑
export const useIndexInfo = ({ getDataList }: ObjectAny) => {
  const store = useUserStore()
  const state = reactive({
    showInfo: false,
    show: false,
    id: '',
    label: '',
    showPermissionUser: false,
    showPermissionRole: false
  })

  // 点击按钮
  const handleBtn = (item: PropsList) => {
    switch (item.key) {
      case 'add':
        state.id = ''
        state.show = true
        return
      case 'export':
    }
  }

  // 点击查看详情
  const handleShowInfo = (row: DataPermission) => {
    state.id = row.id
    state.showInfo = true
  }

  // 点击编辑
  const handleEdit = (row: DataPermission) => {
    state.id = row.id
    state.show = true
  }

  // 删除
  const handleDelete = (row: DataPermission) => {
    Confirm('确定删除这项数据吗？').then(async () => {
      const res = await deletePermission(row.id)
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
    if (type === 'update') store.getUser('3')
  }

  // 查看用户
  const handleShowPermissionUser = (row: DataPermission) => {
    state.id = row.id
    state.label = row.label
    state.showPermissionUser = true
  }

  // 查看角色
  const handleShowPermissionRole = (row: DataPermission) => {
    state.id = row.id
    state.label = row.label
    state.showPermissionRole = true
  }

  return {
    state,
    handleBtn,
    handleShowInfo,
    handleEdit,
    handleDelete,
    handleConfirm,
    handleShowPermissionUser,
    handleShowPermissionRole
  }
}
