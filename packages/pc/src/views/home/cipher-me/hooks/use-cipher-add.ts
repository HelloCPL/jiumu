/**
 * @description 口令新增逻辑处理
 * @author cpl
 * @create 2023-03-24 11:57:19
 */

import { CipherAddProps, CipherAddEmits } from '../components/type'
import { ref, reactive } from 'vue'
import { FormInstance, FormRules } from 'element-plus'
import { addCipher, existCipherCodeSelf, getCipherOneSelf, updateCipher } from '@/api/cipher'
import { decrypt, encrypt } from '@jiumu/utils'
import { debounce } from 'lodash-es'
import { Message } from '@/utils/interaction'
import { useCipherStore } from '@/store'

export const useCipherAdd = (props: CipherAddProps, emit: CipherAddEmits) => {
  const title = ref<string>('口令新增')

  const formRef = ref<FormInstance>()
  const form = reactive<ParamsCipherAdd>({
    title: '',
    account: '',
    cipher: '',
    type: '801',
    classify: '',
    sort: 1
  })

  const rules = reactive<FormRules>({
    title: [{ required: true, trigger: 'change', message: '请输入标题' }],
    account: [{ required: true, trigger: 'change', message: '请输入账号' }],
    cipher: [{ required: true, trigger: 'change', message: '请输入密码' }],
    type: [{ required: true, trigger: 'change', message: '请选择类型' }]
  })

  // 检查口令code
  const show = ref<boolean>(false)
  const isExist = ref<boolean>(false)
  const _checkIsExist = async () => {
    const res = await existCipherCodeSelf()
    if (res.code === 200) {
      isExist.value = res.data
    }
  }
  _checkIsExist()
  // 处理类型更新
  const typeCode = ref<string>('')
  const updateType = (type: string) => {
    if (type !== '802' || isExist.value) {
      form.type = type
    } else {
      typeCode.value = type
      show.value = true
    }
  }
  const handleShowCode = () => {
    typeCode.value = ''
    show.value = true
  }
  const handleConfirmCode = (params: any) => {
    show.value = false
    if (params.key === 'refresh') {
      isExist.value = true
      if (params.type === '802') {
        form.type = '802'
      }
    } else if (params.type === '802') {
      Message({
        message: '加权等级必须先添加口令code'
      })
    }
  }

  // 获取口令
  const _getOne = async (id: string) => {
    const res = await getCipherOneSelf(id, true)
    if (res.code === 200) {
      const data = res.data
      form.title = data.title
      form.type = data.type
      form.sort = data.sort
      // 处理账号密码
      if (data.type === '802') {
        // 二次解密
        form.account = decrypt(decrypt(data.account, data.keyStr, data.ivStr))
        form.cipher = decrypt(decrypt(data.cipher, data.keyStr, data.ivStr))
      } else {
        form.account = decrypt(data.account)
        form.cipher = decrypt(data.cipher)
      }
      console.log(form)
      // 处理标签
      if (data.classify.length) {
        form.classify = data.classify.map((item) => item.id).join(',')
      }
    }
  }

  // 添加口令
  const _add = debounce(async (params: ParamsCipherAdd) => {
    const res = await addCipher(params)
    if (res.code === 200) {
      Message({
        message: res.message,
        type: 'success'
      })
      emit('confirm', 'add')
    }
  }, 300)

  // 修改口令
  const _update = debounce(async (params: ParamsCipherAdd) => {
    const res = await updateCipher(params)
    if (res.code === 200) {
      Message({
        message: res.message,
        type: 'success'
      })
      emit('confirm', 'update')
    }
  }, 300)

  // 确认
  const confirm = () => {
    if (!formRef.value) return
    formRef.value.validate((valid) => {
      if (valid) {
        const params: ParamsCipherAdd = {
          title: form.title,
          account: encrypt(form.account),
          cipher: encrypt(form.cipher),
          type: form.type,
          classify: form.classify,
          sort: form.sort
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
    title.value = '口令编辑'
    _getOne(props.id)
  }

  const isReadonly = ref(true)
  setTimeout(() => {
    isReadonly.value = false
  }, 1000)
  const showPassword = ref(false)
  const cipherStore = useCipherStore()
  if (cipherStore.code) {
    showPassword.value = true
  }

  return {
    show,
    handleConfirmCode,
    typeCode,
    updateType,
    handleShowCode,
    title,
    formRef,
    form,
    rules,
    confirm,
    isReadonly,
    showPassword
  }
}
