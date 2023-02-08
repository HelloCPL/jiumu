/**
 * 笔记新增或编辑逻辑处理
 */

import { FormInstance } from 'element-plus'
import { ref, reactive } from 'vue'
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

  // 表单
  const formRef = ref<FormInstance>()
  // const form = reactive<ParamsNovelNoteAdd>({
  //   id: '',
  //   title: '',
  //   content: '',
  //   classify: '',
  //   isSecret: '0',
  //   sort: 1,
  //   remarks: ''
  // })

  return {
    isShow,
    beforeClose
  }
}
