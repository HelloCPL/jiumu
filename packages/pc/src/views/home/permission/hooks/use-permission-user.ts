/**
 * 权限-用户关联逻辑处理
 */
import { PermissionInfoProps } from '../components/type'
import { ref, computed } from 'vue'
import { debounce } from 'lodash-es'
import { getUserByPermissionId } from '@/api/role-permission'
import { getDataDiff, getText } from '@jiumu/utils'

export const usePermissionUser = (props: PermissionInfoProps) => {
  // 已关联的用户
  const total = ref<number>(0)
  let pageNo = 1
  const dataList = ref<DataUserInfo[]>([])
  const getDataList = debounce(async () => {
    if (pageNo === 1) dataList.value = []
    const res = await getUserByPermissionId({
      permissionId: props.id,
      pageNo,
      pageSize: 20
    })
    if (res.code === 200) {
      dataList.value = getDataDiff(dataList.value, res.data)
      total.value = res.total
      ++pageNo
    }
  })
  getDataList()

  const _label = computed(() => {
    if (!props.label) return ''
    return '（' + getText(props.label) + '）'
  })

  return {
    _label,
    total,
    dataList,
    getDataList
  }
}
