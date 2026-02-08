<!--
  @describe: 自定义标签新增
  @author: cpl
  @create: 2022-10-13 23:39:33
-->

<template>
  <Dialog :title="title" @close="$emit('close')" @confirm="confirm">
    <ElForm :model="form" :rules="rules" ref="formRef" :label-width="getPx(80)" class="pr-4">
      <ElFormItem label="标签" prop="label">
        <ElInput type="text" placeholder="请输入标签" v-model="form.label"></ElInput>
      </ElFormItem>
      <ElFormItem label="排序" prop="sort">
        <InputNumber placeholder="请输入排序" v-model="form.sort"> </InputNumber>
      </ElFormItem>
      <ElFormItem label="类型" prop="type">
        <ElAutocomplete
          placeholder="请输入角色"
          value-key="type"
          clearable
          v-model="form.type"
          :fetch-suggestions="fetchSuggestionType"
        ></ElAutocomplete>
      </ElFormItem>
    </ElForm>
    <template #footer>
      <ElButton @click="$emit('close')">取消</ElButton>
      <ElButton
        type="primary"
        @click="confirm"
        v-permission="{ code: ['pc:classify:me:add:btn', 'pc:classify:me:update:btn'], rule: 'or' }"
        >保存</ElButton
      >
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from '@/components/Dialog/index.vue'
import { useClassifyMeAdd } from '../hooks/use-classify-me-add'
import { classifyMeAddProps, classifyMeAddEmits } from './type'
import { ElForm, ElFormItem, ElInput, ElAutocomplete, ElButton } from 'element-plus'
import InputNumber from '@/components/InputNumber/index.vue'
import { getPx } from '@/utils/tools'

const props = defineProps(classifyMeAddProps)
const emit = defineEmits(classifyMeAddEmits)

const { title, formRef, form, rules, fetchSuggestionType, confirm } = useClassifyMeAdd(props, emit)
</script>
