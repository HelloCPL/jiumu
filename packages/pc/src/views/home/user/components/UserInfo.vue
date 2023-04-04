<!--
  @describe: 用户详情
  @author cpl
  @update 2022-07-26 16:37:39
-->

<template>
  <Dialog title="用户信息" :show-footer="false" class-content="pl-4">
    <ElRow class="pt-3 relative" v-if="userInfo">
      <ElCol :span="4" class="text-sm text-lighter">基本信息</ElCol>
      <ElCol :span="20" class="text-light pt-1">
        <!-- 用户基本信息 -->
        <ElRow class="mb-2">
          <ElCol :span="16" class="mb-2">
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
          </ElCol>
          <ElCol :span="16" class="mb-2">
            <span>{{ userInfo.phone }}</span>
          </ElCol>
          <ElCol :span="16" class="mb-2" v-if="userInfo.birthday">
            <IconSvg name="date"></IconSvg>
            <span class="ml-1">{{ formatDate(userInfo.birthday, 'YYYY-MM-DD') }}</span>
          </ElCol>
          <ElCol :span="16" class="mb-2" v-if="userInfo.professional">
            <IconSvg name="professional"></IconSvg>
            <span class="ml-1">{{ userInfo.professional }}</span>
          </ElCol>
          <ElCol :span="16" class="mb-2" v-if="userInfo.address">
            <IconSvg name="address"></IconSvg>
            <span class="ml-1"> {{ userInfo.address }}</span>
          </ElCol>
          <ElCol :span="16" v-if="userInfo.remarks">
            <IconSvg name="remark"></IconSvg>
            <span class="ml-1">{{ userInfo.remarks }}</span>
          </ElCol>
        </ElRow>
        <div class="text-sm text-lighter pl-1">
          <span class="mr-4">注册时间：{{ userInfo.createTime }}</span>
          <span>注册终端：{{ userInfo.terminal }}</span>
        </div>
      </ElCol>
      <ElImage
        :src="userInfo.avatar.filePath"
        class="top-3 right-3 w-16 h-16 object-cover cursor-pointer rounded-sm img-avatar"
        :preview-src-list="[userInfo.avatar.filePath]"
        v-if="userInfo.avatar"
      ></ElImage>
    </ElRow>
    <ElRow class="pt-3" v-if="rolesLabel">
      <ElCol :span="4" class="text-sm text-lighter">角色信息</ElCol>
      <ElCol :span="20" class="text-lighter text-sm pt-1">
        <span>
          {{ rolesLabel }}
        </span>
      </ElCol>
    </ElRow>
    <ElRow class="pt-3" v-if="tagsLabel">
      <ElCol :span="4" class="text-sm text-lighter">标签信息</ElCol>
      <ElCol :span="20" class="text-lighter text-sm pt-1">
        <span>
          {{ tagsLabel }}
        </span>
      </ElCol>
    </ElRow>
    <div class="h-4"></div>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from '@/components/Dialog/index.vue'
import { ref } from 'vue'
import { getUserOne } from '@/api/user'
import { ElRow, ElCol, ElIcon, ElImage } from 'element-plus'
import { Calendar } from '@element-plus/icons-vue'
import { formatDate } from '@jiumu/utils'
import { getRoleByUserId } from '@/api/user-role'
import { getTagByUserId } from '@/api/user-tag'
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
const rolesLabel = ref('')
const _getRole = async (id: string) => {
  const res = await getRoleByUserId({
    userId: id,
    pageSize: 100
  })
  if (res.code === 200) {
    rolesLabel.value = res.data.reduce((cur, item) => {
      if (item.label) {
        return cur ? cur + '、' + item.label : item.label
      }
      return cur
    }, '')
  }
}
_getRole(props.id)

// 标签信息
const tagsLabel = ref('')
const _getTags = async (id: string) => {
  const res = await getTagByUserId({
    userId: id,
    pageSize: 100
  })
  if (res.code === 200) {
    tagsLabel.value = res.data.reduce((cur, item) => {
      if (item.label) {
        return cur ? cur + '、' + item.label : item.label
      }
      return cur
    }, '')
  }
}
_getTags(props.id)
</script>

<style lang="scss" scoped>
.img-avatar {
  position: absolute;
}
</style>
