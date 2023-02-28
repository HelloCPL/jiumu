<!--
  @describe: 类型选择组件
  @author: cpl
  @create: 2022-10-16 15:26:47
-->

<template>
  <ElSelect
    :clearable="clearable"
    :placeholder="_placeholder"
    :model-value="modelValue"
    @update:model-value="updateModelValue"
  >
    <template v-if="type === 'type'">
      <ElOption v-for="item in typeList" :key="item.code" :value="item.code" :label="item.label"></ElOption>
    </template>
    <template v-else-if="type === 'classify'">
      <ElOption v-for="item in classifyList" :key="item.id" :value="item.id" :label="item.label"></ElOption>
    </template>
    <template v-else-if="type === 'isSecret'">
      <ElOption
        v-for="item in isSecretList"
        :key="item.value"
        :value="item.value"
        :label="item.label"
      ></ElOption>
    </template>
  </ElSelect>
</template>

<script lang="ts" setup>
import { getTagCustomListSelf } from '@/api/classify'
import { getTagByParentCode } from '@/api/tag'
import { ElSelect, ElOption } from 'element-plus'
import { PropType, ref, onMounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  // 选择类型 type 类型 classify 标签 isSecret 是否公开
  type: {
    type: String as PropType<'type' | 'classify' | 'isSecret'>,
    default: 'type'
  },
  // 父级code 仅  type 为 type classify 需要
  parentCode: {
    type: String,
    default: ''
  },
  clearable: {
    type: Boolean,
    default: true
  },
  placeholder: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue'])

const updateModelValue = (val: any) => {
  emit('update:modelValue', val)
}

// 类型
const typeList = ref<DataTag[]>([])
const getTypeList = async () => {
  const type = props.parentCode || '300'
  const res = await getTagByParentCode(type)
  if (res.code === 200) {
    typeList.value = res.data
  }
}
// 标签
const classifyList = ref<DataTagCustom[]>([])
const getClassifyList = async () => {
  const type = props.parentCode || 'articleClassify'
  const res = await getTagCustomListSelf({
    type,
    pageSize: 100
  })
  if (res.code === 200) {
    classifyList.value = res.data
  }
}
// 是否公开
const isSecretList = ref<ValueLabel[]>([])
const getIsSecretList = () => {
  isSecretList.value = [
    { value: '1', label: '否' },
    { value: '0', label: '是' }
  ]
}
const _placeholder = ref('')
onMounted(() => {
  switch (props.type) {
  case 'type':
    getTypeList()
    _placeholder.value = props.placeholder || '请选择类型'
    break
  case 'classify':
    getClassifyList()
    _placeholder.value = props.placeholder || '请选择标签'
    break
  case 'isSecret':
    getIsSecretList()
    _placeholder.value = props.placeholder || '请选择是否公开'
    break
  }
})
</script>
