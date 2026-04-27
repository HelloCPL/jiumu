/**
 * @describe: 自定义标签选择处理逻辑
 * @author: cpl
 * @create: 2022-10-16 20:32:00
 */
import { addTagCustom, getTagCustomListSelf } from '../../api/classify'
import { InputInstance } from 'element-plus'
import { debounce } from 'lodash-es'
import { computed, nextTick, ref, watch } from 'vue'
import { SelectClassifyEmits, SelectClassifyProps } from './type'

export const useIndex = (props: SelectClassifyProps, emit: SelectClassifyEmits) => {
  const computedAddTagCustomApi = computed(() => props.addTagCustomApi || addTagCustom)
  const computedGetTagCustomListSelfApi = computed(
    () => props.getTagCustomListSelfApi || getTagCustomListSelf
  )

  const classifyList = ref<DataTagCustom[]>([])
  const getClassifyList = async (label?: string) => {
    const res = await computedGetTagCustomListSelfApi.value({
      type: props.type,
      pageSize: 100
    })
    if (res.code === 200) {
      classifyList.value = res.data
      handleRelevance()
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

  // 对数据进行关联
  const handleRelevance = () => {
    classifyList.value.forEach((item) => {
      if (props.modelValue.includes(item.id)) item.checked = true
      else item.checked = false
    })
  }
  getClassifyList()
  watch(
    () => props.modelValue,
    () => {
      handleRelevance()
    }
  )

  const handleClick = (item: DataTagCustom) => {
    if (props.disabled) return
    const ids = classifyList.value.filter((row) => row.checked && row.id !== item.id).map((row) => row.id)
    if (!item.checked) {
      ids.push(item.id)
    }
    if (ids.length > props.maxLength) {
      ids.shift()
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
    const res = await computedAddTagCustomApi.value({
      label,
      type: props.type,
      sort: getClassifySort()
    })
    if (res.code === 200) {
      getClassifyList(label)
    }
  }, 300)

  // 获取一个排序
  const sortList = {
    articleClassify: 1000,
    questionClassify: 2000,
    sourceClassify: 3000,
    novelClassify: 4000
  }
  const getClassifySort = (): number => {
    let sort = sortList[props.type] || props.sort
    const len = classifyList.value.length
    if (len) {
      let maxSort = 1
      for (let i = 0; i < len; i++) {
        if (classifyList.value[i].sort > maxSort) maxSort = classifyList.value[i].sort
      }
      if (maxSort >= sort) sort = maxSort + 1
    }
    return sort
  }

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
