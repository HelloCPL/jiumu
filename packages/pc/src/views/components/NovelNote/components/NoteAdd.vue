<!--
  @describe: 笔记添加
  @author: cpl
  @create: 2023-02-05 23:47:03
-->

<template>
  <!-- 弹窗 -->
  <ElDrawer
    v-model="isShow"
    append-to-body
    destroy-on-close
    size="35%"
    :z-index="99"
    :close-on-click-modal="false"
    :title="id ? '笔记编辑' : '笔记新增'"
    custom-class="novel-note-container"
    :with-header="true"
    :before-close="beforeClose"
  >
    <PageBox @change-btn="changeBtn" :list="btnList">
      <ElForm label-position="top" :model="form" :rules="rules" ref="formRef">
        <ElFormItem label="笔记标题" prop="title">
          <ElInput type="text" placeholder="请输入标题" v-model="form.title"></ElInput>
        </ElFormItem>
        <ElFormItem label="笔记内容" prop="content">
          <ElInput
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 10 }"
            placeholder="请输入内容"
            v-model="form.content"
          ></ElInput>
        </ElFormItem>
        <ElFormItem label="自定义标签" prop="classify">
          <SelectClassify v-model="form.classify" type="novelClassify"></SelectClassify>
        </ElFormItem>
        <ElFormItem label="排序" prop="sort" class="g-w-240">
          <InputNumber placeholder="请输入排序" v-model="form.sort"> </InputNumber>
        </ElFormItem>
        <ElFormItem label="是否公开" prop="isSecret" class="g-w-280 mr-6">
          <SelectType v-model="form.isSecret" type="isSecret"></SelectType>
        </ElFormItem>
        <ElFormItem label="备注" prop="remarks">
          <ElInput type="textarea" placeholder="请输入备注" v-model="form.remarks"></ElInput>
        </ElFormItem>
      </ElForm>
    </PageBox>
  </ElDrawer>
</template>

<script lang="ts" setup>
import PageBox from '@/components/PageBox/index.vue'
import { ElDrawer, ElForm, ElFormItem, ElInput, ElButton, ElTag } from 'element-plus'
import { novelNoteAddProps, novelNoteEmit } from '../type'
import { useAdd } from '../hooks/use-add'
import SelectClassify from '@/components/SelectClassify/index.vue'
import InputNumber from '@/components/InputNumber/index.vue'
import SelectType from '@/components/SelectType/index.vue'

const props = defineProps(novelNoteAddProps)
const emit = defineEmits(novelNoteEmit)

const { isShow, beforeClose, btnList, formRef, form, rules, changeBtn } = useAdd(props, emit)
</script>

<style lang="scss">
.novel-note-container {
  .el-drawer__header {
    margin-bottom: 0;
    padding-bottom: var(--el-drawer-padding-primary);
    border-bottom: 1px solid var(--jm-color-border);
    color: var(--jm-color-text);
  }

  .el-drawer__body {
    padding: 0;
    overflow: hidden;
  }
}
</style>
