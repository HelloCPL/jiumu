<!--
  @describe: 用户基本信息
  @author cpl
  @update 2022-07-24 17:38:42
-->

<template>
  <ElRow class="relative mb-2 p-1 hover:bg-primary-1 base-wrapper" :class="{ 'bg-primary-1': showEdit }">
    <!-- 基本信息展示 -->
    <template v-if="!showEdit">
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
      <span class="absolute right-1 bottom-1 text-sm text-primary cursor-pointer update-word" @click="toEdit"
        >修改</span
      >
    </template>
    <!-- 基本信息修改 -->
    <template v-else>
      <ElForm :model="form" label-width="70px" size="small" class="mt-2 pr-8 w-full" @submit.native.prevent>
        <ElFormItem label="昵称">
          <ElInput v-model="form.username"></ElInput>
        </ElFormItem>
        <ElFormItem label="性别">
          <ElRadioGroup v-model="form.sex">
            <ElRadio label="201">男</ElRadio>
            <ElRadio label="202">女</ElRadio>
          </ElRadioGroup>
        </ElFormItem>
        <ElFormItem label="出生日期">
          <ElDatePicker
            v-model="form.birthday"
            type="date"
            placeholder="请选择日期"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </ElFormItem>
        <ElFormItem label="职业">
          <ElInput v-model="form.professional"></ElInput>
        </ElFormItem>
        <ElFormItem label="地址">
          <ElInput v-model="form.address" type="textarea"></ElInput>
        </ElFormItem>
        <ElFormItem label="备注">
          <ElInput v-model="form.remarks" type="textarea"></ElInput>
        </ElFormItem>
        <!-- <ElFormItem>
          <ElButton type="primary" size="small" @click="save">保存</ElButton>
          <ElButton size="small" @click="showEdit = false">取消</ElButton>
        </ElFormItem> -->
      </ElForm>
    </template>
  </ElRow>
</template>

<script lang="ts" setup>
import {
  ElRow,
  ElCol,
  ElIcon,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadioGroup,
  ElRadio,
  ElDatePicker,
  ElButton
} from 'element-plus'
import { Calendar } from '@element-plus/icons-vue'
import { formatDate } from '@jiumu/utils'
import { useUserStore } from '@/store'
import { reactive, ref } from 'vue'
import { updateUserBaseSelf } from '@/api/user'

const userStore = useUserStore()
// const { userInfo } = storeToRefs(userStore)
const userInfo = <DataUserInfo>userStore.userInfo

const showEdit = ref<boolean>(false)

const form = reactive({
  username: userInfo.username,
  sex: userInfo.sex,
  birthday: userInfo.birthday,
  professional: userInfo.professional,
  address: userInfo.address,
  remarks: userInfo.remarks
})

// 去修改
const toEdit = () => {
  form.username = userInfo.value.username
  form.sex = userInfo.value.sex
  form.birthday = userInfo.value.birthday
  form.professional = userInfo.value.professional
  form.address = userInfo.value.address
  form.remarks = userInfo.value.remarks
  showEdit.value = true
}

const save = async () => {
  const params: ParamsUpdateUserBaseSelf = {
    username: form.username,
    sex: form.sex,
    birthday: form.birthday,
    professional: form.professional,
    address: form.address,
    remarks: form.remarks
  }
  const res = await updateUserBaseSelf(params)
  if (res.code === 200) {
    userStore.updateUser('1')
  }
  showEdit.value = false
}
</script>

<style lang="scss" scoped>
.base-wrapper {
  .icon-sex {
    right: -1rem;
  }

  .update-word {
    display: none;
  }

  &:hover .update-word {
    display: block;
  }
}
</style>

<style lang="scss">
.base-wrapper {
  .el-form-item {
    margin-bottom: 14px;
  }
}
</style>
