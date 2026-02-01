<!--
  @describe: 主页面入口
  @author: cpl
  @create: 2022-07-04 17:20:19
-->

<template>
  <div class="relative w-full h-full">
    <img
      class="w-full h-full object-cover opacity-90 select-none g-center"
      :src="$STATIC_URL + 'pc/images/login_bg.jpg'"
      alt=""
    />
    <!-- 容器盒子 -->
    <div
      class="z-10 w-full flex g-center-x shadow-md rounded-lg login-wrapper"
      :style="{ top: state.height + 50 + 'px' }"
    >
      <!-- <div class="h-full w-1/2 text-white bg-black-2">
        <p class="text-4xl mt-14 text-center">欢迎进入</p>
        <p class="mt-2 text-xl text-center">樛木管理系统</p>
        <ElButton class="mt-4 login-btn" size="small" plain round @click="toggleShow">
          前往{{ loginShow.show ? '注册' : '登录' }}
        </ElButton>
        <p class="absolute bottom-5 w-1/2 text-center text-xs px-5 text-white-6">
          测试账号：test/123456，该账号仅提供浏览所用，且仅包含浏览部分页面的权限！
        </p>
      </div> -->
      <div class="h-full w-full relative bg-white overflow-hidden rounded-lg login-right">
        <div class="absolute bg-white rounded-lg login-content">
          <Login
            class="absolute"
            :style="{ top: loginShow.top + '%', opacity: loginShow.opacity }"
            v-if="loginShow.show"
            @to-register="toggleShow"
          />
          <Register
            class="absolute"
            :style="{ top: registerShow.top + '%', opacity: registerShow.opacity }"
            v-if="registerShow.show"
            @to-login="toggleShow"
          ></Register>
        </div>
      </div>
    </div>
    <!-- 粒子时间组件 -->
    <Lasyloader>
      <Particle
        class="absolute g-center-x"
        :width="state.width"
        :height="state.height"
        :font-size="state.fontSize"
        :gap="state.gap"
      ></Particle>
    </Lasyloader>
  </div>
  <Lasyloader>
    <AboutUs></AboutUs>
  </Lasyloader>
</template>

<script lang="ts" setup>
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import { useIndex } from './hooks/use-index'
import { defineAsyncComponent, reactive, watch } from 'vue'
import Lasyloader from '@/components/LazyLoader/index.vue'
import { useWidth } from '@/hooks/use-width'

const Particle = defineAsyncComponent(() => import('@/components/Particle/index.vue'))
const AboutUs = defineAsyncComponent(() => import('@/components/AboutUs/index.vue'))

const { loginShow, registerShow, toggleShow } = useIndex()

const state = reactive({
  width: 768,
  height: 280,
  fontSize: 80,
  gap: 2
})

const { width } = useWidth()
watch(
  () => width.value,
  (w) => {
    if (w > 1200) {
      state.width = 768
      state.height = 180
      state.fontSize = 80
      state.gap = 2
    } else if (w > 768) {
      state.width = 468
      state.height = 140
      state.fontSize = 60
      state.gap = 2
    } else {
      state.width = 370
      state.height = 80
      state.fontSize = 40
      state.gap = 2
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
@forward './index.scss';
</style>
