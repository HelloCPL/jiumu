<!--
  @describe: 登录
  @author cpl
  @update 2022-07-09 19:29:55
-->

<template>
  <div class="h-full w-full p-8">
    <ElForm :model="form" :rules="rules" ref="formRef">
      <ElFormItem prop="phone" class="mt-16">
        <ElInput v-model="form.phone" placeholder="请输入账号"></ElInput>
      </ElFormItem>
      <ElFormItem prop="password">
        <ElInput v-model="form.password" type="password" placeholder="请输入密码"></ElInput>
      </ElFormItem>
      <ElFormItem class="mt-16">
        <ElButton type="primary" round class="w-full" @click="submit(formRef)">登录</ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import { ElForm, ElFormItem, ElInput, ElButton, FormInstance } from 'element-plus'
import { useLogin } from '../hooks/use-login'
import { login } from '../../../api/user'
import { useUserStore } from '../../../store'
import { useRoute, useRouter } from 'vue-router'

const { formRef, form, rules, submitValid } = useLogin()
const store = useUserStore()
const route = useRoute()
const router = useRouter()

// 登录
const submit = (el: FormInstance | undefined) => {
  submitValid(el as FormInstance).then(async (form) => {
    const res = await login({
      phone: form.phone,
      password: form.password
    })
    if (res.code === 200) {
      const { data } = res
      store.setToken({
        token: data.token,
        tokenRefresh: data.tokenRefresh
      })
      // 获取用户信息
      store.getUser()
      const redirect = <string>route.query.redirect || '/'
      router.replace({
        path: redirect
      })
    }
  })
}
</script>
