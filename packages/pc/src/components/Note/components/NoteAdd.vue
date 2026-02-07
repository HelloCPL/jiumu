<!--
  @cpl
  @create 2024-09-01 16:46:26
  @description 笔记新增
-->

<template>
  <ElDrawer
    :model-value="true"
    append-to-body
    destroy-on-close
    :size="getSize"
    :z-index="99"
    :close-on-click-modal="false"
    :title="id ? '笔记编辑' : '笔记新增'"
    class="note-container"
    :with-header="true"
    :before-close="() => $emit('cancel')"
  >
    <PageBox
      @change-btn="changeBtn"
      :footer-button-config="{
        id: props.id,
        hasDraftButton: false,
        addCode: 'pc:novel:note:add:btn',
        updateCode: 'pc:novel:note:update:btn',
        deleteCode: 'pc:novel:note:delete:btn'
      }"
    >
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
          <SelectClassify v-model="form.classify" :type="rootId"></SelectClassify>
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
    </PageBox>
  </ElDrawer>
</template>

<script setup lang="ts">
import { ElDrawer, ElForm, ElFormItem, ElInput, ElRow } from 'element-plus'
import { noteAddProps, noteAddEmit } from '../type'
import { useAdd } from '../hooks/use-add'
import PageBox from '@/components/PageBox/index.vue'
import SelectClassify from '@/components/SelectClassify/index.vue'
import InputNumber from '@/components/InputNumber/index.vue'
import SelectType from '@/components/SelectType/index.vue'
import { useWidth } from '@/hooks/use-width'
import { computed } from 'vue'

const props = defineProps(noteAddProps)
const emit = defineEmits(noteAddEmit)

const { formRef, form, rules, changeBtn } = useAdd(props, emit)

const { width } = useWidth()
const getSize = computed(() => {
  if (width.value <= 768) return '90%'
  return '50%'
})

const getItemWidth = computed(() => {
  if (width.value <= 768) return '100%'
  return '242px'
})

const itemClass = computed(() => {
  if (width.value <= 768) {
    return 'w-full'
  }
  return 'g-w-280'
})
</script>
