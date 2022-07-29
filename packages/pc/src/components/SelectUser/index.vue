<!--
  @describe: 用户选择组件
  @author: cpl
  @create: 2022-07-28 14:51:51
-->

<template>
  <div :class="{ flex: !multiple }">
    <span @click="handleClick">
      <slot>
        <ElButton type="primary" class="px-10">选择用户</ElButton>
      </slot>
    </span>
    <SelectUserSpan class="ml-4" :is-delete="isDelete" v-if="showList && !multiple"> 王某人 </SelectUserSpan>
    <div
      class="w-full mt-4 pt-3 pl-3 bg-primary-50 border border-primary-100 border-solid flex flex-wrap"
      v-if="showList && multiple"
    >
      <SelectUserSpan class="mr-3 mb-3" :is-delete="isDelete"> 王某人 </SelectUserSpan>
    </div>

    <SelectUserBox v-if="isShow" @close="isShow = false"></SelectUserBox>
  </div>
</template>

<script lang="ts" setup>
import { ElButton } from 'element-plus'
import { ref } from 'vue'
import { selectUser } from './type'
import { getUserList } from '@/api/user'
import SelectUserBox from './SelectUserBox.vue'
import SelectUserSpan from './SelectUserSpan.vue'

const props = defineProps(selectUser)
const emit = defineEmits(['update:modelValue', 'change'])

const isShow = ref<boolean>(false)

const handleClick = () => {
  if (props.disabled) return
  isShow.value = true
  // getUserList({
  //   simple: '1'
  // })
}
</script>
