<!--
  @describe: 注册
  @author cpl
  @update 2022-07-09 19:29:55
-->

<template>
  <div class="h-full w-full p-8">
    <ElForm :model="form" :rules="rules" ref="formRef" @keydown.enter="submit">
      <div class="text-xl text-center">注册</div>
      <ElFormItem prop="phone" class="mt-8">
        <ElInput v-model="form.phone" placeholder="请输入账号" autocomplete="new-password"></ElInput>
      </ElFormItem>
      <ElFormItem prop="password">
        <ElInput
          v-model="form.password"
          type="password"
          placeholder="请输入密码"
          autocomplete="new-password"
        ></ElInput>
      </ElFormItem>
      <ElFormItem prop="confirmPassword">
        <ElInput v-model="form.confirmPassword" type="password" placeholder="请再次输入密码"></ElInput>
      </ElFormItem>
      <ElFormItem class="mt-10">
        <ElButton type="primary" round class="w-full" @click="submit" :loading="isLoading">注册</ElButton>
      </ElFormItem>
    </ElForm>
    <div class="flex items-center justify-center pt-8">
      <span class="text-lighter">已有账号，前往</span>
      <span class="text-primary" @click="emit('toLogin')">登录</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElForm, ElFormItem, ElInput, ElButton, FormInstance } from 'element-plus'
import { useRegister } from '../hooks/use-register'
import { register } from '@/api/user'
import { useRoute, useRouter } from 'vue-router'
import { userStore } from '@/store/user/instance'
import { tokenRefreshStore } from '@/store/token-refresh/instance'
import { ref } from 'vue'

const emit = defineEmits(['toLogin'])

const { formRef, form, rules, submitValid } = useRegister()
const route = useRoute()
const router = useRouter()

const isLoading = ref(false)
// 注册
const submit = () => {
  submitValid(formRef.value as FormInstance).then(async (form) => {
    isLoading.value = true
    const params = {
      phone: form.phone,
      password: form.password
    }
    const res = await register(params).catch((err) => {
      isLoading.value = false
      return err
    })
    if (res.code === 200) {
      const { data } = res
      userStore.setToken(data.token)
      tokenRefreshStore.setTokenRefresh(data.tokenRefresh)
      // 获取用户信息
      await userStore.updateUser().catch(() => {
        isLoading.value = false
      })
      let redirect = <string>route.query.redirect || '/'
      if (redirect.includes('jiumu-pc')) {
        redirect = redirect.substring(redirect.indexOf('/', 1))
      }
      router.replace({
        path: redirect
      })
    }
    isLoading.value = false
  })
}
</script>
