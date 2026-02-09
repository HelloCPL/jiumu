<!--
  @describe: 用户详情
  @author cpl
  @update 2022-07-26 16:37:39
-->

<template>
  <Dialog title="用户信息" :show-footer="false">
    <template v-if="userInfo">
      <div class="text-lighter border-b-1 border-lighter py-3 mb-4">基本信息</div>
      <div class="mb-4">
        <!-- 用户基本信息 -->
        <div class="mb-4 flex">
          <ElImage
            :src="userInfo.avatar.filePath"
            class="w-16 h-16 rounded-sm mr-2"
            :preview-src-list="[userInfo.avatar.filePath]"
            v-if="userInfo.avatar"
          ></ElImage>
          <div class="flex flex-col">
            <span class="relative">
              <span class="text-xl">{{ userInfo.username }}</span>
              <img
                class="absolute top-0 w-4 icon-sex"
                :src="$STATIC_URL + 'pc/icons/icon_male.png'"
                alt=""
                v-if="userInfo.sex === '201'"
              />
              <img
                class="absolute top-0 w-4 icon-sex"
                :src="$STATIC_URL + 'pc/icons/icon_female.png'"
                alt=""
                v-else-if="userInfo.sex === '202'"
              />
              <img
                class="absolute top-0 w-4 icon-sex"
                :src="$STATIC_URL + 'pc/icons/icon_sex_no.png'"
                alt=""
                v-else
              />
            </span>
            <span>{{ userInfo.phone }}</span>
          </div>
        </div>
        <div class="mb-4" v-if="userInfo.birthday">
          <IconSvg name="date"></IconSvg>
          <span class="ml-1">{{ formatDate(userInfo.birthday, 'YYYY-MM-DD') }}</span>
        </div>
        <div class="mb-4" v-if="userInfo.professional">
          <IconSvg name="professional"></IconSvg>
          <span class="ml-1">{{ userInfo.professional }}</span>
        </div>
        <div class="mb-4" v-if="userInfo.address">
          <IconSvg name="address"></IconSvg>
          <span class="ml-1"> {{ userInfo.address }}</span>
        </div>
        <div v-if="userInfo.remarks" class="mb-4">
          <IconSvg name="remark"></IconSvg>
          <span class="ml-1">{{ userInfo.remarks }}</span>
        </div>
        <div class="text-sm text-lighter">
          <span class="mr-4">注册时间：{{ userInfo.createTime }}</span>
          <span>注册终端：{{ userInfo.terminal }}</span>
        </div>
      </div>
    </template>

    <template v-if="roles.length">
      <div class="text-lighter border-b-1 border-lighter py-3 mb-4">角色信息</div>
      <div>
        <ElTag size="small" round type="warning" class="mr-2 mb-2" v-for="item in roles" :key="item.id">
          {{ item.label }}
        </ElTag>
      </div>
    </template>
    <div class="h-4"></div>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from '@/components/Dialog/index.vue'
import { ref } from 'vue'
import { getUserOne } from '@/api/user'
import { ElTag, ElImage } from 'element-plus'
import { formatDate } from '@jiumu/utils'
import { getRoleByUserId } from '@/api/user-role'
import { userInfoProps } from './type'
import IconSvg from '@/components/IconSvg/index'

const props = defineProps(userInfoProps)

// 用户信息
const userInfo = ref<DataUserInfo | null>(null)
const _getOne = async (id: string) => {
  const res = await getUserOne(id, true)
  if (res.code === 200) {
    userInfo.value = res.data
  }
}
_getOne(props.id)

// 角色信息
const roles = ref<DataRole[]>([])
const _getRole = async (id: string) => {
  const res = await getRoleByUserId({
    userId: id,
    pageSize: 100
  })
  if (res.code === 200) {
    roles.value = res.data
  }
}
_getRole(props.id)
</script>
