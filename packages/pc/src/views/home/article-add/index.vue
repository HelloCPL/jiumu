<!--
  @describe: 我的文章添加页面
  @author: cpl
  @create: 2022-10-15 19:24:10
-->

<template>
  <PageBox
    @change-btn="changeBtn"
    :footer-button-config="{
      id: form.id,
      isDraft: form.isDraft,
      addCode: 'pc:article:me:add:btn',
      updateCode: 'pc:article:me:update:btn',
      deleteCode: 'pc:article:me:delete:btn'
    }"
  >
    <ElForm label-position="top" :model="form" :rules="rules" ref="formRef">
      <ElFormItem label="文章标题" prop="title">
        <ElInput type="text" placeholder="请输入标题" v-model="form.title"></ElInput>
      </ElFormItem>
      <ElFormItem label="文章内容" prop="content">
        <Editor
          v-model:type="form.contentType"
          v-model="form.content"
          @change="handleChangeContent"
          @save="handleSaveContent"
        ></Editor>
      </ElFormItem>
      <ElRow class="flex flex-wrap gap-x-6">
        <ElFormItem label="文章类型" prop="type" :class="itemClass">
          <SelectType v-model="form.type" type="type" parent-code="300"></SelectType>
        </ElFormItem>
        <ElFormItem label="是否公开" prop="isSecret" :class="itemClass">
          <SelectType v-model="form.isSecret" type="isSecret"></SelectType>
        </ElFormItem>
        <ElFormItem label="排序" prop="sort" :class="itemClass">
          <InputNumber placeholder="请输入排序" v-model="form.sort"> </InputNumber>
        </ElFormItem>
      </ElRow>
      <ElFormItem label="自定义标签" prop="classify">
        <SelectClassify v-model="form.classify" type="articleClassify"></SelectClassify>
      </ElFormItem>
      <ElFormItem label="封面图" prop="coverImg">
        <ElRow>
          <Upload
            v-model="coverImgList"
            @change="handleChangeCoverImg"
            :limit="2"
            :limited="coverImgList.length"
            class="mr-6"
          ></Upload>
          <ShowImage v-model="coverImgList" is-delete @change="handleDeleteCoverImg"></ShowImage>
        </ElRow>
      </ElFormItem>
      <ElFormItem label="附件" prop="attachment">
        <ElRow>
          <Upload
            v-model="attachmentList"
            @change="handleChangeAttachment"
            type="files"
            :limit="5"
            :limited="attachmentList.length"
            class="mb-4"
          ></Upload>
          <ShowFile v-model="attachmentList" is-delete @change="handleDeleteAttachment"></ShowFile>
        </ElRow>
      </ElFormItem>
      <ElFormItem label="备注" prop="remarks">
        <ElInput type="textarea" placeholder="请输入备注" v-model="form.remarks"></ElInput>
      </ElFormItem>
    </ElForm>
  </PageBox>
</template>

<script lang="ts" setup>
import PageBox from '@/components/PageBox/index.vue'
import { ElForm, ElFormItem, ElInput, ElRow } from 'element-plus'
import { useIndex } from './hooks/use-index'
import Editor from '@/components/Editor/index.vue'
import SelectType from '@/components/SelectType/index.vue'
import InputNumber from '@/components/InputNumber/index.vue'
import Upload from '@/components/Upload/index.vue'
import ShowImage from '@/components/ShowImage/index.vue'
import ShowFile from '@/components/ShowFile/index.vue'
import SelectClassify from '@/components/SelectClassify/index.vue'
import { useWidth } from '@/hooks/use-width'
import { computed } from 'vue'

defineOptions({
  name: 'ArticleAdd'
})

const {
  formRef,
  form,
  rules,
  handleChangeContent,
  coverImgList,
  handleChangeCoverImg,
  handleDeleteCoverImg,
  attachmentList,
  handleChangeAttachment,
  handleDeleteAttachment,
  changeBtn,
  handleSaveContent
} = useIndex()

const { width } = useWidth()
const itemClass = computed(() => {
  if (width.value <= 768) {
    return 'w-full'
  }
  return 'g-w-280'
})
</script>
