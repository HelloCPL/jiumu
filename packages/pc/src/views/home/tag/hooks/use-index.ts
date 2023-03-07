/**
 * @author chen
 * @description 标签页面逻辑
 * @update 2022-07-25 15:12:44
 */

import { ref, reactive } from 'vue'
import { getTagByParentCode, deleteTag } from '@/api/tag'
import { FilterButtonList } from '@/components/FilterButton/type'
import { debounce } from 'lodash-es'
import { Confirm, Message } from '@/utils/interaction'
import { useUserStore } from '@/store'

export const useIndex = () => {
  const data = ref<DataTag[]>([])

  const getDataList = debounce(async () => {
    const res = await getTagByParentCode()
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

// 处理标签新增 编辑 查看等逻辑
export const useIndexInfo = ({ getDataList }: ObjectAny) => {
  const userStore = useUserStore()
  const state = reactive({
    showInfo: false,
    show: false,
    id: '',
    parentCode: '',
    showTagUser: false,
    code: ''
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
      // do something
      return
    }
  }

  // 点击查看详情
  const handleShowInfo = (row: DataTagInfo) => {
    state.id = row.id
    state.showInfo = true
  }

  // 点击编辑
  const handleEdit = (row: DataTagInfo) => {
    state.id = row.id
    state.parentCode = ''
    state.show = true
  }

  // 新增子级
  const handleAddChild = (row: DataTagInfo) => {
    state.parentCode = row.code
    state.id = ''
    state.show = true
  }

  // 删除
  const handleDelete = (row: DataTagInfo) => {
    Confirm('确定删除这项数据吗？').then(async () => {
      const res = await deleteTag(row.id)
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
    if (type === 'update') userStore.updateUser('5')
  }

  // 关联用户
  const handleShowTagUser = (row: DataTagInfo) => {
    state.id = row.id
    state.code = row.code
    state.showTagUser = true
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
    handleShowTagUser
  }
}
