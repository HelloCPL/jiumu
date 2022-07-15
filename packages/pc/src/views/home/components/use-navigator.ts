import { useNavigationsStore } from '@/store'
import { ref, nextTick, watch, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { KeepAliveOption } from '@/store/keep-alive.b'

export const useNavigator = () => {
  // 导航栏菜单
  const navStore = useNavigationsStore()
  const route = useRoute()
  const router = useRouter()

  const left = ref<number>(0)
  const maxWidth = ref<number>(0)
  const refContainer = ref<HTMLDivElement>()
  const refWrapper = ref<HTMLDivElement>()

  // 点击每一项
  const clickItem = (item: KeepAliveOption) => {
    router.push({
      name: <string>item.name
    })
  }

  // 点击关闭
  const clickClose = (item: KeepAliveOption, index: number) => {
    if (navStore.routerName === item.name) {
      let name: string
      if (navStore.navigations.length - 1 > index) name = navStore.navigations[index + 1].name
      else name = navStore.navigations[index - 1].name
      router.replace({
        name
      })
    } else {
      navStore._pop(item)
      calculateLeft()
    }
  }

  // 更改左右两侧移动距离
  const changeLeft = (n: number) => {
    setLeft(left.value + n)
  }

  // 计算左侧距离
  const calculateLeft = () => {
    nextTick(() => {
      if (!refContainer.value || !refWrapper.value) return
      const cWidth = refContainer.value.offsetWidth
      const wWidth = refWrapper.value.offsetWidth
      if (wWidth > cWidth) {
        maxWidth.value = cWidth - wWidth
        let _left = 0
        const l = (navStore.routerNameIndex + 1) * 120 - Math.round(cWidth / 2)
        if (l > 0) _left = -l
        setLeft(_left)
      } else {
        left.value = 0
        maxWidth.value = 0
      }
    })
  }

  const setLeft = (n: number) => {
    n = n >= 0 ? 0 : n
    n = n <= maxWidth.value ? maxWidth.value : n
    left.value = n
  }

  // 监听路由变化计算宽度
  let timeId: any = null
  watch(
    () => route.name,
    (val, oldVal) => {
      if (val === oldVal) return
      if (timeId) clearTimeout(timeId)
      timeId = setTimeout(() => {
        calculateLeft()
      }, 100)
    },
    { immediate: true }
  )

  // 监听窗口变化
  onMounted(() => {
    window.addEventListener('resize', calculateLeft)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', calculateLeft)
  })

  return {
    left,
    maxWidth,
    refContainer,
    refWrapper,
    navStore,
    clickItem,
    clickClose,
    changeLeft
  }
}
