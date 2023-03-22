<!--
  @describe: 类型选择组件
  @author: cpl
  @create: 2022-10-16 15:26:47
-->

<template>
  <!-- 单选样式 -->
  <ElRadioGroup v-if="showType === 'radio'" :model-value="modelValue" @update:model-value="updateModelValue">
    <template v-if="data && data.length">
      <ElRadio v-for="item in data" :key="item.value" :label="item.value">
        {{ item.label }}
      </ElRadio>
    </template>
    <template v-else-if="type === 'type'">
      <ElRadio v-for="item in typeList" :key="item.code" :label="item.code">
        {{ item.label }}
      </ElRadio>
    </template>
    <template v-else-if="type === 'classify'">
      <ElRadio v-for="item in classifyList" :key="item.id" :label="item.id">
        {{ item.label }}
      </ElRadio>
    </template>
    <template v-else-if="type === 'isSecret'">
      <ElRadio v-for="item in isSecretList" :key="item.value" :label="item.value">
        {{ item.label }}
      </ElRadio>
    </template>
  </ElRadioGroup>
  <!-- 下拉样式 -->
  <ElSelect
    :clearable="clearable"
    :placeholder="_placeholder"
    :model-value="modelValue"
    @update:model-value="updateModelValue"
    v-else
  >
    <template v-if="data && data.length">
      <ElOption v-for="item in data" :key="item.value" :value="item.value" :label="item.label"></ElOption>
    </template>
    <template v-else-if="type === 'type'">
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
import { ElRadioGroup, ElRadio, ElSelect, ElOption } from 'element-plus'
import { ref, onMounted } from 'vue'
import { selectTypeProps, selectTypeEmit } from './type'

const props = defineProps(selectTypeProps)
const emit = defineEmits(selectTypeEmit)

const updateModelValue = (val: any) => {
  emit('update:modelValue', val)
  emit('change', val)
}

// 类型
const typeList = ref<DataTag[]>([])
const getTypeList = async () => {
  const type = props.parentCode || '300'
  const res = await getTagByParentCode(type)
  if (res.code === 200) {
    typeList.value = handleFilterCodes(res.data)
  }
}

// 过滤指定的codes
const handleFilterCodes = (data: DataTag[]): DataTag[] => {
  const codes = props.filterCodes.split(',').filter((val) => val)
  if (!props.filterCodes || !codes.length) return data
  const _find = (code: string): boolean => {
    let flag = false
    codes.find((val) => {
      if (val === code) {
        flag = true
        return flag
      }
    })
    return flag
  }
  return data.filter((item) => _find(item.code))
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
  if (props.data.length) return
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
