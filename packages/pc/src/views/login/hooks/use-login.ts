/**
 * 登录页处理逻辑
 */
import { reactive, Ref, ref } from 'vue'
import { LoginInfo } from './type'
import { FormRules, FormInstance } from 'element-plus'

interface UseLogin {
  formRef: Ref<FormInstance | undefined>
  form: LoginInfo
  rules: FormRules
  submitValid: (el: FormInstance) => Promise<LoginInfo>
}

export function useLogin(): UseLogin {
  const formRef = ref<FormInstance>()
  const form = reactive<LoginInfo>({
    phone: '',
    password: ''
  })

  // 校验账号
  const validPhone = (rule: any, value: string, callback: Function) => {
    const reg: RegExp = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    const flag = value === 'root' || value === 'test' || reg.test(value)
    if (flag) callback()
    else callback('请输入手机号码格式的账号')
  }

  const rules = reactive<FormRules>({
    phone: [
      { required: true, trigger: 'change', message: '请输入账号' },
      { validator: validPhone, trigger: 'blur' }
    ],
    password: [{ required: true, trigger: 'change', message: '请输入密码' }]
  })

  // 提交校验
  const submitValid = (formEl: FormInstance): Promise<LoginInfo> => {
    return new Promise(async (resolve) => {
      await formEl.validate((valid) => {
        if (valid) {
          resolve(form)
        }
      })
    })
  }

  return {
    formRef,
    form,
    rules,
    submitValid
  }
}
