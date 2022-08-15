<!--
  @describe: 用户选择组件
  @author: cpl
  @create: 2022-07-28 14:51:51
-->

<template>
  <div :class="{ flex: !multiple }">
    <span @click="handleClick">
      <slot>
        <ElButton type="primary" class="px-6">
          <ElIcon>
            <User />
          </ElIcon>
          <span class="pl-1">选择用户</span>
        </ElButton>
      </slot>
    </span>
    <!-- 展示所选项 -->
    <SelectUserSpan
      class="ml-4"
      :is-delete="isDelete"
      v-if="showList && !multiple && modelValue.length"
      @delete="handleDelete(-1)"
    >
      <GRichText :html="modelValue[0].username"></GRichText>
      <UsernameShow :text="modelValue[0].phone" class="pl-1"></UsernameShow>
    </SelectUserSpan>
    <div
      class="w-full mt-4 pt-3 pl-3 bg-primary-50 border border-primary-100 border-solid flex flex-wrap"
      v-if="showList && multiple && modelValue.length"
    >
      <SelectUserSpan
        class="mr-3 mb-3"
        :is-delete="isDelete"
        v-for="(item, index) in modelValue"
        :key="item.id"
        @delete="handleDelete(index)"
      >
        <GRichText :html="item.username"></GRichText>
        <UsernameShow :text="item.phone" class="pl-1"></UsernameShow>
      </SelectUserSpan>
    </div>
    <!-- 弹窗选项 -->
    <SelectUserBox
      v-if="isShow"
      @close="isShow = false"
      :data="modelValue"
      :multiple="multiple"
      @change="change"
    ></SelectUserBox>
  </div>
</template>

<script lang="ts" setup>
import { ElButton, ElIcon } from 'element-plus'
import { User } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { selectUserProps } from './type'
import SelectUserBox from './SelectUserBox.vue'
import SelectUserSpan from './SelectUserSpan.vue'
import UsernameShow from '@/components/UsernameShow/index.vue'

const props = defineProps(selectUserProps)
const emit = defineEmits(['update:modelValue', 'change'])

const isShow = ref<boolean>(false)

const handleDelete = (index: number) => {
  if (index === -1) {
    emit('update:modelValue', [])
    emit('change', [])
  } else {
    const arr = [...props.modelValue]
    arr.splice(index, 1)
    emit('update:modelValue', arr)
    emit('change', arr)
  }
}

const change = (val: DataUserInfo[]) => {
  emit('update:modelValue', val)
  emit('change', val)
  isShow.value = false
}

const handleClick = () => {
  if (props.disabled) return
  isShow.value = true
}
</script>
