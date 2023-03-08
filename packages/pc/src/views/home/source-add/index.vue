<!--
  @describe 资源新增页面
  @author cpl
  @create 2023-02-23 10:00:21
-->

<template>
  <PageBox @change-btn="changeBtn" :list="btnList">
    <ElForm label-position="top" :model="form" :rules="rules" ref="formRef">
      <ElFormItem label="资源标题" prop="title">
        <ElInput type="text" placeholder="请输入标题" v-model="form.title"></ElInput>
      </ElFormItem>
      <ElFormItem label="资源" prop="attachment">
        <ElRadioGroup v-model="form.type" @change="handleChangeType">
          <ElRadio label="701">内部文件</ElRadio>
          <ElRadio label="702">外部资源</ElRadio>
          <ElRadio label="703">外部链接</ElRadio>
        </ElRadioGroup>
        <template v-if="form.type === '701'">
          <ElRow class="w-full block mt-2">
            <Upload
              v-model="attachmentList1"
              @change="handleChangeAttachment1"
              type="files_big"
              :limit="9"
              :limited="attachmentList1.length"
              class="block"
            ></Upload>
          </ElRow>
          <ShowFile v-model="attachmentList1" is-delete class="mt-2" @change="resetAttachment"></ShowFile>
        </template>
        <!-- 非内部文件 -->
        <template v-else>
          <UploadSource></UploadSource>
        </template>
      </ElFormItem>
      <ElRow class="flex">
        <ElFormItem label="是否公开" prop="isSecret" class="g-w-280 mr-6">
          <SelectType v-model="form.isSecret" type="isSecret"></SelectType>
        </ElFormItem>
        <ElFormItem label="排序" prop="sort" class="g-w-240">
          <InputNumber placeholder="请输入排序" v-model="form.sort"> </InputNumber>
        </ElFormItem>
      </ElRow>
      <ElFormItem label="自定义标签" prop="classify">
        <SelectClassify v-model="form.classify" type="sourceClassify"></SelectClassify>
      </ElFormItem>
      <ElFormItem label="备注" prop="remarks">
        <ElInput type="textarea" placeholder="请输入备注" v-model="form.remarks"></ElInput>
      </ElFormItem>
    </ElForm>
  </PageBox>
</template>

<script lang="ts" setup>
import PageBox from '@/components/PageBox/index.vue'
import { ElForm, ElFormItem, ElInput, ElRow, ElRadioGroup, ElRadio } from 'element-plus'
import { useIndex } from './hooks/use-index'
import SelectType from '@/components/SelectType/index.vue'
import InputNumber from '@/components/InputNumber/index.vue'
import SelectClassify from '@/components/SelectClassify/index.vue'
import Upload from '@/components/Upload/index.vue'
import ShowFile from '@/components/ShowFile/index.vue'
import UploadSource from './components/UploadSource.vue'

defineOptions({
  name: 'SourceAdd'
})

const {
  btnList,
  formRef,
  form,
  rules,
  attachmentList1,
  attachmentList2,
  attachmentList3,
  handleChangeType,
  resetAttachment,
  handleChangeAttachment1,
  changeBtn
} = useIndex()
</script>
