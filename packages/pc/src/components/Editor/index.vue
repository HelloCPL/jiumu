<!--
  @describe: 文本编辑器
  @author: cpl
  @create: 2022-09-04 13:59:40
-->

<template>
  <div class="w-full">
    <div
      class="flex items-center mb-2"
      style="height: 32px"
      v-if="!modelValue || modelValue === '<p><br></p>'"
    >
      <div class="flex items-center">
        <span class="text-sm text-lighter mr-2">可选择切换编辑器：</span>
        <ElRadioGroup v-model="_type" @change="handleChangeType">
          <ElRadio label="401">富文本编辑器</ElRadio>
          <ElRadio label="402">Markdown编辑器</ElRadio>
        </ElRadioGroup>
      </div>
    </div>
    <EditorWang
      :model-value="modelValue"
      @update:model-value="updateModelValue"
      @change="change"
      @blur="blur"
      @focus="focus"
      v-bind="$attrs"
      v-if="type === '401'"
    ></EditorWang>
    <EditorMd
      v-bind="$attrs"
      :model-value="modelValue"
      @update:model-value="updateModelValue"
      @change="change"
      v-else-if="type === '402'"
    ></EditorMd>
    <EditorAoMao v-else-if="type === '403'"></EditorAoMao>
  </div>
</template>

<script lang="ts" setup>
import { ElRadioGroup, ElRadio } from 'element-plus'
import EditorWang from './components/EditorWang/index.vue'
import EditorMd from './components/EditorMd/index.vue'
import EditorAoMao from './components/EditorAoMao/index.vue'
import { editorProps, editorEmits } from './type'
import { useIndex } from './index'

defineOptions({
  inheritAttrs: false
})

const props = defineProps(editorProps)
const emit = defineEmits(editorEmits)

const { updateModelValue, change, blur, focus, _type, handleChangeType } = useIndex(props, emit)
</script>
