<!--
  @describe: 注册
  @author cpl
  @update 2022-07-09 19:29:55
-->

<template>
  <div class="h-full w-full p-8">
    <ElForm :model="form" :rules="rules" ref="formRef" @submit.native.prevent>
      <ElFormItem prop="phone" class="mt-8">
        <ElInput v-model="form.phone" placeholder="请输入账号"></ElInput>
      </ElFormItem>
      <ElFormItem prop="password">
        <ElInput v-model="form.password" type="password" placeholder="请输入密码"></ElInput>
      </ElFormItem>
      <ElFormItem prop="confirmPassword">
        <ElInput v-model="form.confirmPassword" type="password" placeholder="请再次输入密码"></ElInput>
      </ElFormItem>
      <ElFormItem class="mt-10">
        <ElButton type="primary" round class="w-full" @click="submit(formRef)">注册</ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<script lang="ts" setup>
import { ElForm, ElFormItem, ElInput, ElButton, FormInstance } from 'element-plus'
import { useRegister } from '../hooks/use-register'
import { register } from '@/api/user'
import { useTokenRefreshStore, useUserStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'

const { formRef, form, rules, submitValid } = useRegister()
const userStore = useUserStore()
const tokenRefreshStore = useTokenRefreshStore()
const route = useRoute()
const router = useRouter()

// 注册
const submit = (el: FormInstance | undefined) => {
  submitValid(el as FormInstance).then(async (form) => {
    const params = {
      phone: form.phone,
      password: form.password
    }
    const res = await register(params)
    if (res.code === 200) {
      const { data } = res
      userStore.setToken(data.token)
      tokenRefreshStore.setTokenRefresh(data.tokenRefresh)
      // 获取用户信息
      userStore.updateUser()
      let redirect = <string>route.query.redirect || '/'
      if (redirect.includes('jiumu-pc')) {
        redirect = redirect.substring(redirect.indexOf('/', 1))
      }
      router.replace({
        path: redirect
      })
    }
  })
}
</script>
