<!--
  @cpl
  @create 2026-01-27 21:18:14
  @description 加载状态
-->

<template>
  <div class="relative w-full flex flex-col items-center justify-center py-8">
    <svg class="lazy-loading-spinner" viewBox="0 0 40 40" width="30">
      <circle class="path" cx="20" cy="20" r="15" fill="none" :stroke="strokeColor"></circle>
    </svg>
    <span>
      <span class="text-sm text-primary mt-2">加载中</span>
      <span class="inline-block mt-1">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { themeStore } from '@/store/theme/instance'
import { ref } from 'vue'

const strokeColor = ref(themeStore.getRootColor('--jm-color-primary'))
</script>

<style lang="scss" scoped>
.lazy-loading-spinner {
  animation: rotate 2s linear infinite;

  .path {
    stroke-dasharray: 90 150;
    stroke-dashoffset: 0;
    stroke-width: 2;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
}

.dot {
  display: inline-block;
  width: 2px;
  height: 2px;
  background-color: var(--jim-color-primary);
  border-radius: 50%;
  margin-right: 2px;
  opacity: 0;
}

.dot:nth-child(1) {
  animation: dotPulse 1.5s infinite 0s;
}

.dot:nth-child(2) {
  animation: dotPulse 1.5s infinite 0.2s;
}

.dot:nth-child(3) {
  animation: dotPulse 1.5s infinite 0.4s;
  margin-right: 0;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

@keyframes dotPulse {
  0% {
    opacity: 0;
    transform: scale(0.7);
  }
  20% {
    opacity: 1;
    transform: scale(1.1);
  }
  40% {
    opacity: 0.8;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.7);
  }
}
</style>
