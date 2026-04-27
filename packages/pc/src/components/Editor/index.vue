<!--
  @describe: 文本编辑器
  @author: cpl
  @create: 2022-09-04 13:59:40
-->

<template>
  <div class="w-full">
    <div class="flex items-center mb-2" v-if="!modelValue || modelValue === '<p><br></p>'">
      <div class="flex items-center flex-wrap">
        <span class="text-sm text-lighter mr-2">可选择切换编辑器：</span>
        <ElRadioGroup v-model="_type" @change="handleChangeType">
          <ElRadio :value="item.value" v-for="item in typeList" :key="item.value">{{ item.label }}</ElRadio>
        </ElRadioGroup>
      </div>
    </div>
    <EditorWang
      ref="refEditor"
      v-bind="mergeAttrs"
      @update:model-value="(...args) => emit('update:modelValue', ...args)"
      @change="(...args) => emit('change', ...args)"
      @save="(...args) => emit('save', ...args)"
      @blur="(...args) => emit('blur', ...args)"
      @focus="(...args) => emit('focus', ...args)"
      v-if="_type === '401'"
    ></EditorWang>
    <EditorMd
      ref="refEditor"
      v-bind="mergeAttrs"
      @update:model-value="(...args) => emit('update:modelValue', ...args)"
      @change="(...args) => emit('change', ...args)"
      @save="(...args) => emit('save', ...args)"
      v-else-if="_type === '402'"
    ></EditorMd>
    <EditorAce
      ref="refEditor"
      v-bind="mergeAttrs"
      @update:model-value="(...args) => emit('update:modelValue', ...args)"
      @change="(...args) => emit('change', ...args)"
      @save="(...args) => emit('save', ...args)"
      @blur="(...args) => emit('blur', ...args)"
      @focus="(...args) => emit('focus', ...args)"
      v-else-if="_type === '403'"
    ></EditorAce>
  </div>
</template>

<script lang="ts" setup>
import { ElRadioGroup, ElRadio } from 'element-plus'
import { editorProps, editorEmits } from './type'
import EditorMd from './components/EditorMd/index.vue'
import EditorWang from './components/EditorWang/index.vue'
import EditorAce from './components/EditorAce/index.vue'
import { computed, ref, useAttrs, watch } from 'vue'

defineOptions({
  name: 'EditorComponent',
  inheritAttrs: false
})

const props = defineProps(editorProps)
const emit = defineEmits(editorEmits)

const attrs = useAttrs()
const mergeAttrs = computed(() => {
  const { type: _, ...propsWithoutType } = props
  return { ...attrs, ...propsWithoutType }
})

const typeList = computed(() => {
  const arr = [
    { label: '富文本编辑器', value: '401' },
    { label: 'Markdown编辑器', value: '402' },
    { label: '代码编辑器', value: '403' }
  ]
  const types = props.types || '401,402'
  return types
    .split(',')
    .map((val) => {
      return arr.find((row) => row.value === val.trim())
    })
    .filter((item) => item?.value)
})

const _type = ref<any>('')
watch(
  () => props.type,
  (val) => {
    _type.value = val
  },
  { immediate: true }
)
const handleChangeType = (val: any) => {
  emit('update:type', val)
  emit('changeType', val)
}

const refEditor = ref<any>(null)

defineExpose({
  get refEditor() {
    return refEditor.value?.refEditor
  }
})
</script>
