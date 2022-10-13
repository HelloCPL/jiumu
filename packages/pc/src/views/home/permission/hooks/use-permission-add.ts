/**
 * @author chen
 * @description 权限新增或编辑处理方法
 * @update 2022-07-25 16:54:50
 */

import { addPermission, getPermissionOne, updatePermission } from '@/api/permission'
import { Message } from '@/utils/interaction'
import { FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { debounce } from 'lodash-es'
import { PermissionAddEmits } from '../components/type'

export const usePermissionAdd = (props: any, emit: PermissionAddEmits) => {
  const title = ref<string>('权限新增')

  const formRef = ref<FormInstance>()
  const form = reactive<ParamsPermissionAdd>({
    code: '',
    label: '',
    href: '',
    sort: 1,
    remarks: ''
  })

  const rules = reactive<FormRules>({
    code: [{ required: true, trigger: 'change', message: '请输入code' }],
    label: [{ required: true, trigger: 'change', message: '请输入描述' }]
  })

  // 获取权限
  const _getOne = async (id: string) => {
    const res = await getPermissionOne(id, true)
    if (res.code === 200) {
      form.code = res.data.code
      form.label = res.data.label
      form.href = res.data.href
      form.sort = res.data.sort
      form.remarks = res.data.remarks
    }
  }

  // 添加权限
  const _add = debounce(async (params: ParamsPermissionAdd) => {
    const res = await addPermission(params)
    if (res.code === 200) {
      Message({
        message: res.message,
        type: 'success'
      })
      emit('confirm', 'add')
    }
  }, 300)

  // 修改权限
  const _update = debounce(async (params: ParamsPermissionAdd) => {
    const res = await updatePermission(params)
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
        const params: ParamsPermissionAdd = {
          code: form.code,
          label: form.label,
          href: form.href,
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

  if (props.id) {
    title.value = '权限编辑'
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
