<!--
  @describe: 重定向组件 用于同页面的刷新 作用于所有页面
  @params 正常参数 多出 params __name query __path 两个参数指定返回页面 __name 优先级更改 如
    router.push({
      name: 'Redirect',
      params: {
        __name: 'ArticleInfo',
        ...route.params
      }
    })
  @author: cpl
  @create: 2023-02-05 15:44:49
-->

<template>
  <div></div>
</template>

<script lang="ts" setup>
import { onMounted, getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useKeepAliveStore, useNavigationsStore } from '@/store'
const route = useRoute()
const router = useRouter()
const ctx = getCurrentInstance()?.ctx

const keepAliveStore = useKeepAliveStore()
const navigationsStore = useNavigationsStore()

onMounted(() => {
  const __name = <string>route.params.__name || <string>route.query.__name
  const __path = <string>route.query.__path || <string>route.params.__path
  const item = navigationsStore._find(__name || __path)

  if (item) {
    keepAliveStore._pop(item)
  }
  ctx.$forceUpdate()
  if (__name || __path) {
    const query = { ...route.query }
    const params = { ...route.params }
    delete query.__path
    delete query.__name
    delete params.__path
    delete params.__name
    setTimeout(() => {
      const obj: ObjectAny = { query, params }
      if (__name) obj.name = __name
      else if (__path) obj.path = __path
      router.replace(obj)
    }, 0)
  } else {
    router.back()
  }
})
</script>
