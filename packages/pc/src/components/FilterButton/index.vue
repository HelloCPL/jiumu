<!--
  @describe: 筛选按钮
  @author: cpl
  @create: 2022-07-21 10:07:07
-->

<template>
  <div class="w-full px-4 pt-3 border-b-1">
    <ElButton
      v-for="item in list"
      :key="item.key"
      :type="item.type || 'default'"
      :plain="item.plain"
      :text="item.text"
      :disabled="item.disabled"
      v-code="item.code"
      @click="handleClick(item)"
      class="mb-3"
    >
      {{ item.name }}
    </ElButton>
  </div>
</template>

<script lang="ts" setup>
import { ElButton } from 'element-plus'

const emits = defineEmits(['click'])
const handleClick = (item: PropsList) => {
  emits('click', item)
}

type PropsList = {
  name: string
  key: string
  code?: string // 权限标识
  type?: any
  plain?: boolean
  text?: boolean
  disabled?: boolean
}
type Props = {
  list: PropsList[]
}
withDefaults(defineProps<Props>(), {
  list: () => [{ name: '新增', key: 'add', type: 'primary' }]
})
</script>
