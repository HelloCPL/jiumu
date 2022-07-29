<!--
  @describe: 角色新增或编辑
  @author cpl
  @update 2022-07-25 16:49:08
-->

<template>
  <Dialog :title="title" @close="$emit('close')" @confirm="confirm" class-content="pl-4">
    <ElForm :model="form" :rules="rules" ref="formRef" label-width="80px" class="g-popup">
      <ElFormItem label="code" prop="code" class="g-w-320">
        <ElInput type="text" placeholder="请输入code" v-model="form.code"></ElInput>
      </ElFormItem>
      <ElFormItem label="角色" prop="label" class="g-w-320">
        <ElInput type="text" placeholder="请输入角色" v-model="form.label"></ElInput>
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
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import { useRoleAdd } from '../hooks/use-role-add'
import InputNumber from '@/components/InputNumber/index.vue'

const emit = defineEmits(['close', 'confirm'])
type Props = {
  id?: string
}
const props = defineProps<Props>()
const { title, formRef, form, rules, confirm } = useRoleAdd(props, emit)
</script>
