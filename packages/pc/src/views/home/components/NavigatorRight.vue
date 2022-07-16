<!--
  @describe: 导航栏右侧
  @author cpl
  @update 2022-07-15 20:24:06
-->

<template>
  <teleport to="body">
    <ul
      class="fixed bg-white-8 border-1 border-lighter shadow-lg z-50 py-1 text-light navigator-right"
      id="navigator-right"
      :style="{ left: options.left + 'px', top: options.top + 'px' }"
      v-bind="$attrs"
    >
      <li
        class="h-8 flex items-center px-3 select-none cursor-pointer border-lighter hover:bg-primary-50"
        :class="{ 'text-lighter': options.disabled[index], 'cursor-not-allowed': options.disabled[index] }"
        v-for="(item, index) in menus"
        :key="item.value"
        @click="handleChange(item, options.disabled[index])"
      >
        {{ item.key }}
      </li>
    </ul>
  </teleport>
</template>

<script lang="ts" setup>
defineOptions({
  inheritAttrs: false
})
const menus: KeyValue[] = [
  { key: '刷新', value: 'refresh' },
  { key: '关闭', value: 'close' },
  { key: '关闭到右侧', value: 'closeRight' },
  { key: '关闭到左侧', value: 'closeLeft' },
  { key: '关闭其他', value: 'closeOther' }
]

type Props = {
  options: {
    disabled: boolean[]
    left: number
    top: number
  }
  index: number
}
const props = withDefaults(defineProps<Props>(), {
  options: () => {
    return {
      disabled: [true, true, true, true, true],
      left: 0,
      top: 0
    }
  }
})
const emit = defineEmits(['change'])
const handleChange = (item: KeyValue, disabled: boolean) => {
  if (disabled) return
  emit('change', item, props.index)
}
</script>

<style lang="scss" scoped>
.navigator-right {
  width: 120px;
}
</style>
