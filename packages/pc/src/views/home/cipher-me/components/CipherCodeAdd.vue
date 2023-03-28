<!--
  @describe 口令 code 新增或编辑
  @author cpl
  @create 2023-03-24 10:14:22
-->

<template>
  <Dialog
    :title="isExist ? '口令code修改' : '口令code新增'"
    width="500px"
    top="30vh"
    class-content="pt-10 pb-4"
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
      <ElFormItem prop="code" label="code">
        <ElInput v-model="form.code" type="password" placeholder="请输入口令code" show-password></ElInput>
      </ElFormItem>
      <ElFormItem prop="oldCode" label="oldCode" v-if="isExist">
        <ElInput v-model="form.oldCode" type="password" placeholder="请输入oldCode" show-password></ElInput>
      </ElFormItem>
    </ElForm>
    <div class="text-sm text-lighter flex pt-4 pl-4">
      <span class="text-danger shrink-0">注意：</span>
      <span class="flex flex-col">
        <span>口令code新增后不可删除，仅可修改；</span>
        <span>本系统不会以任何形式存储你的口令code，请保管好你的口令code！</span>
      </span>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { addCipherCode, existCipherCodeSelf, updateCipherCode } from '@/api/cipher'
import Dialog from '@/components/Dialog/index.vue'
import { reactive, ref } from 'vue'
import { ElForm, ElFormItem, ElInput, FormRules, FormInstance } from 'element-plus'
import { getPx } from '@/utils/tools'
import { Message } from '@/utils/interaction'
import { encrypt } from '@jiumu/utils'
import { cipherCodeAddProps, cipherCodeAddEmits } from './type'

const props = defineProps(cipherCodeAddProps)
const emit = defineEmits(cipherCodeAddEmits)

const isExist = ref<boolean>(false)

const _check = async () => {
  const res = await existCipherCodeSelf()
  if (res.code === 200) {
    isExist.value = res.data
  }
}
_check()

const formRef = ref<FormInstance>()
const form = reactive<ParamsCipherCodeUpdate>({
  code: '',
  oldCode: ''
})
const validOldCode = (rule: any, value: string, callback: Function) => {
  if (!isExist.value || value) callback()
  else callback('请输入oldCode')
}
const rules = reactive<FormRules>({
  code: [{ required: true, trigger: 'change', message: '请输入口令code' }],
  oldCode: [{ validator: validOldCode, trigger: 'blur' }]
})

const confirm = () => {
  if (!formRef.value) return
  formRef.value.validate(async (valid) => {
    if (valid) {
      if (isExist.value) {
        const res = await updateCipherCode({
          code: encrypt(form.code),
          oldCode: encrypt(form.oldCode)
        })
        if (res.code === 200) {
          Message({ message: res.message, type: 'success' })
          emit('close', {
            key: 'refresh',
            type: props.type
          })
        }
      } else {
        const res = await addCipherCode({ code: encrypt(form.code) })
        if (res.code === 200) {
          Message({ message: res.message, type: 'success' })
          emit('close', {
            key: 'refresh',
            type: props.type
          })
        }
      }
    }
  })
}

const handleClose = () => {
  emit('close', {
    key: 'close',
    type: props.type
  })
}
</script>
