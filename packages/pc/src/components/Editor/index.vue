<!--
  @describe: 文本编辑器
  @author: cpl
  @create: 2022-09-04 13:59:40
-->

<template>
  <button @click="show = !show">销毁/显示</button>
  <EditorWang
    @update:model-value="updateModelValue"
    @change="change"
    @blur="blur"
    @focus="focus"
    v-bind="$attrs"
    v-if="type === '401' && show"
  ></EditorWang>
  <EditorMd v-bind="$attrs" v-if="type === '402' && show"></EditorMd>
</template>

<script lang="ts" setup>
import EditorWang from './components/EditorWang/index.vue'
import EditorMd from './components/EditorMd/index.vue'
import { editorProps } from './type'
import { ref } from 'vue'
const show = ref(true)

defineOptions({
  inheritAttrs: false
})

defineProps(editorProps)
const emit = defineEmits(['update:modelValue', 'change', 'blur', 'focus'])

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
</script>
