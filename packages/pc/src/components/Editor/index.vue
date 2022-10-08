<!--
  @describe: 文本编辑器
  @author: cpl
  @create: 2022-09-04 13:59:40
-->

<template>
  <button @click="show = !show">销毁/显示</button>
  <div>
    <div class="flex items-center mb-2 editor-title" style="height: 32px；">
      <slot>
        <span class="mr-6">内容</span>
      </slot>
      <div v-if="!modelValue || modelValue === '<p><br></p>'" class="flex items-center">
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
      v-if="type === '401' && show"
    ></EditorWang>
    <EditorMd
      v-bind="$attrs"
      :model-value="modelValue"
      @update:model-value="updateModelValue"
      @change="change"
      v-else-if="type === '402' && show"
    ></EditorMd>
    <EditorAoMao v-else-if="type === '403' && show"></EditorAoMao>
  </div>
</template>

<script lang="ts" setup>
import { ElRadioGroup, ElRadio } from 'element-plus'
import EditorWang from './components/EditorWang/index.vue'
import EditorMd from './components/EditorMd/index.vue'
import EditorAoMao from './components/EditorAoMao/index.vue'
import { editorProps, editorEmits } from './type'
import { onMounted, ref, watch } from 'vue'
const show = ref(true)

defineOptions({
  inheritAttrs: false
})

const props = defineProps(editorProps)
const emit = defineEmits(editorEmits)
const updateModelValue = (val: string) => {
  emit('update:modelValue', val)
}
const change = (val: string) => {
  emit('change', val)
}
const blur = (val: string) => {
  emit('blur', val)
}
const focus = (val: string) => {
  emit('focus', val)
}

const _type = ref('')
watch(
  () => props.type,
  (val) => {
    _type.value = val
  },
  { immediate: true }
)
const handleChangeType = (val: string) => {
  emit('update:type', val)
  emit('changeType', val)
}
</script>

<style scoped lang="scss">
.editor-title {
  height: 32px;
}
</style>
