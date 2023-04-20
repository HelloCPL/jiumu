/**
 * 查看菜单-角色关联逻辑处理
 */
import { MenuInfoProps } from '../components/type'
import { ref } from 'vue'
import { debounce } from 'lodash-es'
import { getRoleByMenuId } from '@/api/role-menu'
import { getDataDiff } from '@jiumu/utils'

export const useMenuRole = (props: MenuInfoProps) => {
  // 已关联的角色
  const total = ref<number>(0)
  let pageNo = 1
  const dataList = ref<DataRole[]>([])
  const getDataList = debounce(async () => {
    if (pageNo === 1) dataList.value = []
    const res = await getRoleByMenuId({
      menuId: props.id,
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

  return {
    total,
    dataList,
    getDataList
  }
}
