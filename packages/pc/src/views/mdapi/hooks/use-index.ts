/**
 * @description mdapi 逻辑处理
 * @author cpl
 * @create 2023-03-29 15:14:24
 */

import { ref } from 'vue'

import { MDAPIOption, data } from './data'
import { getFileText } from '@/utils/download-file'
const { VITE_API_URL } = import.meta.env

export const useIndex = () => {
  const list = ref<MDAPIOption[]>(data)

  const targetIndex = ref(0)
  const change = async (index: number) => {
    targetIndex.value = index
    const row = list.value[index]
    if (!row.value) {
      row.value = await getFileText(VITE_API_URL + 'pc/mdapi' + row.url, 'utf-8')
    }
  }
  change(targetIndex.value)

  return {
    list,
    targetIndex,
    change
  }
}
