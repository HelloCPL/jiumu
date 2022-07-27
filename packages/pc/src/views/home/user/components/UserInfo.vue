<!--
  @describe: 用户详情
  @author cpl
  @update 2022-07-26 16:37:39
-->

<template>
  <Dialog title="用户信息" :show-footer="false">
    <ElRow class="pt-3 relative" v-if="userInfo">
      <ElCol :span="4" class="text-lg">基本信息</ElCol>
      <ElCol :span="20" class="text-light pt-1">
        <div class="mb-2 pl-1">
          <span class="mr-2">{{ userInfo.phone }}</span>
        </div>
        <!-- 用户基本信息 -->
        <ElRow class="mb-2">
          <ElCol :span="16" class="mb-2">
            <span class="relative">
              {{ userInfo.username }}
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
            <ElIcon size="var(--jm-font-size)">
              <Calendar />
            </ElIcon>
            {{ formatDate(userInfo.birthday, 'YYYY-MM-DD') }}
          </ElCol>
          <ElCol :span="16" class="mb-2">职业：{{ userInfo.professional }}</ElCol>
          <ElCol :span="16" class="mb-2">地址：{{ userInfo.address }}</ElCol>
          <ElCol :span="16">备注：{{ userInfo.remarks }}</ElCol>
        </ElRow>
        <div class="text-sm text-lighter pl-1">
          注册时间：{{ userInfo.createTime }} 注册终端：{{ userInfo.terminal }}
        </div>
      </ElCol>
      <ElImage :src="userInfo.avatar.filePath" class="top-3 right-3 w-16 h-16 object-cover cursor-pointer rounded-sm img-avatar" :preview-src-list="[userInfo.avatar.filePath]" v-if="userInfo.avatar"></ElImage>
    </ElRow>
    <ElRow class="pt-3" v-if="roles.length">
      <ElCol :span="4" class="text-lg">角色信息</ElCol>
      <ElCol :span="20" class="text-lighter text-sm pt-1">
        <span v-for="(item, index) in roles" :key="item.id">
          {{ index !== 0 ? '、' : '' }}{{ item.label }}
        </span>
      </ElCol>
    </ElRow>
    <ElRow class="pt-3" v-if="tags.length">
      <ElCol :span="4" class="text-lg">标签信息</ElCol>
      <ElCol :span="20" class="text-lighter text-sm pt-1">
        <span v-for="(item, index) in tags" :key="item.id">
          {{ index !== 0 ? '、' : '' }}{{ item.label }}
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

const props = defineProps({
  id: {
    type: String,
    require: true
  }
})

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

// 标签信息
const tags = ref<DataRole[]>([])
const _getTags = async (id: string) => {
  const res = await getTagByUserId({
    userId: id,
    pageSize: 100
  })
  if (res.code === 200) {
    tags.value = res.data
  }
}
_getTags(props.id)
</script>

<style lang="scss" scoped>
.img-avatar {
  position: absolute;
}
</style>
