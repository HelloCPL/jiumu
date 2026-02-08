<!--
  @describe 资源新增页面
  @author cpl
  @create 2023-02-23 10:00:21
-->

<template>
  <PageBox
    @change-btn="changeBtn"
    :footer-button-config="{
      id: form.id,
      hasDraftButton: false,
      addCode: 'pc:source:me:add:btn',
      updateCode: 'pc:source:me:update:btn',
      deleteCode: 'pc:source:me:delete:btn'
    }"
  >
    <ElForm label-position="top" :model="form" :rules="rules" ref="formRef">
      <ElFormItem label="资源标题" prop="title">
        <ElInput type="text" placeholder="请输入标题" v-model="form.title"></ElInput>
      </ElFormItem>
      <ElFormItem label="资源" prop="attachment">
        <span class="text-sm text-lighter w-20">资源类型</span>
        <ElRadioGroup v-model="form.type" @change="handleChangeType">
          <ElRadio label="701">内部文件</ElRadio>
          <ElRadio label="703">外部链接</ElRadio>
          <ElRadio label="702">外部资源</ElRadio>
        </ElRadioGroup>
        <template v-if="form.type === '701'">
          <ElRow class="w-full block mt-2">
            <Upload
              @change="handleChangeAttachment1"
              type="files_big"
              :limit="20"
              :limited="attachmentList1.length"
              class="block"
            ></Upload>
          </ElRow>
          <ShowFile v-model="attachmentList1" is-delete class="mt-2" @change="resetAttachment"></ShowFile>
        </template>
        <!--  外部文件/外部资源 -->
        <template v-else-if="form.type === '702'">
          <UploadSource :value="attachmentList2" @change="handleChangeAttachment2"> </UploadSource>
        </template>
        <!-- 外部文件/外部链接 -->
        <template v-else-if="form.type === '703'">
          <UploadSourceLink :value="attachmentList3" @change="handleChangeAttachment3"> </UploadSourceLink>
        </template>
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
import UploadSourceLink from './components/UploadSourceLink.vue'
import { useWidth } from '@/hooks/use-width'
import { computed } from 'vue'

defineOptions({
  name: 'SourceAdd'
})

const {
  formRef,
  form,
  rules,
  attachmentList1,
  attachmentList2,
  attachmentList3,
  handleChangeType,
  resetAttachment,
  handleChangeAttachment1,
  handleChangeAttachment2,
  handleChangeAttachment3,
  changeBtn
} = useIndex()

const { width } = useWidth()
const itemClass = computed(() => {
  if (width.value <= 768) {
    return 'w-full'
  }
  return 'g-w-280'
})
</script>
