<!--
  @describe: 我的问答新增或编辑
  @author: cpl
  @create: 2023-01-12 14:36:27
-->

<template>
  <PageBox
    @change-btn="changeBtn"
    :id="form.id"
    :is-draft="form.isDraft"
    add-code="pc:question:me:add:btn"
    update-code="pc:question:me:update:btn"
    delete-code="pc:question:me:delete:btn"
  >
    <ElForm label-position="top" :model="form" :rules="rules" ref="formRef">
      <ElFormItem label="问答标题" prop="title">
        <ElInput type="text" placeholder="请输入标题" v-model="form.title"></ElInput>
      </ElFormItem>
      <ElFormItem label="问答内容" prop="content">
        <EditorMd v-model="form.content" @change="handleChangeContent" @save="handleSaveContent"></EditorMd>
      </ElFormItem>
      <ElRow class="flex flex-wrap gap-x-6">
        <ElFormItem label="是否公开" prop="isSecret" :class="itemClass">
          <SelectType v-model="form.isSecret" type="isSecret"></SelectType>
        </ElFormItem>
        <ElFormItem label="排序" prop="sort" :class="itemClass">
          <InputNumber placeholder="请输入排序" v-model="form.sort"> </InputNumber>
        </ElFormItem>
      </ElRow>
      <ElFormItem label="自定义标签" prop="classify">
        <SelectClassify v-model="form.classify" type="questionClassify"></SelectClassify>
      </ElFormItem>
      <ElFormItem label="备注" prop="remarks">
        <ElInput type="textarea" placeholder="请输入备注" v-model="form.remarks"></ElInput>
      </ElFormItem>
    </ElForm>
  </PageBox>
  <div></div>
</template>

<script lang="ts" setup>
import PageBox from '@/components/PageBox/index.vue'
import { ElForm, ElFormItem, ElInput, ElRow } from 'element-plus'
import { useIndex } from './hooks/use-index'
import SelectType from '@/components/SelectType/index.vue'
import InputNumber from '@/components/InputNumber/index.vue'
import SelectClassify from '@/components/SelectClassify/index.vue'
import EditorMd from '@/components/Editor/components/EditorMd/index.vue'
import { useWidth } from '@/hooks/use-width'
import { computed } from 'vue'

defineOptions({
  name: 'QuestionAdd'
})

const { formRef, form, rules, handleChangeContent, changeBtn, handleSaveContent } = useIndex()

const { width } = useWidth()
const itemClass = computed(() => {
  if (width.value <= 768) {
    return 'w-full'
  }
  return 'g-w-280'
})
</script>
