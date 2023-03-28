/**
 * @description 我的口令列表逻辑处理
 * @author cpl
 * @create 2023-03-24 10:17:12
 */
import { deleteCipher, getCipherListSelf } from '@/api/cipher'
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
        if (item.type !== '802') {
          item.account = decrypt(item.account)
        }
      })
      data.value = res.data
      console.log(88, res.data)
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

  const cipherStore = useCipherStore()
  const showCheck = ref(false)
  let targetIndex: number = -1
  // 展示账号
  const handleShowCipher = (row: DataCipherInfo, index: number) => {
    targetIndex = index
    if (row.type === '802' && !cipherStore.code) {
      showCheck.value = true
      return
    } else {
      showCipher()
    }
  }

  const handleCloseCodeCheck = (params: any) => {
    showCheck.value = false
    if (params.key === 'refresh') {
      showCipher()
    }
  }

  const showCipher = () => {
    if (targetIndex !== -1) {
      const row = data.value[targetIndex]
      if (row.show === '1') {
        row.show = '0'
      } else {
        if (row._show !== '1') {
          row._show = '1'
          if (row.type === '802') {
            row.account = decrypt(decrypt(row.account, row.keyStr, row.ivStr))
            row.cipher = decrypt(decrypt(row.cipher, row.keyStr, row.ivStr))
          } else {
            row.cipher = decrypt(row.cipher)
          }
        }
        row.show = '1'
      }
    }
  }

  const formatAccount = (val: string): string => {
    if (val.length < 3) {
      return '******'
    } else if (val.length < 5) {
      return val.substring(0, 1) + '***' + val.substring(val.length - 2, 1)
    } else {
      return val.substring(0, 2) + '***' + val.substring(val.length - 3, 2)
    }
  }

  console.log(formatAccount('12'))
  console.log(formatAccount('123'))
  console.log(formatAccount('1234'))
  console.log(formatAccount('12345'))
  console.log(formatAccount('123456'))

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
    showCheck,
    handleShowCipher,
    handleCloseCodeCheck
  }
}

// 处理新增 编辑 删除 口令code新增或编辑 等逻辑
export const useIndexInfo = ({ getDataList }: ObjectAny) => {
  const btnList: FilterButtonList[] = [
    { name: '新增', key: 'add', type: 'primary' },
    { name: '口令code', key: 'code' }
  ]

  const state = reactive({
    show: false,
    id: '',
    showCode: false
  })

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
  const handleEdit = (row: DataCipherInfo) => {
    state.id = row.id
    state.show = true
  }

  // 删除
  const handleDelete = (row: DataCipherInfo) => {
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

  // 处理确认回调
  const handleConfirm = () => {
    console.log(99)
    getDataList()
    state.show = false
  }

  return {
    state,
    btnList,
    handleBtn,
    handleEdit,
    handleDelete,
    handleConfirm
  }
}
