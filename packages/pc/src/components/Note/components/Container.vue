<!--
  @cpl
  @create 2024-09-01 15:43:55
  @parameter 笔记展示容器
-->

<template>
  <teleport to="body">
    <div
      class="fixed bg-white-8 border-1 border-primary-4 shadow rounded flex items-center z-10"
      :style="{ width: getPx(120) + 'px', height: getPx(32) + 'px', top: top + 'px', left: left + 'px' }"
    >
      <div
        class="bg-primary-8 rounded flex items-center justify-center shrink-0 cursor-move"
        :style="{ width: getPx(32) + 'px', height: getPx(32) + 'px' }"
        @mousedown="handleMousedown"
      >
        <IconSvg name="note" fill="var(--jm-color-white)" :size="getPx(18)"></IconSvg>
      </div>
      <div class="flex-1 pl-2 text-sm text-primary">
        <span class="cursor-pointer select-none" @click="$emit('open')">
          <span>所属笔记</span>
          <span v-if="total">({{ total }})</span>
        </span>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import IconSvg from '@/components/IconSvg/index.vue'
import { getPx } from '@/utils/tools'
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineProps({
  total: {
    type: Number,
    default: 0
  }
})
defineEmits(['open'])

// 处理当前屏幕宽高
const width = ref(window.innerWidth)
const height = ref(window.innerHeight)
const getScreen = () => {
  width.value = window.innerWidth
  height.value = window.innerHeight
  handlePosition()
}
onMounted(() => {
  window.addEventListener('resize', getScreen)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', getScreen)
})

const initTop = getPx(106) as number
const initLeft = getPx(120 + 16) as number
const top = ref(getPx(initTop))
const left = ref(width.value - initLeft)

const handlePosition = (_t?: number, _l?: number) => {
  let t = (_t || top.value) as number
  let l = (_l || left.value) as number
  t = t < 0 ? 0 : t
  t = t > height.value - 32 ? height.value - 32 : t
  l = l < 0 ? 0 : l
  l = l > width.value - 120 ? width.value - 120 : l
  top.value = t
  left.value = l
}

// 处理移动
const handleMousedown = (e: Event) => {
  e && e.preventDefault()
  let move: any = (e: any) => {
    handlePosition(e.clientY - 16, e.clientX - 16)
  }
  document.addEventListener('mousemove', move)
  let moveup: any = () => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', moveup)
    move = null
    moveup = null
  }
  document.addEventListener('mouseup', moveup)
}
</script>
