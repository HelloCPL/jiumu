<!--
  @describe: 刷新组件
  @author cpl
  @update 2022-07-16 18:59:15
-->
<script lang="ts" setup>
import { onMounted, getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useKeepAliveStore, useNavigationsStore } from '@/store'
const route = useRoute()
const router = useRouter()
const ctx = getCurrentInstance()?.ctx
const keepAliveStore = useKeepAliveStore()
const navStore = useNavigationsStore()
onMounted(() => {
  const __name = <string>route.params.__name
  const item = navStore._find(name)
  keepAliveStore._pop(item)
  ctx.$forceUpdate()
  if (__name && item) {
    setTimeout(() => {
      router.replace({
        name: __name,
        query: {
          ...route.query
        },
        params: {
          ...route.params
        }
      })
    }, 0)
  } else {
    router.back()
  }
})
</script>
