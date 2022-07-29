<!--
  @describe: 用户信息
  @author cpl
  @update 2022-07-22 20:20:56
-->

<template>
  <Dialog title="用户信息" width="600px" :show-footer="false" class-content="pl-4">
    <ElRow class="pt-3" v-if="userInfo">
      <ElCol :span="4" class="text-lg">基本信息</ElCol>
      <ElCol :span="20" class="text-light pt-1">
        <div class="mb-2 pl-1">
          <span class="mr-2">{{ userInfo.phone }}</span>
          <ElTooltip content="暂时不开放账号修改功能" placement="top">
            <ElIcon size="var(--jm-font-size)" color="var(--jm-color-text-placeholder)">
              <QuestionFilled />
            </ElIcon>
          </ElTooltip>
        </div>
        <!-- 用户基本信息 -->
        <BaseInfo></BaseInfo>

        <div class="text-sm text-lighter pl-1">
          注册时间：{{ userInfo.createTime }} 注册终端：{{ userInfo.terminal }}
        </div>
      </ElCol>
    </ElRow>
    <ElRow class="pt-3" v-if="roles.length">
      <ElCol :span="4" class="text-lg">我的角色</ElCol>
      <ElCol :span="20" class="text-lighter text-sm pt-1">
        <span v-for="(item, index) in roles" :key="item.id">
          {{ index !== 0 ? '、' : '' }}{{ item.label }}
        </span>
      </ElCol>
    </ElRow>
    <ElRow class="pt-3" v-if="tags.length">
      <ElCol :span="4" class="text-lg">我的标签</ElCol>
      <ElCol :span="20" class="text-lighter text-sm pt-1">
        <ElTag v-for="item in tags" :key="item.id" size="small" effect="plain" round class="mr-4">
          {{ item.label }}
        </ElTag>
      </ElCol>
    </ElRow>
    <ElRow class="pt-3" v-if="userInfo">
      <ElCol :offset="4" :span="20" class="text-lighter text-sm pt-1">
        <ElButton type="primary" size="small" @click="showPassword = true">修改密码</ElButton>
        <span class="ml-4 text-xs text-placeholder">建议3个月修改一次密码，修改密码后请保管好你的密码！</span>
      </ElCol>
      <EditPassword v-if="showPassword" @close="showPassword = false"></EditPassword>
    </ElRow>
    <ElRow class="pt-3" v-if="userInfo">
      <ElCol :offset="4" :span="20" class="text-lighter text-sm pt-1">
        <ElButton type="info" plain size="small" @click="exit">退出登录</ElButton>
      </ElCol>
    </ElRow>
    <!-- 登录记录 -->
    <LoginInfo v-if="userInfo" :user-id="userInfo.id"></LoginInfo>
    <div class="h-3"></div>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from '@/components/Dialog/index.vue'
import { ElRow, ElCol, ElIcon, ElTag, ElButton, ElTooltip } from 'element-plus'
import { QuestionFilled } from '@element-plus/icons-vue'
import BaseInfo from './BaseInfo.vue'
import { useUserStore, useResetStore } from '@/store'
import { storeToRefs } from 'pinia'
import LoginInfo from './LoginInfo.vue'
import EditPassword from './EditPassword.vue'
import { ref } from 'vue'
import { Confirm } from '@/utils/interaction'
import { exitUser } from '@/api/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useUserStore()
const { userInfo, roles, tags } = storeToRefs(store)

const showPassword = ref<boolean>(false)

// 退出登录
const exit = () => {
  Confirm('确认退出登录吗').then(async () => {
    const res = await exitUser()
    if (res.code === 200) {
      const resetStore = useResetStore()
      resetStore.reset()
      setTimeout(() => {
        router.replace({
          path: '/login',
          query: {
            redirect: location.pathname + location.search
          }
        })
      }, 3000)
    }
  })
}
</script>
