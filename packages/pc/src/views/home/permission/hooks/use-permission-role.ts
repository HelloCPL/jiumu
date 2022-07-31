/**
 * 查看权限-角色关联逻辑处理
 */
import { PermissionInfoProps } from '../components/type'
import { ref } from 'vue'
import { debounce } from 'lodash-es'
import { getRoleByPermissionId } from '@/api/role-permission'

export const usePermissionRole = (props: PermissionInfoProps) => {
  // 已关联的角色
  const total = ref<number>(0)
  let pageNo = 1
  const dataList = ref<DataRole[]>([])
  const getDataList = debounce(async () => {
    if (pageNo === 1) dataList.value = []
    const res = await getRoleByPermissionId({
      permissionId: props.id,
      pageNo,
      pageSize: 20
    })
    if (res.code === 200) {
      dataList.value = dataList.value.concat(res.data)
      total.value = res.total
      ++pageNo
    }
  })
  getDataList()

  return {
    total,
    dataList,
    getDataList
  }
}
