<!--
  @describe: 连载新增或编辑
  @author: cpl
  @create: 2023-01-20 18:27:32
-->

<template>
  <PageBox @change-btn="changeBtn" :list="list">
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
      <ElRow class="flex">
        <ElFormItem label="作者" prop="author" class="g-w-280 mr-6">
          <ElInput type="text" placeholder="请输入连载名称" v-model="form.author"></ElInput>
          <span class="text-sm text-lighter">此名称为该连载的笔名</span>
        </ElFormItem>
        <ElFormItem label="自定义标签" prop="classify">
          <SelectClassify v-model="form.classify" type="novelClassify"></SelectClassify>
        </ElFormItem>
      </ElRow>
      <ElRow class="flex">
        <ElFormItem label="类型" prop="type" class="g-w-280 mr-6">
          <SelectType v-model="form.type" type="type" parent-code="600"></SelectType>
        </ElFormItem>
        <ElFormItem label="是否公开" prop="isSecret" class="g-w-280 mr-6">
          <SelectType v-model="form.isSecret" type="isSecret"></SelectType>
        </ElFormItem>
        <ElFormItem label="排序" prop="sort" class="g-w-240">
          <InputNumber placeholder="请输入排序" v-model="form.sort"> </InputNumber>
        </ElFormItem>
      </ElRow>
      <ElFormItem label="备注" prop="remarks">
        <ElInput type="textarea" placeholder="请输入备注" v-model="form.remarks"></ElInput>
      </ElFormItem>
    </ElForm>
    <!-- 笔记  -->
    <NovelNote :id="form.id" type="504" :share="form.id" v-if="form.id"></NovelNote>
  </PageBox>
</template>

<script lang="ts" setup>
import PageBox from '@/components/PageBox/index.vue'
import { ElForm, ElFormItem, ElInput, ElRow } from 'element-plus'
import { useIndex } from './hooks/use-index'
import SelectType from '@/components/SelectType/index.vue'
import InputNumber from '@/components/InputNumber/index.vue'
import SelectClassify from '@/components/SelectClassify/index.vue'
import NovelNote from '@/views/components/NovelNote/index.vue'

defineOptions({
  name: 'NovelAdd'
})

const { list, formRef, form, rules, changeBtn } = useIndex()
</script>
