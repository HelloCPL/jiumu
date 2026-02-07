<!--
  @describe: 连载章节新增或编辑
  @author: cpl
  @create: 2023-01-31 12:02:57
-->

<template>
  <PageBox
    @change-btn="changeBtn"
    :footer-button-config="{
      id,
      isDraft: form.isDraft,
      addCode: 'pc:novel:chapter:add:btn',
      updateCode: 'pc:novel:chapter:update:btn',
      deleteCode: 'pc:novel:chapter:delete:btn'
    }"
  >
    <ElForm label-position="top" :model="form" :rules="rules" ref="formRef">
      <ElFormItem label="标题" prop="name">
        <ElInput type="text" placeholder="请输入标题" v-model="form.title"></ElInput>
      </ElFormItem>
      <ElFormItem label="文章内容" prop="content">
        <EditorWang
          v-model="form.content"
          @change="handleChangeContent"
          @save="handleSaveContent"
          :toolbar-config="toolbarConfig"
        ></EditorWang>
      </ElFormItem>
      <ElRow class="flex flex-wrap gap-x-6">
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
    <Note
      :root-id="novelId"
      :target-id="id"
      :title="form.title"
      v-if="id && $route.name === 'NovelChapterAdd'"
    ></Note>
  </PageBox>
</template>

<script lang="ts" setup>
import PageBox from '@/components/PageBox/index.vue'
import { ElForm, ElFormItem, ElInput, ElRow } from 'element-plus'
import { useIndex } from './hooks/use-index'
import SelectType from '@/components/SelectType/index.vue'
import InputNumber from '@/components/InputNumber/index.vue'
import Note from '@/components/Note/index.vue'
import EditorWang from '@/components/Editor/components/EditorWang/index.vue'
import { useWidth } from '@/hooks/use-width'
import { computed } from 'vue'

defineOptions({
  name: 'NovelChapterAdd'
})

const toolbarConfig = {
  toolbarKeys: ['undo', 'redo', '|', 'headerSelect', 'fontSize', '|', 'MyButtonTitle', 'MyButtonFullScreen']
}

const { id, novelId, formRef, form, rules, handleChangeContent, changeBtn, handleSaveContent } = useIndex()

const { width } = useWidth()
const itemClass = computed(() => {
  if (width.value <= 768) {
    return 'w-full'
  }
  return 'g-w-280'
})
</script>
