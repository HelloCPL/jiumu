/**
 * @describe: 编辑器处理逻辑
 * @author: cpl
 * @create: 2022-10-16 12:26:57
 */

import { EditorProps, EditorEmits } from './type'
import { ref, watch } from 'vue'

export const useIndex = (props: EditorProps, emit: EditorEmits) => {
  const updateModelValue = (val: string) => {
    emit('update:modelValue', val)
  }
  const change = (val: string) => {
    emit('change', val)
  }
  const blur = (val: string) => {
    emit('blur', val)
  }
  const focus = (val: string) => {
    emit('focus', val)
  }

  const save = (val: string) => {
    emit('save', val)
  }

  const _type = ref('')
  watch(
    () => props.type,
    (val) => {
      _type.value = val
    },
    { immediate: true }
  )
  const handleChangeType = (val: string) => {
    emit('update:type', val)
    emit('changeType', val)
  }

  return {
    updateModelValue,
    change,
    blur,
    focus,
    save,
    _type,
    handleChangeType
  }
}

// form表单校验content值
export const validateContent = (rule: any, value: any, cb: any) => {
  if (value === '<p><br></p>') {
    cb('请输入内容')
  } else cb()
}
