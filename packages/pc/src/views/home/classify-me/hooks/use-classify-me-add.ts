/**
 * 自定义标签新增或编辑
 */

import { ClassifyMeAddProps, ClassifyMeAddEmits } from '../components/type'
import { reactive, ref } from 'vue'
import { FormInstance, FormRules } from 'element-plus'
import {
  getTagCustomListTypeSelf,
  addTagCustom,
  getTagCustomByIdsSelf,
  updateTagCustom
} from '@/api/classify'
import { debounce } from 'lodash-es'
import { Message } from '@/utils/interaction'

export const useClassifyMeAdd = (props: ClassifyMeAddProps, emit: ClassifyMeAddEmits) => {
  const title = ref<string>('自定义标签新增')
  const formRef = ref<FormInstance>()
  const form = reactive<ParamsTagCustomAdd>({
    label: '',
    sort: 1,
    type: ''
  })

  const rules = reactive<FormRules>({
    label: [{ required: true, trigger: 'change', message: '请输入描述' }]
  })

  // 类型列表
  let typeList: DataTagCustomType[] = []
  const getTypeList = async () => {
    const res = await getTagCustomListTypeSelf()
    if (res.code === 200) {
      typeList = res.data
    }
  }
  getTypeList()
  const fetchSuggestionType = (keyword: string, cb: any) => {
    const results: DataTagCustomType[] = keyword
      ? typeList.filter((item) => item.type.includes(keyword))
      : typeList
    cb(results)
  }

  // 添加
  const _add = debounce(async (params: ParamsTagCustomAdd) => {
    const res = await addTagCustom(params)
    if (res.code === 200) {
      Message({
        message: res.message,
        type: 'success'
      })
      emit('confirm')
    }
  }, 300)

  // 编辑
  const _update = debounce(async (params: ParamsTagCustomAdd) => {
    const res = await updateTagCustom(params)
    if (res.code === 200) {
      Message({
        message: res.message,
        type: 'success'
      })
      emit('confirm')
    }
  }, 300)

  const confirm = () => {
    if (!formRef.value) return
    formRef.value.validate((valid) => {
      if (valid) {
        const params: ParamsTagCustomAdd = {
          label: form.label,
          sort: form.sort,
          type: form.type
        }
        if (props.id) {
          params.id = props.id
          _update(params)
        } else {
          _add(params)
        }
      }
    })
  }

  // 获取详情
  const _getOne = async (id: string) => {
    const res = await getTagCustomByIdsSelf({ ids: id }, true)
    if (res.code === 200 && res.data?.length) {
      const data = res.data[0]
      form.label = data.label
      form.sort = data.sort
      form.type = data.type
    }
  }

  if (props.id) {
    title.value = '自定义标签编辑'
    _getOne(props.id)
  }

  return {
    title,
    formRef,
    form,
    rules,
    fetchSuggestionType,
    confirm
  }
}
