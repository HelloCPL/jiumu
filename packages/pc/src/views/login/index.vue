<!--
  @describe: 主页面入口
  @author: cpl
  @create: 2022-07-04 17:20:19
-->

<template>
  <div class="relative w-full h-full">
    <img
      class="absolute min-w-full h-full object-cover opacity-90 select-none g-center"
      :src="$STATIC_URL + 'pc/images/login_bg.jpg'"
      alt=""
    />
    <!-- 容器盒子 -->
    <div class="absolute z-10 flex login-wrapper">
      <div class="h-full w-1/2 text-white bg-black-2">
        <p class="text-4xl mt-14 text-center">欢迎进入</p>
        <p class="mt-2 text-xl text-center">樛木管理系统</p>
        <ElButton class="mt-4 login-btn" size="small" plain round @click="toggleShow">
          前往{{ loginShow.show ? '注册' : '登录' }}
        </ElButton>
        <p class="absolute bottom-5 w-1/2 text-center text-xs px-5 text-white-6">
          测试账号：test/123456，该账号仅提供浏览所用，且仅包含浏览部分页面的权限！
        </p>
      </div>
      <div class="h-full w-1/2 bg-white relative overflow-hidden login-right">
        <Login
          class="absolute"
          :style="{ top: loginShow.top + '%', opacity: loginShow.opacity }"
          v-if="loginShow.show"
        />
        <Register
          class="absolute"
          :style="{ top: registerShow.top + '%', opacity: registerShow.opacity }"
          v-if="registerShow.show"
        ></Register>
      </div>
    </div>
  </div>
  <AboutUs></AboutUs>
</template>

<script lang="ts" setup>
import { ElButton } from 'element-plus'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import { useIndex } from './hooks/use-index'
import AboutUs from '@/components/AboutUs/index.vue'

const { loginShow, registerShow, toggleShow } = useIndex()
</script>

<style lang="scss" scoped>
.login-wrapper {
  width: 540px;
  height: 320px;
  top: 48%;
  left: 40%;
  transform: translate(-50%, -50%);

  .login-btn {
    width: 100px;
    margin-left: 50%;
    transform: translate(-50%);
  }
}
</style>
