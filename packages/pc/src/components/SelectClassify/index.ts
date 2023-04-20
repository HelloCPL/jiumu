/**
 * @describe: 自定义标签选择处理逻辑
 * @author: cpl
 * @create: 2022-10-16 20:32:00
 */
import { addTagCustom, getTagCustomListSelf } from '@/api/classify'
import { Message } from '@/utils/interaction'
import { InputInstance } from 'element-plus'
import { debounce } from 'lodash-es'
import { nextTick, ref, watch } from 'vue'
import { SelectClassifyEmits, SelectClassifyProps } from './type'

export const useIndex = (props: SelectClassifyProps, emit: SelectClassifyEmits) => {
  const classifyList = ref<DataTagCustom[]>([])
  const getClassifyList = async (label?: string) => {
    const res = await getTagCustomListSelf({
      type: props.type,
      pageSize: 100
    })
    if (res.code === 200) {
      classifyList.value = res.data
      handleRelevance(label ? 1000 : 0)
      if (label) {
        classifyList.value.find((item) => {
          if (item.label === label) {
            handleClick(item)
            return true
          }
        })
      }
    }
  }
  let timeId: any = null
  const clearTimeId = () => {
    if (timeId) {
      clearTimeout(timeId)
      timeId = null
    }
  }
  // 对数据进行关联
  const handleRelevance = (time: number = 0) => {
    classifyList.value.forEach((item) => {
      if (props.modelValue.includes(item.id)) item.checked = true
      else item.checked = false
    })
    if (classifyList.value.length > 1) {
      clearTimeId()
      timeId = setTimeout(() => {
        classifyList.value.sort((a, b) => b.checked - a.checked)
      }, time)
    }
  }
  getClassifyList()
  watch(
    () => props.modelValue,
    () => {
      handleRelevance(1000)
    }
  )

  const handleClick = (item: DataTagCustom) => {
    item.checked = !item.checked
    const ids = classifyList.value.filter((item) => item.checked).map((item) => item.id)
    if (item.checked && ids.length > props.maxLength) {
      item.checked = false
      Message({
        message: `最多可选择${props.maxLength}个标签`,
        type: 'warning'
      })
      return
    }
    const classify = ids.join(',')
    emit('update:modelValue', classify)
    emit('change', classify, classifyList.value)
  }

  // 新增标签
  const inputValue = ref<string>('')
  const inputRef = ref<InputInstance>()
  const showInput = ref<boolean>(false)
  const handleShowInput = () => {
    showInput.value = true
    nextTick(() => {
      inputRef.value?.input?.focus()
    })
  }

  // 新增一个标签
  const getClassifyOne = debounce(async (label: string) => {
    const res = await addTagCustom({
      label,
      type: props.type
    })
    if (res.code === 200) {
      getClassifyList(label)
    }
  }, 300)
  const handleInputConfirm = () => {
    showInput.value = false
    if (inputValue.value) {
      getClassifyOne(inputValue.value)
      inputValue.value = ''
    }
  }

  return {
    classifyList,
    handleClick,
    showInput,
    handleShowInput,
    inputValue,
    inputRef,
    handleInputConfirm
  }
}
