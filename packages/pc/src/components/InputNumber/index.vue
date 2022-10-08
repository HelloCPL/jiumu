<!--
  @describe: 数字类型输入框
  @author cpl
  @update 2022-07-26 20:14:21
-->

<template>
  <ElInputNumber
    type="number"
    :min="min"
    :max="max"
    :step="step"
    :step-strictly="stepStrictly"
    controls-position="right"
    :placeholder="placeholder"
    :model-value="modelValue"
    @update:modelValue="handleUpdate"
    @blur="handleBlur"
  ></ElInputNumber>
</template>

<script lang="ts" setup>
import { ElInputNumber } from 'element-plus'
import { inputNumberProps, inputNumberEmits } from './type'

const props = defineProps(inputNumberProps)
const emit = defineEmits(inputNumberEmits)

const handleUpdate = (val: number | undefined) => {
  if (!val && val !== 0) {
    emit('update:modelValue', val)
    return
  }
  if ((val * 10) % 10 !== 0 && !props.isFloat) return
  if (val < props.min) val = props.min
  if (val > props.max) val = props.max
  emit('update:modelValue', val)
}

const handleBlur = (e: any) => {
  if (e.target.value === '' || e.target.valueAsNumber < props.min) emit('update:modelValue', props.min)
  else if (e.target.valueAsNumber > props.max) emit('update:modelValue', props.max)
}
</script>
