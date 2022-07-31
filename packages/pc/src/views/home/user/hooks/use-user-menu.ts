/**
 * 查看用户-菜单关联逻辑处理
 */
import { UserInfoProps } from '../components/type'
import { ref } from 'vue'
import { debounce } from 'lodash-es'
import { getMenuByUserId } from '@/api/role-menu'

export const useUserMenu = (props: UserInfoProps) => {
  // 已关联的菜单
  const dataList = ref<DataMenu[]>([])
  const getDataList = debounce(async () => {
    const res = await getMenuByUserId({
      userId: props.id,
      isTree: '1'
    })
    if (res.code === 200) {
      dataList.value = <DataMenu[]>res.data
    }
  })
  getDataList()

  return {
    dataList,
    getDataList
  }
}
