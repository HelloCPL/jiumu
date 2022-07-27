/**
 * @author chen
 * @description 标签新增或编辑处理方法
 * @update 2022-07-25 16:54:50
 */

import { addTag, getTagOne, updateTag } from '@/api/tag'
import { Message } from '@/utils/interaction'
import { FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { debounce } from 'lodash-es'

export const useTagAdd = (props: any, emit: any) => {
  const title = ref<string>('标签新增')

  const formRef = ref<FormInstance>()
  const form = reactive<ParamsTagAdd>({
    code: '',
    label: '',
    parentCode: '',
    sort: 1,
    remarks: ''
  })

  const rules = reactive<FormRules>({
    code: [{ required: true, trigger: 'change', message: '请输入code' }],
    label: [{ required: true, trigger: 'change', message: '请输入描述' }]
  })

  // 获取标签
  const _getOne = async (id: string) => {
    const res = await getTagOne(id, true)
    if (res.code === 200) {
      form.code = res.data.code
      form.label = res.data.label
      form.parentCode = res.data.parentCode
      form.sort = res.data.sort
      form.remarks = res.data.remarks
    }
  }

  // 添加标签
  const _add = debounce(async (params: ParamsMenuAdd) => {
    const res = await addTag(params)
    if (res.code === 200) {
      Message({
        message: res.message,
        type: 'success'
      })
      emit('confirm', 'add')
    }
  }, 300)

  // 修改标签
  const _update = debounce(async (params: ParamsMenuAdd) => {
    const res = await updateTag(params)
    if (res.code === 200) {
      Message({
        message: res.message,
        type: 'success'
      })
      emit('confirm', 'update')
    }
  }, 300)

  const confirm = () => {
    if (!formRef.value) return
    formRef.value.validate((valid) => {
      if (valid) {
        const params: ParamsMenuAdd = {
          code: form.code,
          label: form.label,
          parentCode: form.parentCode,
          sort: form.sort,
          remarks: form.remarks
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

  if (props.parentCode) {
    form.parentCode = props.parentCode
  }
  if (props.id) {
    title.value = '标签编辑'
    _getOne(props.id)
  }

  return {
    title,
    formRef,
    form,
    rules,
    confirm
  }
}
