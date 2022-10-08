/**
 * 处理弹窗选择用户逻辑
 */
import { ref, onMounted } from 'vue'
import { getUserList } from '@/api/user'
import { debounce, isArray } from 'lodash-es'
import { SelectUserBoxProps, SelectUserBoxEmits } from '../type'

export const useSelectUserBox = (props: SelectUserBoxProps, emit: SelectUserBoxEmits) => {
  // 获取用户信息
  let pageNo = 1
  const total = ref<number>(0)
  const keyword = ref<string>('')
  const dataList = ref<DataUserInfo[]>([])
  const getDataList = debounce(async () => {
    if (pageNo === 1) dataList.value = []
    const res = await getUserList({
      pageNo,
      keyword: keyword.value,
      simple: '1'
    })
    if (res.code === 200) {
      dataList.value = dataList.value.concat(res.data)
      _setDataListChecked()
      total.value = res.total
      pageNo += 1
    }
  }, 200)
  onMounted(getDataList)

  const search = () => {
    pageNo = 1
    getDataList()
  }

  const changeCheck = (checked: boolean, info: DataUserInfo) => {
    if (checked) {
      _push(info)
    } else {
      _pop(info)
    }
    _setDataListChecked()
  }

  const changeRadio = (info: DataUserInfo) => {
    if (_data.value.length && _data.value[0].id === info.id) {
      _data.value = [{ ...info }]
    } else {
      _data.value = [{ ...info }]
      _setDataListChecked()
    }
  }

  // 删除
  const handleDelete = (info: DataUserInfo) => {
    _pop(info)
    _setDataListChecked()
  }

  // 删除全部
  const handleDeleteAll = () => {
    _data.value = []
    _setDataListChecked()
  }

  // 确认
  const confirm = () => {
    emit('change', _data.value)
  }

  // 处理初始化数据
  const _data = ref<DataUserInfo[]>([])
  if (isArray(props.data)) {
    props.data.forEach((item: DataUserInfo) => {
      _data.value.push({ ...item })
    })
  }
  // 入栈
  const _push = (info: DataUserInfo) => {
    const flag = _data.value.find((item) => item.id === info.id)
    if (!flag) _data.value.push({ ...info })
  }
  // 出栈
  const _pop = (info: DataUserInfo) => {
    let i = -1
    _data.value.find((item, index) => {
      if (item.id === info.id) {
        i = index
        return true
      }
    })
    if (i !== -1) _data.value.splice(i, 1)
  }
  // 查找_data是否存在id
  const _find = (id: string): boolean => {
    let flag = false
    _data.value.find((item: DataUserInfo) => {
      if (item.id === id) {
        flag = true
        return flag
      }
    })
    return flag
  }
  // 设置选中状态值
  const _setDataListChecked = () => {
    dataList.value.forEach((item) => {
      item._checked = _find(item.id)
    })
  }

  return {
    keyword,
    total,
    dataList,
    _data,
    getDataList,
    search,
    changeCheck,
    changeRadio,
    handleDelete,
    handleDeleteAll,
    confirm
  }
}
