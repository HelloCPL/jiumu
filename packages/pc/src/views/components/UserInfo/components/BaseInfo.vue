<!--
  @describe 账号设置
  @author cpl
  @create 2023-03-17 16:47:36
-->

<template>
  <div class="w-full">
    <!-- 基本信息展示  -->
    <div
      class="w-full mx-auto pt-6 pl-6 pb-4 pr-2 bg-white rounded-md shadow-lg text-sm text-lighter border-1 border-lighter"
    >
      <!-- 头像 昵称 性别 账号  -->
      <div class="flex flex-wrap">
        <Upload upload-type="files" @change="handleUploadAvatar">
          <img :src="avatar?.filePath" v-if="avatar" class="w-12 h-12 rounded-md mr-2" />
          <img
            :src="$STATIC_URL + '/pc/images/avatar2.png'"
            alt=""
            class="w-12 h-12 rounded-md mr-2"
            v-else
          />
        </Upload>
        <div class="flex flex-col text">
          <span class="relative">
            <span class="text-xl">{{ userStore.userInfo?.username || '昵称' }}</span>
            <img
              class="absolute top-1 w-4 icon-sex"
              :src="$STATIC_URL + 'pc/icons/icon_male.png'"
              alt=""
              v-if="userStore?.userInfo?.sex === '201'"
            />
            <img
              class="absolute top-1 w-4 icon-sex"
              :src="$STATIC_URL + 'pc/icons/icon_female.png'"
              alt=""
              v-else-if="userStore?.userInfo?.sex === '202'"
            />
          </span>
          <span class="mt-1 flex items-center" v-if="userStore.userInfo?.phone">
            <span class="mr-1">{{ userStore.userInfo.phone }}</span>
            <ElTooltip content="暂时不开放账号修改功能" placement="top">
              <ElIcon size="var(--jm-font-size)" color="var(--jm-color-text-placeholder)">
                <QuestionFilled />
              </ElIcon>
            </ElTooltip>
          </span>
        </div>
      </div>
      <!-- 标签 -->
      <div class="mt-4 flex flex-wrap" v-if="userStore.tags?.length">
        <template v-for="item in userStore.tags" :key="item.id">
          <ElTag size="small" round class="mr-2 mb-2" v-if="item.label">
            {{ item.label }}
          </ElTag>
        </template>
      </div>
      <!-- 角色  -->
      <div class="mt-2 flex flex-wrap" v-if="userStore.roles?.length">
        <template v-for="item in userStore.roles" :key="item.id">
          <ElTag size="small" round type="warning" class="mr-2 mb-2" v-if="item.label">
            {{ item.label }}
          </ElTag>
        </template>
      </div>
      <!-- 日期 职业 地址 备注 -->
      <div class="mt-2" v-if="userStore.userInfo?.birthday">
        <IconSvg name="date"></IconSvg>
        <span class="ml-1">
          {{ formatDate(userStore.userInfo.birthday, 'YYYY-MM') }}
        </span>
      </div>
      <div class="mt-2" v-if="userStore.userInfo?.professional">
        <IconSvg name="professional"></IconSvg>
        <span class="ml-1">{{ userStore.userInfo.professional }}</span>
      </div>
      <div class="mt-2" v-if="userStore.userInfo?.address">
        <IconSvg name="address"></IconSvg>
        <span class="ml-1">{{ userStore.userInfo.address }}</span>
      </div>
      <div class="mt-2" v-if="userStore.userInfo?.remarks">
        <IconSvg name="remark"></IconSvg>
        <span class="ml-1">{{ userStore.userInfo.remarks }}</span>
      </div>
      <div class="mt-4 pr-2 flex flex-wrap items-center justify-end">
        <ElTooltip content="修改密码" placement="top">
          <ElButton text :icon="Lock" size="small" @click="showPassword = true"></ElButton>
        </ElTooltip>
        <ElButton type="primary" text :icon="Edit" size="small" @click="showBaseInfo = true">
          修改个人信息
        </ElButton>
      </div>
    </div>
    <!-- 退出登录 -->
    <div class="mt-14 flex justify-center">
      <ElButton type="primary" plain class="px-10" @click="exit">退出登录</ElButton>
    </div>
    <div
      class="w-full flex flex-wrap items-center justify-end text-sm text-lighter mt-4"
      v-if="userStore.userInfo?.createTime"
    >
      <IconSvg name="time"></IconSvg>
      <span class="ml-1 mr-2"> {{ formatDate(userStore.userInfo.createTime, 'YYYY-MM-DD') }}</span>
      <span class="flex-center-y">
        <IconSvg name="source"></IconSvg>
        <span class="ml-1">{{ userStore.userInfo?.terminal }}</span>
      </span>
    </div>

    <!-- 修改密码组件 -->
    <EditPassword v-if="showPassword" @close="showPassword = false"></EditPassword>
    <!-- 修改个人信息 -->
    <EditBaseInfo v-if="showBaseInfo" @close="showBaseInfo = false"></EditBaseInfo>
  </div>
</template>

<script lang="ts" setup>
import { ElIcon, ElTag, ElButton, ElTooltip } from 'element-plus'
import { QuestionFilled, Edit, Lock } from '@element-plus/icons-vue'
import Upload from '@/components/Upload/index.vue'
import IconSvg from '@/components/IconSvg/index'
import { useResetStore } from '@/store'
import { formatDate } from '@jiumu/utils'
import { Confirm } from '@/utils/interaction'
import { exitUser, updateUserBaseSelf } from '@/api/user'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import EditPassword from './EditPassword.vue'
import EditBaseInfo from './EditBaseInfo.vue'
import { userStore } from '@/store/user/instance'
import { tokenRefreshStore } from '@/store/token-refresh/instance'

// 密码
const showPassword = ref<boolean>(false)

const showBaseInfo = ref<boolean>(false)

// 头像
const avatar = ref<DataBaseFile | null | undefined>(null)
avatar.value = userStore.userInfo?.avatar
const handleUploadAvatar = async (files: DataBaseFile[]) => {
  if (files?.length) {
    const res = await updateUserBaseSelf({
      avatar: files[0].id
    })
    if (res.code === 200) {
      avatar.value = files[0]
      userStore.updateUser('1')
    }
  }
}

// 退出登录
const router = useRouter()
const exit = () => {
  Confirm('确认退出登录吗').then(async () => {
    await exitUser(tokenRefreshStore.tokenRefresh)
    const resetStore = useResetStore()
    resetStore.reset()
    router.replace({
      path: '/login',
      query: {
        redirect: location.pathname + location.search
      }
    })
  })
}
</script>

<style lang="scss" scoped>
.icon-sex {
  right: -1rem;
}
</style>
