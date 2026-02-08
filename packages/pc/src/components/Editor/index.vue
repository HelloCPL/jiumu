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
          <ElRadio label="401">富文本编辑器</ElRadio>
          <ElRadio label="402">Markdown编辑器</ElRadio>
        </ElRadioGroup>
      </div>
    </div>
    <EditorWang
      v-bind="mergeAttrs"
      @update:model-value="(...args) => emit('update:modelValue', ...args)"
      @change="(...args) => emit('change', ...args)"
      @save="(...args) => emit('save', ...args)"
      @blur="(...args) => emit('blur', ...args)"
      @focus="(...args) => emit('focus', ...args)"
      v-if="type === '401'"
    ></EditorWang>
    <EditorMd
      v-bind="mergeAttrs"
      @update:model-value="(...args) => emit('update:modelValue', ...args)"
      @change="(...args) => emit('change', ...args)"
      @save="(...args) => emit('save', ...args)"
      v-else-if="type === '402'"
    ></EditorMd>
  </div>
</template>

<script lang="ts" setup>
import { ElRadioGroup, ElRadio } from 'element-plus'
import { editorProps, editorEmits } from './type'
import EditorMd from './components/EditorMd/index.vue'
import EditorWang from './components/EditorWang/index.vue'
import { computed, ref, useAttrs, watch } from 'vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps(editorProps)
const emit = defineEmits(editorEmits)

const attrs = useAttrs()
const mergeAttrs = computed(() => {
  const { type: _, ...propsWithoutType } = props
  return { ...attrs, ...propsWithoutType }
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
</script>
