<!--
  @describe: 用户信息
  @author cpl
  @update 2022-07-22 20:20:56
-->

<template>
  <Dialog title="用户设置" :width="600" content-height="65vh" :show-footer="false" @close="handleCLose">
    <div class="w-full h-full flex" :class="wrapperClass">
      <div class="bg-white text-sm shrink-0 setting-left">
        <div
          v-for="item in list"
          :key="item.value"
          class="h-10 border-b-1 border-lighter flex items-center cursor-pointer setting-left-item"
          :class="{
            bg: item.value === target,
            'text-primary': item.value === target,
            'setting-active': item.value === target
          }"
          @click="handleClickItem(item)"
        >
          {{ item.label }}
        </div>
      </div>
      <div class="flex-1 relative g-scroll-y-0 setting-right">
        <BaseInfo v-if="target === '0'"></BaseInfo>
        <Setting v-else-if="target === '1'"></Setting>
        <Logs v-else-if="target === '2'"></Logs>
        <Other v-else-if="target === '3'" @close="$emit('close')"></Other>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from '@/components/Dialog/index.vue'
import { computed, ref } from 'vue'
import BaseInfo from './components/BaseInfo.vue'
import Logs from './components/Logs.vue'
import Other from './components/Other.vue'
import Setting from './components/Setting.vue'
import { useWidth } from '@/hooks/use-width'

const emit = defineEmits({
  close: () => true
})

const props = defineProps({
  unmount: {
    type: Function,
    default: () => {}
  }
})

const handleCLose = () => {
  props.unmount()
  emit('close')
}

const target = ref('0')
const list = ref<ValueLabel[]>([
  { label: '账号信息', value: '0' },
  { label: '常规设置', value: '1' },
  { label: '登录日志', value: '2' }
])
const { VITE_MODE } = import.meta.env
if (VITE_MODE !== 'prod') {
  list.value.push({ label: '其他设置', value: '3' })
}

const handleClickItem = (item: ValueLabel) => {
  target.value = item.value
}

const { width } = useWidth()
const wrapperClass = computed(() => {
  if (width.value <= 768) return 'setting-wrapper-full'
  return 'setting-wrapper'
})

/*
 * 账号设置
 *   基本信息（头像修改，账号显示(暂不支持修改)，角色，标签，基本信息查看与修改）
 *   修改账号
 *   修改密码
 *   退出登录
 * 设置
 *   主题
 *   字体大小
 * 登录日志
 * 其他
 *   口令
 *   api文档
 */
</script>

<style lang="scss" scoped>
.setting-wrapper {
  .setting-left {
    border-right: 1px solid var(--jm-color-border-lighter);
    @apply w-32 mr-6;

    .setting-left-item {
      @apply w-full pl-6;
    }
  }

  .setting-active {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 2px;
      height: var(--jm-font-size);
      transform: translateY(-50%);
      background: var(--jm-color-primary);
    }
  }

  .setting-right {
    @apply h-full;
  }
}

.setting-wrapper-full {
  @apply flex-col;

  .setting-left {
    border-bottom: 1px solid var(--jm-color-border-lighter);
    @apply flex w-full mb-6;

    .setting-left-item {
      @apply w-24 justify-center;
    }
  }

  .setting-active {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--jm-color-primary);
    }
  }

  .setting-right {
  }
}
</style>
