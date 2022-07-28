<!--
  @describe: 用户选择组件
  @author: cpl
  @create: 2022-07-28 14:51:51
-->

<template>
  <div>
    <span @click="handleClick">
      <slot>
        <ElButton type="primary" class="px-10" @click="isShow = true">选择用户</ElButton>
      </slot>
    </span>
    <div
      class="w-full mt-4 pt-3 pl-3 bg-primary-50 border border-primary-100 border-solid flex flex-wrap"
      v-if="showList"
    >
      <span
        class="flex-shrink-0 mr-3 mb-3 w-28 fill-darker text-light py-1 flex justify-center items-center rounded"
      >
        <span>王某人</span>
        <ElIcon class="ml-2 cursor-pointer" color="var(--jm-color-info)" v-if="isDelete">
          <CircleClose />
        </ElIcon>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElButton, ElIcon } from 'element-plus'
import { CircleClose } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { selectUser } from './type'
import { getUserList } from '@/api/user'

const props = defineProps(selectUser)
const emit = defineEmits(['update:modelValue', 'change'])

const isShow = ref<boolean>(false)

const handleClick = () => {
  if (props.disabled) return
  isShow.value = false
  console.log(123)
  getUserList({
    simple: '1'
  })
}
</script>
