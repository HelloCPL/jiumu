/**
 * 查看用户-特殊标签关联逻辑处理
 */
import { UserInfoProps } from '../components/type'
import { ref, computed } from 'vue'
import { debounce } from 'lodash-es'
import { getTagByUserId } from '@/api/user-tag'
import { getText } from '@jiumu/utils'

export const useUserTag = (props: UserInfoProps) => {
  // 已关联的特殊标签
  const total = ref<number>(0)
  let pageNo = 1
  const dataList = ref<DataTagInfo[]>([])
  const getDataList = debounce(async () => {
    if (pageNo === 1) dataList.value = []
    const res = await getTagByUserId({
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
