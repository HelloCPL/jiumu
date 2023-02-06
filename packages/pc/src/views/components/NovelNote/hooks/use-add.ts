/**
 * 笔记新增或编辑逻辑处理
 */

import { ref, computed } from 'vue'
import { NovelNoteProps, NovelNoteEmit } from '../type'

export const useAdd = (props: NovelNoteProps, emit: NovelNoteEmit) => {
  // 控制显隐
  const isShow = ref(true)
  const beforeClose = () => {
    isShow.value = false
    setTimeout(() => {
      emit('close', 'close')
    }, 500)
  }

  return {
    isShow,
    beforeClose
  }
}
