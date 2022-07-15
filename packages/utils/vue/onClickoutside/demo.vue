<template>
  <div>
    <!-- div 显示 -->
    <div ref="box">
      <button @click="isShow = true">显示</button>
      <div v-if="isShow" class="popup"></div>
    </div>

    <!-- 结合 input 显示 -->
    <input type="text" @blur="switchShow(false)" @focus="switchShow(true)" />
    <div v-if="isShowInput" class="popup" ref="box2"></div>
  </div>
</template>

<script lang="ts" setup>
import { onClickOutside, onClickOutsideInput } from '@jiumu/utils'
import { ref } from 'vue'

// div 显示
const box = ref<HTMLDivElement>()
// 点击 box 盒子外的地方会自动关闭 .popup
const { isShow } = onClickOutside(box)

// 结合 input 显示
const box2 = ref<HTMLDivElement>()
const { isShow: isShowInput, switchShow } = onClickOutsideInput(box2)
</script>

<style>
.popup {
  position: absolute;
  top: 100px;
  left: 100px;
  height: 100px;
  width: 100px;
  background: red;
}
</style>
