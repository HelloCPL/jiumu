<!--
  @describe: 标签新增或编辑
  @author cpl
  @update 2022-07-27 10:26:05
-->

<template>
  <Dialog :title="title" @close="$emit('close')" @confirm="confirm" class-content="pl-4">
    <ElForm :model="form" :rules="rules" ref="formRef" label-width="80px" class="g-popup">
      <ElFormItem label="code" prop="code">
        <ElInput type="text" placeholder="请输入code" v-model="form.code" class="g-w-240"></ElInput>
      </ElFormItem>
      <ElFormItem label="标签" prop="label" class="g-w-320">
        <ElInput type="text" placeholder="请输入标签" v-model="form.label"></ElInput>
      </ElFormItem>
      <ElFormItem label="父级标签" prop="parentCode" class="g-w-320">
        <ElCascader
          :options="options"
          :props="_props"
          clearable
          placeholder="请选择父级"
          v-model="form.parentCode"
        ></ElCascader>
      </ElFormItem>
      <ElFormItem label="排序" prop="sort" class="g-w-320">
        <InputNumber placeholder="请输入排序" v-model="form.sort"> </InputNumber>
      </ElFormItem>
      <ElFormItem label="备注" prop="remarks">
        <ElInput type="textarea" placeholder="请输入备注" v-model="form.remarks"></ElInput>
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
import { ElForm, ElFormItem, ElInput, ElButton, ElCascader } from 'element-plus'
import { useTagAdd } from '../hooks/use-tag-add'
import InputNumber from '@/components/InputNumber/index.vue'
import { tagAddProps, tagAddEmits } from './type'

const emit = defineEmits(tagAddEmits)
const props = defineProps(tagAddProps)

const { title, formRef, form, rules, confirm } = useTagAdd(props, emit)

const _props = {
  expandTrigger: 'hover',
  checkStrictly: true,
  emitPath: false,
  value: 'code'
}
</script>
