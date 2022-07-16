<!--
  @describe: 角色页面
  @author: cpl
  @create: 2022-07-04 17:20:19
-->

<template>
  <div>Role {{ count }}</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
defineOptions({
  name: 'Role'
})

const count = ref<number>(1)
setTimeout(() => {
  count.value = 111
}, 3000)
</script>
