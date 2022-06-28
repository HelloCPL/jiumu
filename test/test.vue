
<template>
  <div></div>
</template>

<script setup lang="ts">
import {defineAsyncComponent} from "vue"
const A = defineAsyncComponent(() => import('./A.vue'))
</script>
