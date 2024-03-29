/**
 * 查看用户-角色关联逻辑处理
 */
import { UserInfoProps } from '../components/type'
import { ref, computed } from 'vue'
import { debounce } from 'lodash-es'
import { getRoleByUserId } from '@/api/user-role'
import { getDataDiff, getText } from '@jiumu/utils'

export const useUserRole = (props: UserInfoProps) => {
  // 已关联的角色
  const total = ref<number>(0)
  let pageNo = 1
  const dataList = ref<DataRole[]>([])
  const getDataList = debounce(async () => {
    if (pageNo === 1) dataList.value = []
    const res = await getRoleByUserId({
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
