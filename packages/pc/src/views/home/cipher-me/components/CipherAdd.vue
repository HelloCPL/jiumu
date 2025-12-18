<!--
  @describe 口令新增或编辑
  @author cpl
  @create 2023-03-24 10:13:27
-->

<template>
  <Dialog :title="title" @close="$emit('close')" @confirm="confirm">
    <ElForm :model="form" :rules="rules" ref="formRef" :label-width="getPx(100)" class="g-popup">
      <ElFormItem label="标题" prop="title" class="g-w-320">
        <ElInput type="text" placeholder="请输入标题" v-model="form.title"></ElInput>
      </ElFormItem>
      <ElFormItem label="账号" prop="account" class="g-w-320">
        <ElInput placeholder="请输入账号" v-model="form.account" autocomplete="off"></ElInput>
      </ElFormItem>
      <ElFormItem label="密码" prop="cipher" class="g-w-320">
        <ElInput
          type="password"
          placeholder="请输入密码"
          v-model="form.cipher"
          autocomplete="new-password"
          show-password
        ></ElInput>
      </ElFormItem>
      <ElFormItem label="加密等级" prop="type" class="g-w-320 mr-6">
        <SelectType v-model="form.type" type="type" parent-code="800" show-type="radio"></SelectType>
        <div class="mt-2 text-sm text-lighter" v-if="form.type === '802' && !isExistCode">
          <span>加权等级需要先添加</span>
          <span class="pl-1 text-primary cursor-pointer" @click="emit('toAddCipherCode')">口令code</span>
        </div>
      </ElFormItem>
      <ElFormItem label="自定义标签" prop="classify">
        <SelectClassify v-model="form.classify" type="cipherClassify"></SelectClassify>
      </ElFormItem>
      <ElFormItem label="排序" prop="sort" class="g-w-320">
        <InputNumber placeholder="请输入排序" v-model="form.sort"> </InputNumber>
      </ElFormItem>
    </ElForm>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from '@/components/Dialog/index.vue'
import { ElForm, ElFormItem, ElInput } from 'element-plus'
import { cipherAddProps, cipherAddEmits } from './type'
import { useCipherAdd } from '../hooks/use-cipher-add'
import { getPx } from '@/utils/tools'
import SelectType from '@/components/SelectType/index.vue'
import SelectClassify from '@/components/SelectClassify/index.vue'
import InputNumber from '@/components/InputNumber/index.vue'
import { useCheckCipherCode } from '../hooks/use-index'

const props = defineProps(cipherAddProps)
const emit = defineEmits(cipherAddEmits)

const { isExistCode } = useCheckCipherCode()

const { title, form, formRef, rules, confirm } = useCipherAdd(props, emit)
</script>
