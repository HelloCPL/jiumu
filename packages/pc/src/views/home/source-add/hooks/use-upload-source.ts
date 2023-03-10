/**
 * @description 外部文件/图片链接来源处理逻辑
 * @author cpl
 * @create 2023-03-10 17:16:36
 */
import { UploadSourceProps, UploadSourceEmit } from '../components/type'
import { ref, watch } from 'vue'

export const useUploadSource = (props: UploadSourceProps, emit: UploadSourceEmit) => {
  // 数据列表
  const dataList = ref<Array<DataSourceLink | ParamsSourceLinkAdd>>([])

  // 查看目标是否存在
  const _findDataListItem = (id: string): number => {
    let i = -1
    dataList.value.find((item, index) => {
      if (item.id && item.id === id) {
        i = index
        return true
      }
    })
    return i
  }

  // 查找最大排序
  const _findSortMax = (): number => {
    let i = 1
    dataList.value.forEach((item) => {
      i = item.sort >= i ? i + 1 : i
    })
    return i
  }

  // 新增一个
  const handleAddOne = () => {
    dataList.value.push({ id: '', title: '', link: '', sort: _findSortMax() })
  }

  // 删除一个
  const handleDeleteOne = (index: number) => {
    const target = dataList.value[index]
  }

  // 移动
  const handleMove = (index: number, type: 'up' | 'down') => {
    const target = dataList.value[index]
  }

  // 鼠标失焦
  const handleBlur = (index: number, type: 'title' | 'link') => {}

  // 鼠标聚焦
  const handleFocus = (index: number, type: 'title' | 'link') => {}

  // 初始化
  const initModelValue = (data: DataSourceLink[]) => {
    if (!data.length && !dataList.value.length) {
      handleAddOne()
    } else {
      data.forEach((item) => {
        const i = _findDataListItem(item.id)
        if (i === -1) dataList.value.push(item)
        else dataList.value[i] = item
      })
      dataList.value.sort((a, b) => a.sort - b.sort)
    }
  }
  watch(
    () => props.modelValue,
    (val) => {
      initModelValue(val)
    },
    { immediate: true, deep: true }
  )

  return {
    dataList,
    handleAddOne,
    handleDeleteOne,
    handleMove,
    handleBlur,
    handleFocus
  }
}
