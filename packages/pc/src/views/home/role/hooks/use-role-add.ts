/**
 * @author chen
 * @description 角色新增或编辑处理方法
 * @update 2022-07-25 16:54:50
 */

import { addRole, getRoleOne, updateRole } from '@/api/role'
import { Message } from '@/utils/interaction'
import { FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { debounce } from 'lodash-es'

export const useRoleAdd = (props: any, emit: any) => {
  const title = ref<string>('角色新增')
  const formRef = ref<FormInstance>()
  const form = reactive<ParamsRoleAdd>({
    code: '',
    label: '',
    sort: 1,
    remarks: ''
  })

  const rules = reactive<FormRules>({
    code: [{ required: true, trigger: 'change', message: '请输入code' }],
    label: [{ required: true, trigger: 'change', message: '请输入描述' }]
  })

  // 获取角色
  const _getOne = async (id: string) => {
    const res = await getRoleOne(id, true)
    if (res.code === 200) {
      form.code = res.data.code
      form.label = res.data.label
      form.sort = res.data.sort
      form.remarks = res.data.remarks
    }
  }

  // 添加角色
  const _add = debounce(async (params: ParamsRoleAdd) => {
    const res = await addRole(params)
    if (res.code === 200) {
      Message({
        message: res.message,
        type: 'success'
      })
      emit('confirm', 'add')
    }
  }, 300)

  // 修改角色
  const _update = debounce(async (params: ParamsRoleAdd) => {
    const res = await updateRole(params)
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
        const params: ParamsRoleAdd = {
          code: form.code,
          label: form.label,
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
    title.value = '角色编辑'
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
