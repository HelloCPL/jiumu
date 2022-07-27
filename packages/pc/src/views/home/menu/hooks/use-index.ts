/**
 * @author chen
 * @description 菜单页面逻辑
 * @update 2022-07-25 15:12:44
 */

import { ref, reactive } from 'vue'
import { getMenuByParentCode, deleteMenu } from '@/api/menu'
import { PropsList } from '@/components/FilterButton/type'
import { debounce } from 'lodash-es'
import { Confirm, Message } from '@/utils/interaction'
import { useUserStore } from '@/store'

export const useIndex = () => {
  const btnList: PropsList[] = [
    { name: '新增', key: 'add', type: 'primary' },
    { name: '导出', key: 'export' }
  ]

  const data = ref<DataRole[]>([])

  const getDataList = debounce(async () => {
    const res = await getMenuByParentCode()
    if (res.code === 200) {
      data.value = res.data
    }
  }, 300)
  getDataList()

  return {
    btnList,
    data,
    getDataList
  }
}

// 处理菜单新增 编辑 查看等逻辑
export const useIndexInfo = ({ getDataList }: ObjectAny) => {
  const store = useUserStore()
  const state = reactive({
    showInfo: false,
    show: false,
    id: '',
    parentCode: ''
  })

  // 点击按钮
  const handleBtn = (item: PropsList) => {
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
  const handleShowInfo = (row: DataRole) => {
    state.id = row.id
    state.showInfo = true
  }

  // 点击编辑
  const handleEdit = (row: DataRole) => {
    state.id = row.id
    state.parentCode = ''
    state.show = true
  }

  // 新增子级
  const handleAddChild = (row: DataRole) => {
    state.parentCode = row.code
    state.id = ''
    state.show = true
  }

  // 删除
  const handleDelete = (row: DataRole) => {
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
    if (type === 'update') store.getUser('4')
  }

  return {
    state,
    handleBtn,
    handleShowInfo,
    handleEdit,
    handleAddChild,
    handleDelete,
    handleConfirm
  }
}
