/**
 * 查看用户-权限关联逻辑处理
 */
import { UserInfoProps } from '../components/type'
import { ref } from 'vue'
import { debounce } from 'lodash-es'
import { getPermissionByUserId } from '@/api/role-permission'

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
