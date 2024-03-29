/**
 * @description 外部文件/图片链接来源处理逻辑
 * @author cpl
 * @create 2023-03-10 17:16:36
 */
import { UploadSourceProps, UploadSourceEmit } from '../components/type'
import { ref, watch } from 'vue'
import { addSourceLink, updateSourceLink, deleteSourceLink } from '@/api/source'
import validator from 'validator'

export const useUploadSource = (props: UploadSourceProps, emit: UploadSourceEmit) => {
  // 数据列表
  const dataList = ref<Array<DataSourceLink | ParamsSourceLinkAdd>>([])

  // 查找最大排序
  const _findSortMax = (): number => {
    let i = 1
    dataList.value.forEach((item) => {
      i = item.sort >= i ? i + 1 : i
    })
    return i
  }

  const linkTip = ref('请输入资源地址')
  // 判断资源是否为真 并校验字段
  const judgeSource = (index: number, type?: string): boolean => {
    const target = dataList.value[index]
    const isTitle = !target.title
    const isLink = !target.link || !validator.isURL(target.link)
    if (!target.link) linkTip.value = '请输入资源地址'
    else if (!validator.isURL(target.link)) linkTip.value = '资源地址格式错误'
    if (type === 'title') {
      target.titleError = isTitle
    } else if (type === 'link') {
      target.linkError = isLink
    }
    return !isTitle && !isLink
  }

  // 新增一个
  const handleAddOne = () => {
    dataList.value.push({ id: '', title: '', link: '', sort: _findSortMax() })
  }

  // 删除一个
  const handleDeleteOne = async (index: number) => {
    const target = dataList.value[index]
    if (target.id) {
      const res = await deleteSourceLink(target.id)
      if (res.code === 200) {
        dataList.value.splice(index, 1)
        emit('change', dataList.value)
      }
    } else {
      dataList.value.splice(index, 1)
    }
  }

  // 移动
  const handleMove = (index: number, type: 'up' | 'down') => {
    const target = dataList.value.splice(index, 1)[0]
    let i: number
    if (type === 'up') {
      i = index - 1
      dataList.value.splice(i, 0, target)
    } else {
      i = index + 1
      dataList.value.splice(i, 0, target)
    }
    const item = dataList.value[index]
    const sort = target.sort
    target.sort = item.sort
    item.sort = sort
    handleBlur(index)
    handleBlur(i)
  }

  // 改变
  const updateModelValue = (value: string, index: number, type: 'title' | 'link') => {
    const target = dataList.value[index]
    target[type] = value
    judgeSource(index, type)
    if (type === 'title') {
      target.titleChange = true
    } else {
      target.titleChange = true
    }
  }

  // 鼠标失焦
  const handleBlur = async (index: number, type?: 'title' | 'link') => {
    const target = dataList.value[index]
    const flag = judgeSource(index, type)
    // 有修改提交
    if (flag && (target.titleChange || target.linkChange || !type)) {
      const params: ParamsSourceLinkAdd = {
        title: target.title,
        link: target.link,
        sort: target.sort
      }
      if (target.id) {
        params.id = target.id
        const res = await updateSourceLink(params)
        if (res.code === 200) {
          target.titleChange = false
          target.linkChange = false
          emit('change', dataList.value)
        }
      } else {
        const res = await addSourceLink(params)
        if (res.code === 200) {
          target.id = res.data
          target.titleChange = false
          target.linkChange = false
          emit('change', dataList.value)
        }
      }
    }
  }

  // 初始化
  const initValue = (data: Array<DataSourceLink | ParamsSourceLinkAdd>) => {
    if (!data?.length && !dataList.value?.length) {
      handleAddOne()
    } else {
      dataList.value = data
      dataList.value.sort((a, b) => a.sort - b.sort)
    }
  }
  watch(
    () => props.value,
    (val) => {
      initValue(val)
    },
    { immediate: true, deep: true }
  )

  return {
    linkTip,
    dataList,
    handleAddOne,
    handleDeleteOne,
    handleMove,
    updateModelValue,
    handleBlur
  }
}
