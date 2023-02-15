/**
 * 特殊标签-用户关联逻辑处理
 */
import { MenuInfoProps } from '../components/type'
import { ref } from 'vue'
import { debounce } from 'lodash-es'
import { getUserByMenuId } from '@/api/role-menu'
import { getDataDiff } from '@jiumu/utils'

export const useMenuUser = (props: MenuInfoProps) => {
  // 已关联的用户
  const total = ref<number>(0)
  let pageNo = 1
  const dataList = ref<DataUserInfo[]>([])
  const getDataList = debounce(async () => {
    if (pageNo === 1) dataList.value = []
    const res = await getUserByMenuId({
      menuId: props.id,
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

  return {
    total,
    dataList,
    getDataList
  }
}
