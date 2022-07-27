<!--
  @describe: 修改密码
  @author cpl
  @update 2022-07-23 14:36:24
-->

<template>
  <Dialog title="修改密码" width="500px" top="30vh" @close="$emit('close')" @confirm="confirm">
    <ElForm
      :model="form"
      :rules="rules"
      ref="formRef"
      label-position="right"
      :label-width="80"
      class="mt-4 mx-auto g-w-320"
      @submit.native.prevent
    >
      <ElFormItem prop="password" label="原始密码">
        <ElInput v-model="form.password" type="password" placeholder="请输入原始密码"></ElInput>
      </ElFormItem>
      <ElFormItem prop="newPassword" label="新密码">
        <ElInput v-model="form.newPassword" type="password" placeholder="请输入新密码"></ElInput>
      </ElFormItem>
      <ElFormItem prop="confirmPassword" label="确认密码">
        <ElInput v-model="form.confirmPassword" type="password" placeholder="请再次输入密码"></ElInput>
      </ElFormItem>
    </ElForm>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from '@/components/Dialog/index.vue'
import { ElForm, ElFormItem, ElInput, FormRules, FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'
import { updatePasswordSelf } from '@/api/user'
import { Message } from '@/utils/interaction'

const emit = defineEmits(['close'])

const formRef = ref<FormInstance>()

interface StatePassword {
  password: string
  newPassword: string
  confirmPassword: string
}
const form = reactive<StatePassword>({
  password: '',
  newPassword: '',
  confirmPassword: ''
})

const validNewPassword = (rule: any, value: string, callback: Function) => {
  const flag = value && value === form.password
  if (!flag) callback()
  else callback('新密码不能与原始密码相同')
}
const validConfirmPassword = (rule: any, value: string, callback: Function) => {
  const flag = value && value === form.newPassword
  if (flag) callback()
  else callback('两次密码输入不一致')
}
const rules = reactive<FormRules>({
  password: [{ required: true, trigger: 'change', message: '请输入原始密码' }],
  newPassword: [
    { required: true, trigger: 'change', message: '请输入新密码' },
    { validator: validNewPassword, trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, trigger: 'change', message: '请再次输入密码' },
    { validator: validConfirmPassword, trigger: 'blur' }
  ]
})

const confirm = () => {
  if (!formRef.value) return
  formRef.value.validate(async (valid) => {
    if (valid) {
      const params = {
        password: form.password,
        newPassword: form.newPassword
      }
      const res = await updatePasswordSelf(params)
      if (res.code === 200) {
        Message({ message: <string>res.message, type: 'success' })
        emit('close')
      }
    }
  })
}
</script>

<style lang="scss" scoped></style>
