<!--
  @describe: 权限新增或编辑
  @author cpl
  @update 2022-07-25 16:49:08
-->

<template>
  <Dialog :title="title" @close="$emit('close')" @confirm="confirm" class-content="pl-4">
    <ElForm :model="form" :rules="rules" ref="formRef" label-width="80px" class="g-popup">
      <ElFormItem label="code" prop="code" class="g-w-320">
        <ElInput type="text" placeholder="请输入code" v-model="form.code"></ElInput>
        <span class="text-sm text-lighter mt-1">code格式建议：xxx:xx:x</span>
      </ElFormItem>
      <ElFormItem label="权限" prop="label" class="g-w-320">
        <ElInput type="text" placeholder="请输入权限" v-model="form.label"></ElInput>
      </ElFormItem>
      <ElFormItem label="排序" prop="sort" class="g-w-320">
        <InputNumber type="number" placeholder="请输入排序" v-model="form.sort"></InputNumber>
      </ElFormItem>
      <ElFormItem label="关联接口" prop="href" class="g-w-320">
        <ElInput type="text" placeholder="请输入关联接口" v-model="form.href"></ElInput>
        <span class="text-sm text-lighter mt-1">如与接口有关联的权限请填写此项</span>
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
import { usePermissionAdd } from '../hooks/use-permission-add'
import InputNumber from '@/components/InputNumber/index.vue'

const emit = defineEmits(['close', 'confirm'])
type Props = {
  id?: string
}
const props = defineProps<Props>()
const { title, formRef, form, rules, confirm } = usePermissionAdd(props, emit)
</script>

<style lang="scss" scoped></style>
