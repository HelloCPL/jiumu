/**
 * @author chen
 * @description 菜单页面逻辑
 * @update 2022-07-25 15:12:44
 */

import { ref, reactive } from 'vue'
import { getMenuByParentCode, deleteMenu } from '@/api/menu'
import { FilterButtonList } from '@/components/FilterButton/type'
import { debounce } from 'lodash-es'
import { Confirm, Message } from '@/utils/interaction'
import { useUserStore } from '@/store'

export const useIndex = () => {
  const data = ref<DataMenu[]>([])

  const getDataList = debounce(async () => {
    const res = await getMenuByParentCode()
    if (res.code === 200) {
      data.value = res.data
    }
  }, 300)
  getDataList()

  return {
    data,
    getDataList
  }
}

// 处理菜单新增 编辑 查看等逻辑
export const useIndexInfo = ({ getDataList }: ObjectAny) => {
  const userStore = useUserStore()
  const state = reactive({
    showInfo: false,
    show: false,
    id: '',
    label: '',
    parentCode: '',
    showMenuUser: false,
    showMenuRole: false
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
      state.parentCode = ''
      state.show = true
      return
    case 'export':
    }
  }

  // 点击查看详情
  const handleShowInfo = (row: DataMenuInfo) => {
    state.id = row.id
    state.showInfo = true
  }

  // 点击编辑
  const handleEdit = (row: DataMenuInfo) => {
    state.id = row.id
    state.parentCode = ''
    state.show = true
  }

  // 新增子级
  const handleAddChild = (row: DataMenuInfo) => {
    state.parentCode = row.code
    state.id = ''
    state.show = true
  }

  // 删除
  const handleDelete = (row: DataMenuInfo) => {
    Confirm('确定删除这项数据吗？').then(async () => {
      const res = await deleteMenu(row.id)
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
    if (type === 'update') userStore.updateUser('4')
  }

  // 查看用户
  const handleShowMenuUser = (row: DataMenuInfo) => {
    state.id = row.id
    state.label = row.label
    state.showMenuUser = true
  }

  // 查看角色
  const handleShowMenuRole = (row: DataMenuInfo) => {
    state.id = row.id
    state.label = row.label
    state.showMenuRole = true
  }

  return {
    state,
    btnList,
    handleBtn,
    handleShowInfo,
    handleEdit,
    handleAddChild,
    handleDelete,
    handleConfirm,
    handleShowMenuUser,
    handleShowMenuRole
  }
}
