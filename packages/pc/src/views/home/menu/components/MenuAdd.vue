<!--
  @describe: 菜单新增或编辑
  @author cpl
  @update 2022-07-27 10:26:05
-->

<template>
  <Dialog :title="title" @close="$emit('close')" @confirm="confirm" class-content="pl-4">
    <ElForm :model="form" :rules="rules" ref="formRef" :label-width="getPx(80)" class="g-popup">
      <ElFormItem label="code" prop="code">
        <ElInput type="text" placeholder="请输入code" v-model="form.code" class="g-w-240"></ElInput>
        <span class="mt-1 text-sm text-lighter">最外层菜单的code必须与对应页面路由的name保持一致</span>
      </ElFormItem>
      <ElFormItem label="菜单" prop="label" class="g-w-320">
        <ElInput type="text" placeholder="请输入菜单" v-model="form.label"></ElInput>
      </ElFormItem>
      <ElFormItem label="父级菜单" prop="parentCode" class="g-w-320">
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
import { useMenuAdd } from '../hooks/use-menu-add'
import InputNumber from '@/components/InputNumber/index.vue'
import { menuAddProps, menuAddEmits } from './type'
import { getPx } from '@/utils/tools'

const emit = defineEmits(menuAddEmits)
const props = defineProps(menuAddProps)

const { title, formRef, form, rules, confirm } = useMenuAdd(props, emit)

const _props = {
  expandTrigger: 'hover',
  checkStrictly: true,
  emitPath: false,
  value: 'code'
}
</script>
