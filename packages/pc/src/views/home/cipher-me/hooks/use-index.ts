/**
 * @description 我的口令列表逻辑处理
 * @author cpl
 * @create 2023-03-24 10:17:12
 */
import { deleteCipher, existCipherCodeSelf, getCipherListSelf } from '@/api/cipher'
import { FilterButtonList } from '@/components/FilterButton/type'
import { Confirm, Message } from '@/utils/interaction'
import { decrypt } from '@jiumu/utils'
import { debounce } from 'lodash-es'
import { ref, reactive } from 'vue'
import { useCipherStore } from '@/store'

export const useIndex = () => {
  const keyword = ref<string>('')
  // 标签类型
  const type = ref<string>('')
  // 自定义标签类型
  const classify = ref<string>('')

  const pageNo = ref<number>(1)
  const pageSize = ref<number>(10)
  const total = ref<number>(0)

  // 列表数据
  const data = ref<DataCipherInfo[]>([])
  const getDataList = debounce(async (num?: number) => {
    if (num) pageNo.value = num
    const params: ParamsCipherList = {
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      keyword: keyword.value,
      type: type.value,
      classify: classify.value,
      highlight: '1'
    }
    const res = await getCipherListSelf(params)
    if (res.code === 200) {
      // 解密
      res.data.forEach((item) => {
        if (item.type === '801') {
          item._account = decrypt(item.account, item.keyStr, item.ivStr)
        }
      })
      data.value = res.data
      total.value = res.total
    }
  }, 300)
  getDataList()

  // 重置
  const handleReset = () => {
    keyword.value = ''
    type.value = ''
    classify.value = ''
    getDataList(1)
  }

  const state = reactive({
    show: false, // 是否显示新增
    id: '',
    showCode: false, // 是否显示新增口令
    showCheck: false, // 是否显示查看口令code
    targetCheckType: '', // 记录检测口令code时正在进行的操作 view 查看密码 update 修改口令 delete 删除口令
    targetIndex: -1 // 记录当前点击的索引
  })

  const cipherStore = useCipherStore()
  // 展示账号密码
  const handleShowCipher = (index: number) => {
    state.targetIndex = index
    const row = data.value[index]
    if (row.show === '1') {
      row.show = '0'
    } else {
      const keyStr = row.keyStr
      let ivStr = row.ivStr
      if (row.type === '802') {
        if (!cipherStore.code) {
          state.targetCheckType = 'view'
          state.showCheck = true
          return
        }
        ivStr = cipherStore.code + row.ivStr
        if (!row._account) {
          row._account = decrypt(row.account, row.keyStr, cipherStore.code + row.ivStr)
        }
      }
      if (!row._cipher) {
        row._cipher = decrypt(row.cipher, keyStr, ivStr)
      }
      row.show = '1'
    }
    state.targetCheckType = ''
    state.targetIndex = -1
  }

  const btnList: FilterButtonList[] = [
    { name: '新增', key: 'add', type: 'primary' },
    { name: '口令code', key: 'code' }
  ]

  // 点击按钮
  const handleBtn = (item: FilterButtonList) => {
    switch (item.key) {
      case 'add':
        state.id = ''
        state.show = true
        return
      case 'code':
        state.showCode = true
        return
    }
  }

  // 点击编辑
  const handleEdit = (index: number) => {
    state.targetIndex = index
    const row = data.value[index]
    if (row.type === '802' && !cipherStore.code) {
      state.targetCheckType = 'update'
      state.showCheck = true
      return
    }
    state.id = row.id
    state.show = true
    state.targetCheckType = ''
    state.targetIndex = -1
  }

  // 处理确认回调
  const handleConfirm = () => {
    getDataList()
    state.show = false
  }

  // 删除
  const handleDelete = (index: number) => {
    state.targetIndex = index
    const row = data.value[index]
    if (row.type === '802' && !cipherStore.code) {
      state.targetCheckType = 'delete'
      state.showCheck = true
      return
    }
    state.targetCheckType = ''
    state.targetIndex = -1
    Confirm('确定删除这项数据吗？').then(async () => {
      const res = await deleteCipher(row.id)
      if (res.code === 200) {
        Message({
          message: res.message,
          type: 'success'
        })
        getDataList()
      }
    })
  }

  const handleConfirmCodeCheck = () => {
    state.showCheck = false
    if (state.targetCheckType === 'view' && state.targetIndex !== -1) {
      handleShowCipher(state.targetIndex)
    } else if (state.targetCheckType === 'update' && state.targetIndex !== -1) {
      handleEdit(state.targetIndex)
    } else if (state.targetCheckType === 'delete' && state.targetIndex !== -1) {
      handleDelete(state.targetIndex)
    }
  }

  return {
    keyword,
    type,
    classify,
    pageNo,
    pageSize,
    total,
    data,
    getDataList,
    handleReset,
    handleShowCipher,
    handleConfirmCodeCheck,
    state,
    btnList,
    handleBtn,
    handleEdit,
    handleDelete,
    handleConfirm
  }
}

/*
 * 格式化账号
 * 1. 长度少于3 返回 *****
 * 2. 否则 返回 xx***
 */
export const formatAccount = (val?: string): string => {
  if (val && val.length >= 3) {
    return val.substring(0, 2) + '***'
  }
  return '******'
}

/**
 * 校验口令code是否存在
 */
const isExistCode = ref(false)
export const useCheckCipherCode = () => {
  const initCipherCode = async () => {
    const res = await existCipherCodeSelf()
    if (res.code === 200) {
      isExistCode.value = res.data
    }
  }
  if (!isExistCode.value) {
    initCipherCode()
  }

  const setIsExistCodeTrue = () => {
    isExistCode.value = true
  }

  return {
    isExistCode,
    setIsExistCodeTrue
  }
}
