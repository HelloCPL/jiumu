<!--
  @describe 口令 code 新增或编辑
  @author cpl
  @create 2023-03-24 10:14:22
-->

<template>
  <Dialog
    :title="isExistCode ? '口令code修改' : '口令code新增'"
    width="500px"
    top="30vh"
    add-code="pc:cipher:code:add:btn"
    @close="handleClose"
    @confirm="confirm"
  >
    <ElForm
      :model="form"
      :rules="rules"
      ref="formRef"
      label-position="right"
      :label-width="getPx(80)"
      class="mt-4 mx-auto g-w-320"
      @submit.native.prevent
    >
      <ElFormItem
        prop="oldCode"
        label="oldCode"
        v-if="isExistCode"
        :rules="{
          required: true,
          trigger: 'change',
          message: '请输入旧口令code'
        }"
      >
        <ElInput
          v-model="form.oldCode"
          type="password"
          autocomplete="new-password"
          placeholder="请输入oldCode"
          show-password
        ></ElInput>
      </ElFormItem>
      <ElFormItem prop="code" label="code">
        <ElInput
          v-model="form.code"
          type="password"
          autocomplete="new-password"
          placeholder="请输入口令code"
          show-password
        ></ElInput>
      </ElFormItem>
    </ElForm>
    <div class="text-sm text-lighter flex pt-4 pl-4">
      <span class="text-danger shrink-0">注意：</span>
      <span class="flex flex-col">
        <span>口令code新增后不可删除，仅可修改；</span>
        <span>口令code如果丢失，将无法查看、修改或删除加权的口令；</span>
        <span>本系统不会以任何形式存储你的口令code，请保管好你的口令code！</span>
      </span>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { addCipherCode, updateCipherCode } from '@/api/cipher'
import Dialog from '@/components/Dialog/index.vue'
import { reactive, ref } from 'vue'
import { ElForm, ElFormItem, ElInput, FormRules, FormInstance } from 'element-plus'
import { getPx } from '@/utils/tools'
import { Message } from '@/utils/interaction'
import { encrypt } from '@jiumu/utils'
import { cipherCodeAddEmits } from './type'
import { useCheckCipherCode } from '../hooks/use-index'
import { useCipherStore } from '@/store'

const emit = defineEmits(cipherCodeAddEmits)

const { isExistCode, setIsExistCodeTrue } = useCheckCipherCode()

const formRef = ref<FormInstance>()
const form = reactive<ParamsCipherCodeUpdate>({
  code: '',
  oldCode: ''
})

const validCode = (rule: any, value: string, callback: any) => {
  const reg = /^[a-zA-Z0-9]+$/
  if (!value) {
    callback(new Error('请输入口令code'))
  } else if (value.length < 6 || value.length > 16) {
    callback(new Error('请输入口令code长度为6-16位'))
  } else if (!reg.test(value)) {
    callback(new Error('口令code只能由字母和数字组成'))
  }
  callback()
}
const rules = reactive<FormRules>({
  code: [{ required: true, trigger: 'change', validator: validCode }]
})

const cipherStore = useCipherStore()
const confirm = () => {
  if (!formRef.value) return
  formRef.value.validate(async (valid) => {
    if (valid) {
      if (isExistCode.value) {
        const res = await updateCipherCode({
          code: encrypt(form.code),
          oldCode: encrypt(form.oldCode)
        })
        if (res.code === 200) {
          cipherStore.setCode(form.code)
          setIsExistCodeTrue()
          emit('confirm')
          Message({ message: res.message, type: 'success' })
        }
      } else {
        const res = await addCipherCode({ code: encrypt(form.code) })
        if (res.code === 200) {
          cipherStore.setCode(form.code)
          setIsExistCodeTrue()
          emit('confirm')
          Message({ message: res.message, type: 'success' })
        }
      }
    }
  })
}

const handleClose = () => {
  emit('close')
}
</script>
