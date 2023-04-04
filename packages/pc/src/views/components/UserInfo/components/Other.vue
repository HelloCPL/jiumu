<!--
  @describe 其他
  @author cpl
  @create 2023-03-17 16:47:36
-->

<template>
  <div class="pt-12 pl-12">
    <div class="mb-4">
      <ElButton type="primary" text size="small" @click="toCipher">我的口令</ElButton>
    </div>
    <div v-if="VITE_MODE !== 'prod'">
      <ElButton type="primary" text size="small" @click="toAPI">API文档</ElButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElButton } from 'element-plus'
import { useRouter } from 'vue-router'
const { VITE_MODE } = import.meta.env

const emit = defineEmits({
  close: () => true
})

const router = useRouter()

const toCipher = () => {
  emit('close')
  router.push({
    name: 'CipherMe'
  })
}

const toAPI = () => {
  emit('close')
  const routeUrl = router.resolve({
    name: 'Mdapi'
  })
  window.open(routeUrl.href, '_blank')
}
</script>
