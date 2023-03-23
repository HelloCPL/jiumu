<!--
  @describe: 自定义标签新增
  @author: cpl
  @create: 2022-10-13 23:39:33
-->

<template>
  <Dialog :title="title" @close="$emit('close')" @confirm="confirm" class-content="pl-4">
    <ElForm :model="form" :rules="rules" ref="formRef" :label-width="getPx(80)" class="g-popup">
      <ElFormItem label="标签" prop="label" class="g-w-320">
        <ElInput type="text" placeholder="请输入标签" v-model="form.label"></ElInput>
      </ElFormItem>
      <ElFormItem label="排序" prop="sort" class="g-w-320">
        <InputNumber placeholder="请输入排序" v-model="form.sort"> </InputNumber>
      </ElFormItem>
      <ElFormItem label="类型" prop="type" class="g-w-320">
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
      <ElButton type="primary" @click="confirm">保存</ElButton>
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
