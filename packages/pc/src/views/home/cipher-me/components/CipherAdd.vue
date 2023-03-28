<!--
  @describe 口令新增或编辑
  @author cpl
  @create 2023-03-24 10:13:27
-->

<template>
  <Dialog :title="title" @close="$emit('close')" @confirm="confirm" class-content="pl-4 py-4">
    <ElForm :model="form" :rules="rules" ref="formRef" :label-width="getPx(100)" class="g-popup">
      <ElFormItem label="标题" prop="title" class="g-w-320">
        <ElInput type="text" placeholder="请输入标题" v-model="form.title"></ElInput>
      </ElFormItem>
      <ElFormItem label="账号" prop="account" class="g-w-320">
        <ElInput
          :type="form.type === '802' ? 'password' : 'text'"
          placeholder="请输入账号"
          v-model="form.account"
          autocomplete="off"
          :readonly="isReadonly"
          :show-password="showPassword"
        ></ElInput>
      </ElFormItem>
      <ElFormItem label="密码" prop="cipher" class="g-w-320">
        <ElInput
          type="password"
          placeholder="请输入密码"
          v-model="form.cipher"
          autocomplete="off"
          :readonly="isReadonly"
          :show-password="showPassword"
        ></ElInput>
      </ElFormItem>
      <ElFormItem label="加密等级" prop="type" class="g-w-320 mr-6">
        <SelectType
          :model-value="form.type"
          @update:model-value="updateType"
          type="type"
          parent-code="800"
          show-type="radio"
        ></SelectType>
        <div class="mt-2 text-sm text-lighter">
          <span>加权等级需要先添加</span>
          <span class="text-primary cursor-pointer" @click="handleShowCode">口令code</span>
        </div>
      </ElFormItem>
      <ElFormItem label="自定义标签" prop="classify">
        <SelectClassify v-model="form.classify" type="cipherClassify"></SelectClassify>
      </ElFormItem>
      <ElFormItem label="排序" prop="sort" class="g-w-320">
        <InputNumber placeholder="请输入排序" v-model="form.sort"> </InputNumber>
      </ElFormItem>
    </ElForm>
    <CipherCodeAdd v-if="show" :type="typeCode" @close="handleConfirmCode"></CipherCodeAdd>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from '@/components/Dialog/index.vue'
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import { cipherAddProps, cipherAddEmits } from './type'
import { useCipherAdd } from '../hooks/use-cipher-add'
import { getPx } from '@/utils/tools'
import SelectType from '@/components/SelectType/index.vue'
import SelectClassify from '@/components/SelectClassify/index.vue'
import InputNumber from '@/components/InputNumber/index.vue'
import CipherCodeAdd from './CipherCodeAdd.vue'

const props = defineProps(cipherAddProps)
const emit = defineEmits(cipherAddEmits)

const {
  show,
  handleConfirmCode,
  typeCode,
  updateType,
  handleShowCode,
  title,
  formRef,
  form,
  rules,
  confirm,
  isReadonly,
  showPassword
} = useCipherAdd(props, emit)
</script>
