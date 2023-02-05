<!--
  @describe: 刷新组件 仅用于 home 下面的页面刷新
  @params 正常参数 多出 __name __path 两个参数指定返回页面
    __name 优先级更高 在 params query 挂载均可 如
    router.push({
      name: 'Refresh',
      params: {
        __name: 'Article',
        ...route.params
      }
    })
  @author cpl
  @update 2022-07-16 18:59:15
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
  ctx.$forceUpdate()
  if ((__name || __path) && item) {
    keepAliveStore._pop(item)
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
