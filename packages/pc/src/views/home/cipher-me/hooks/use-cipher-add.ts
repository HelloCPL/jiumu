/**
 * @description 口令新增逻辑处理
 * @author cpl
 * @create 2023-03-24 11:57:19
 */

import { CipherAddProps, CipherAddEmits } from '../components/type'
import { ref, reactive, onMounted } from 'vue'
import { FormInstance, FormRules } from 'element-plus'
import { addCipher, getCipherOneSelf, updateCipher } from '@/api/cipher'
import { decrypt, encrypt } from '@jiumu/utils'
import { debounce } from 'lodash-es'
import { Message } from '@/utils/interaction'
import { useCipherStore } from '@/store'
import { useCheckCipherCode } from './use-index'

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

  const cipherStore = useCipherStore()
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
        form.account = decrypt(data.account, data.keyStr, cipherStore.code + data.ivStr)
        form.cipher = decrypt(data.cipher, data.keyStr, cipherStore.code + data.ivStr)
      } else {
        form.account = decrypt(data.account, data.keyStr, data.ivStr)
        form.cipher = decrypt(data.cipher, data.keyStr, data.ivStr)
      }
      // 处理标签
      if (data.classify?.length) {
        form.classify = data.classify.map((item) => item.id).join(',')
      }
    }
  }
  onMounted(() => {
    if (props.id) {
      title.value = '口令编辑'
      _getOne(props.id)
    }
  })

  // 添加口令
  const _add = debounce(async (params: ParamsCipherAdd) => {
    const res = await addCipher(params)
    if (res.code === 200) {
      Message({
        message: res.message,
        type: 'success'
      })
      emit('confirm')
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
      emit('confirm')
    }
  }, 300)

  const { isExistCode } = useCheckCipherCode()
  // 确认
  const confirm = () => {
    if (!formRef.value) return
    if (!isExistCode.value) {
      emit('toAddCipherCode')
      return
    }
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

  return {
    title,
    formRef,
    form,
    rules,
    confirm
  }
}
