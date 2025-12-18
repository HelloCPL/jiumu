<!--
  @describe: 口令校验
  @author: cpl
  @create: 2023-03-25 00:59:08
-->

<template>
  <Dialog title="口令code校验" width="500px" top="30vh" @close="handleClose" @confirm="confirm">
    <ElForm
      :model="form"
      :rules="rules"
      ref="formRef"
      label-position="top"
      :label-width="getPx(80)"
      class="mt-4 mx-auto g-w-320"
      @submit.native.prevent
    >
      <ElFormItem prop="code" label="口令code">
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
        <span>本系统不会以任何形式存储你的口令code；</span>
        <span>此处仅作口令code校验，并只保留校验状态5分钟！</span>
      </span>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from '@/components/Dialog/index.vue'
import { cipherCodeAddEmits } from './type'
import { ElForm, ElFormItem, ElInput, FormRules, FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'
import { getPx } from '@/utils/tools'
import { checkCipherCodeSelf } from '@/api/cipher'
import { useCipherStore } from '@/store'
import { Message } from '@/utils/interaction'
import { encrypt } from '@jiumu/utils'

const emit = defineEmits(cipherCodeAddEmits)

const formRef = ref<FormInstance>()

const form = reactive({
  code: ''
})
const rules = reactive<FormRules>({
  code: [{ required: true, trigger: 'change', message: '请输入口令code' }]
})

const handleClose = () => {
  emit('close')
}
const cipherStore = useCipherStore()
const confirm = () => {
  if (!formRef.value) return
  formRef.value.validate(async (valid) => {
    if (valid) {
      const res = await checkCipherCodeSelf(encrypt(form.code))
      if (res.code === 200) {
        if (res.data) {
          cipherStore.setCode(form.code)
          emit('confirm')
        } else {
          Message({ message: '口令code校验失败' })
        }
      }
    }
  })
}
</script>
