<!--
  @describe 本用户基础信息编辑
  @author cpl
  @create 2023-03-22 11:42:07
-->

<template>
  <Dialog
    title="个人信息编辑"
    @close="$emit('close')"
    @confirm="confirm"
    width="500px"
    class-content="pl-4 pb-4 edit-base-info-wrapper"
  >
    <ElForm :model="form" ref="formRef" :label-width="getPx(80)" class="g-popup">
      <ElFormItem label="昵称" prop="username" class="g-w-320">
        <ElInput type="text" placeholder="请输入昵称" v-model="form.username"></ElInput>
      </ElFormItem>
      <ElFormItem label="性别" prop="sex">
        <SelectType
          v-model="form.sex"
          parent-code="200"
          show-type="radio"
          filter-codes="201,202"
        ></SelectType>
      </ElFormItem>
      <ElFormItem label="生日" prop="birthday" class="g-w-320">
        <ElDatePicker
          v-model="form.birthday"
          type="date"
          placeholder="请选择生日日期"
          value-format="YYYY-MM-DD HH:mm:ss"
        ></ElDatePicker>
      </ElFormItem>
      <ElFormItem label="职业" prop="professional" class="g-w-320">
        <ElInput type="text" placeholder="请输入职业" v-model="form.professional"></ElInput>
      </ElFormItem>
      <ElFormItem label="地址" prop="address" class="g-w-320">
        <ElInput type="text" placeholder="请输入地址" v-model="form.address"></ElInput>
      </ElFormItem>
      <ElFormItem label="备注" prop="remarks" class="g-w-320">
        <ElInput type="text" placeholder="请输入备注" v-model="form.remarks"></ElInput>
      </ElFormItem>
    </ElForm>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from '@/components/Dialog/index.vue'
import { ElForm, ElFormItem, ElInput, ElDatePicker } from 'element-plus'
import { reactive, ref } from 'vue'
import { useUserStore } from '@/store'
import { FormInstance } from 'element-plus'
import { debounce } from 'lodash-es'
import { updateUserBaseSelf } from '@/api/user'
import { Message } from '@/utils/interaction'
import SelectType from '@/components/SelectType/index.vue'
import { getPx } from '@/utils/tools'

const emit = defineEmits({
  confirm: () => true,
  close: () => true
})

const formRef = ref<FormInstance>()
const form = reactive<ParamsUpdateUserBaseSelf>({
  username: '',
  sex: '',
  birthday: '',
  professional: '',
  address: '',
  remarks: ''
})
const userStore = useUserStore()
if (userStore.userInfo) {
  form.username = userStore.userInfo.username
  form.sex = userStore.userInfo.sex
  form.birthday = userStore.userInfo.birthday
  form.professional = userStore.userInfo.professional
  form.address = userStore.userInfo.address
  form.remarks = userStore.userInfo.remarks
}

// 修改
const _update = debounce(async (params: ParamsUpdateUserBaseSelf) => {
  const res = await updateUserBaseSelf(params)
  if (res.code === 200) {
    Message({
      message: res.message,
      type: 'success'
    })
    userStore.updateUser('1')
    emit('close')
  }
}, 300)

const confirm = () => {
  if (!formRef.value) return
  formRef.value.validate((valid) => {
    if (valid) {
      const params: ParamsUpdateUserBaseSelf = {
        ...form
      }
      console.log(111, params)
      _update(params)
    }
  })
}
</script>

<style lang="scss">
.edit-base-info-wrapper {
  .el-date-editor.el-input {
    width: 100%;
  }
  .el-input__wrapper {
    width: 100%;
  }
}
</style>
