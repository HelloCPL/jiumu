/**
 * 角色-权限关联逻辑处理
 */
import { RoleInfoProps } from '../components/type'
import { ref, computed } from 'vue'
import { debounce } from 'lodash-es'
import { getPermissionList } from '@/api/permission'
import { addRolePermission, deleteRolePermission, getPermissionByRoleId } from '@/api/role-permission'
import { getText } from '@jiumu/utils'

export const useRolePermission = (props: RoleInfoProps) => {
  // 权限列表
  const keyword = ref<string>('')
  const total = ref<number>(0)
  let pageNo = 1
  const dataList = ref<DataPermission[]>([])
  const getDataList = debounce(async () => {
    if (pageNo === 1) dataList.value = []
    const res = await getPermissionList({
      pageNo,
      pageSize: 20,
      keyword: keyword.value,
      roleId: props.id
    })
    if (res.code === 200) {
      dataList.value = dataList.value.concat(res.data)
      _setChecked()
      total.value = res.total
      ++pageNo
    }
  }, 300)
  const search = () => {
    pageNo = 1
    getDataList()
  }

  // 所有权限的关联交互
  const changeCheck = (checked: boolean, info: DataPermission) => {
    let flag = false
    dataList.value.find((item) => {
      if (item.id === info.id) {
        flag = item._checked
      }
    })
    if (checked && !flag) {
      _addRelevance(info)
    } else if (!checked && flag) {
      _deleteRelevance(info)
    }
  }

  // 新增关联
  const _addRelevance = async (info: DataPermission) => {
    const res = await addRolePermission({
      roleId: props.id,
      permissionId: info.id
    })
    if (res.code === 200) {
      info.checkedRoleId = '1'
      info._checked = true
    }
  }

  // 取消关联
  const _deleteRelevance = async (info: DataPermission) => {
    const res = await deleteRolePermission({
      roleId: props.id,
      permissionId: info.id
    })
    if (res.code === 200) {
      info.checkedRoleId = '0'
      info._checked = false
    }
  }

  // 设置关联
  const _setChecked = () => {
    dataList.value.forEach((item) => {
      item._checked = item.checkedRoleId === '1'
    })
  }

  // 已关联的权限
  const total2 = ref<number>(0)
  let pageNo2 = 1
  const dataList2 = ref<DataPermission[]>([])
  const getDataList2 = debounce(async () => {
    if (pageNo2 === 1) dataList2.value = []
    const res = await getPermissionByRoleId({
      roleId: props.id,
      pageNo: pageNo2,
      pageSize: 20
    })
    if (res.code === 200) {
      dataList2.value = dataList2.value.concat(res.data)
      total2.value = res.total
      ++pageNo2
    }
  })
  // 已关联的权限的交互
  const handleDelete = async (info: DataPermission, index: number) => {
    const flag = dataList2.value.find((item) => item.id === info.id)
    if (flag) {
      const res = await deleteRolePermission({
        roleId: props.id,
        permissionId: info.id
      })
      if (res.code === 200) {
        dataList2.value.splice(index, 1)
      }
    }
  }

  const active = ref<number>(0)
  const handleActive = (num: number) => {
    if (active.value === num) return
    active.value = num
    if (num === 1) {
      pageNo = 1
      total.value = 0
      getDataList()
    } else {
      pageNo2 = 1
      total2.value = 0
      getDataList2()
    }
  }
  getDataList2()

  const _label = computed(() => {
    if (!props.label) return ''
    return '（' + getText(props.label) + '）'
  })

  return {
    _label,
    active,
    handleActive,
    keyword,
    total,
    dataList,
    getDataList,
    search,
    changeCheck,
    total2,
    dataList2,
    getDataList2,
    handleDelete
  }
}
