/**
 * 查看用户-权限关联逻辑处理
 */
import { UserInfoProps } from '../components/type'
import { ref, computed } from 'vue'
import { debounce } from 'lodash-es'
import { getPermissionByUserId } from '@/api/role-permission'
import { getDataDiff, getText } from '@jiumu/utils'

export const useUserPermission = (props: UserInfoProps) => {
  // 已关联的权限
  const total = ref<number>(0)
  let pageNo = 1
  const dataList = ref<DataPermission[]>([])
  const getDataList = debounce(async () => {
    if (pageNo === 1) dataList.value = []
    const res = await getPermissionByUserId({
      userId: props.id,
      pageNo,
      pageSize: 20
    })
    if (res.code === 200) {
      dataList.value = getDataDiff(dataList.value, res.data)
      total.value = res.total
      ++pageNo
    }
  }, 300)
  getDataList()

  const _username = computed(() => {
    if (!props.username) return ''
    return '（' + getText(props.username) + '）'
  })

  return {
    _username,
    total,
    dataList,
    getDataList
  }
}
