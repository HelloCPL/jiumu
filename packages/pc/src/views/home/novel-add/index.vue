<!--
  @describe: 连载新增或编辑
  @author: cpl
  @create: 2023-01-20 18:27:32
-->

<template>
  <PageBox
    @change-btn="changeBtn"
    :footer-button-config="{
      id: form.id,
      isDraft: form.isDraft,
      addCode: 'pc:novel:me:add:btn',
      updateCode: 'pc:novel:me:update:btn',
      deleteCode: 'pc:novel:me:delete:btn'
    }"
  >
    <ElForm label-position="top" :model="form" :rules="rules" ref="formRef">
      <ElFormItem label="连载名称" prop="name">
        <ElInput type="text" placeholder="请输入连载名称" v-model="form.name"></ElInput>
      </ElFormItem>
      <ElFormItem label="简介" prop="introduce">
        <ElInput
          type="textarea"
          placeholder="请输入相关简介"
          :autosize="{ minRows: 5, maxRows: 8 }"
          v-model="form.introduce"
        ></ElInput>
      </ElFormItem>
      <ElFormItem label="自定义标签" prop="classify">
        <SelectClassify v-model="form.classify" type="novelClassify"></SelectClassify>
      </ElFormItem>
      <ElRow class="flex flex-wrap gap-x-6">
        <ElFormItem label="作者" prop="author" :class="itemClass">
          <ElInput type="text" placeholder="请输入连载名称" v-model="form.author"></ElInput>
          <span class="text-sm text-lighter">此名称为该连载的笔名</span>
        </ElFormItem>
        <ElFormItem label="类型" prop="type" :class="itemClass">
          <SelectType v-model="form.type" type="type" parent-code="600"></SelectType>
        </ElFormItem>
        <ElFormItem label="是否公开" prop="isSecret" :class="itemClass">
          <SelectType v-model="form.isSecret" type="isSecret"></SelectType>
        </ElFormItem>
        <ElFormItem label="排序" prop="sort" :class="itemClass">
          <InputNumber placeholder="请输入排序" v-model="form.sort"> </InputNumber>
        </ElFormItem>
      </ElRow>
      <ElFormItem label="备注" prop="remarks">
        <ElInput type="textarea" placeholder="请输入备注" v-model="form.remarks"></ElInput>
      </ElFormItem>
    </ElForm>
    <!-- 笔记  -->
    <Note :root-id="form.id" :target-id="form.id" :title="form.name" v-if="form.id"></Note>
  </PageBox>
</template>

<script lang="ts" setup>
import PageBox from '@/components/PageBox/index.vue'
import { ElForm, ElFormItem, ElInput, ElRow } from 'element-plus'
import { useIndex } from './hooks/use-index'
import SelectType from '@/components/SelectType/index.vue'
import InputNumber from '@/components/InputNumber/index.vue'
import SelectClassify from '@/components/SelectClassify/index.vue'
import { useWidth } from '@/hooks/use-width'
import { computed } from 'vue'
import Note from '@/components/Note/index.vue'

defineOptions({
  name: 'NovelAdd'
})

const { formRef, form, rules, changeBtn } = useIndex()

const { width } = useWidth()
const itemClass = computed(() => {
  if (width.value <= 768) {
    return 'w-full'
  }
  return 'g-w-280'
})
</script>
