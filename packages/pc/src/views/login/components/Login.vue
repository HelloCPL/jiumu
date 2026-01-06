<!--
  @describe: 登录
  @author cpl
  @update 2022-07-09 19:29:55
-->

<template>
  <div class="h-full w-full p-8">
    <ElForm :model="form" :rules="rules" ref="formRef" @keydown.enter="submit">
      <ElFormItem prop="phone" class="mt-16">
        <ElInput v-model="form.phone" placeholder="请输入账号"></ElInput>
      </ElFormItem>
      <ElFormItem prop="password">
        <ElInput v-model="form.password" type="password" placeholder="请输入密码"></ElInput>
      </ElFormItem>
      <ElFormItem class="mt-16">
        <ElButton type="primary" round class="w-full" @click="submit">登录</ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import { ElForm, ElFormItem, ElInput, ElButton, FormInstance } from 'element-plus'
import { useLogin } from '../hooks/use-login'
import { login } from '@/api/user'
import { useUserStore, useTokenRefreshStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'

const { formRef, form, rules, submitValid } = useLogin()
const userStore = useUserStore()
const tokenRefreshStore = useTokenRefreshStore()
const route = useRoute()
const router = useRouter()

// 登录
const submit = () => {
  submitValid(formRef.value as FormInstance).then(async (form) => {
    const params = {
      phone: form.phone,
      password: form.password
    }
    const res = await login(params)
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
