/**
 * @description mdapi 逻辑处理
 * @author cpl
 * @create 2023-03-29 15:14:24
 */

import { ref } from 'vue'

import { MDAPIOption, data } from './data'
import { getFileText } from '@/utils/download-file'
import { Loading } from '@/utils/interaction'
const { VITE_API_URL } = import.meta.env

export const useIndex = () => {
  const list = ref<MDAPIOption[]>(data)

  const targetIndex = ref(0)
  let lock = false
  let loading: any
  const change = async (index: number) => {
    if (lock) return
    targetIndex.value = index
    const row = list.value[index]
    if (!row.value) {
      lock = true
      loading = Loading()
      row.value = await getFileText(VITE_API_URL + 'pc/mdapi' + row.url, 'utf-8')
      lock = false
      loading.close()
      loading = null
    }
  }
  change(targetIndex.value)

  return {
    list,
    targetIndex,
    change
  }
}
