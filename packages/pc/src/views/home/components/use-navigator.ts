import { useNavigationsStore } from '@/store'
import { ref, nextTick, watch, onMounted, onUnmounted, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { KeepAliveOption } from '@/store/keep-alive.b'
import { onClickOutside } from '@jiumu/utils'
import { getPx } from '@/utils/tools'

/**
 * 导航栏点击、移动、右击等处理
 */
export const useNavigator = () => {
  // 导航栏菜单
  const navigationsStore = useNavigationsStore()
  const route = useRoute()
  const router = useRouter()

  const left = ref<number>(0)
  // 导航栏容器
  const refContainer = ref<HTMLDivElement>()
  // 真实导航栏
  const refWrapper = ref<HTMLDivElement>()
  // 若容器 > 导航栏 此时值 = 容器宽 - 导航栏宽
  // 若容器 <= 导航栏 此时值 = 0
  const maxWidth = ref<number>(0)

  // 点击每一项
  const clickItem = (item: KeepAliveOption) => {
    router.push({
      name: <string>item.name,
      params: { ...item.params },
      query: { ...item.query }
    })
  }

  // 点击关闭
  const clickClose = (item: KeepAliveOption, index: number) => {
    if (navigationsStore.routerName === item.name) {
      let _index = index
      if (navigationsStore.navigations.length - 1 > index) _index = index + 1
      else _index = index - 1
      const _item = navigationsStore.navigations[_index]
      router.replace({
        name: <string>_item.name,
        params: { ..._item.params },
        query: { ..._item.query }
      })
    } else {
      navigationsStore._pop(item)
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
        const l = (navigationsStore.routerNameIndex + 1) * getPx(119) - Math.round(cWidth / 2)
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

  /**
   * 右击处理
   */
  const rightBoxIndex = ref<number>(0)
  const rightOptions = reactive({
    disabled: [true, true, true, true, true],
    left: 0,
    top: 0
  })
  const { isShow } = onClickOutside('.navigator-right')

  // 右击导航菜单
  const clickItemRight = (e: MouseEvent, item: KeepAliveOption, index: number) => {
    // 先处理定位问题
    const w = document.documentElement.clientWidth || window.innerWidth
    let l = e.clientX
    l = l > w - 130 ? w - 130 : l
    rightOptions.left = l
    rightOptions.top = e.clientY + 15
    rightBoxIndex.value = index
    // 再处理选项问题
    const isCurrent = index === navigationsStore.routerNameIndex
    rightOptions.disabled[0] = !isCurrent
    rightOptions.disabled[1] = navigationsStore.navigations.length > 1 ? false : true
    rightOptions.disabled[2] = isCurrent && navigationsStore.navigations.length - 1 > index ? false : true
    rightOptions.disabled[3] = isCurrent && index > 0 ? false : true
    rightOptions.disabled[4] = isCurrent && navigationsStore.navigations.length > 1 ? false : true
    // 最后显示
    isShow.value = true
  }

  // 菜单回调
  const handleChangeRight = (item: KeyValue, index: number) => {
    isShow.value = false
    const name = <string>navigationsStore.navigations[index].name
    switch (item.value) {
      case 'refresh':
        router.push({
          name: 'Refresh',
          params: { ...route.params, __name: name },
          query: { ...route.query }
        })
        return
      case 'close':
        clickClose(navigationsStore.navigations[index], index)
        return
      case 'closeRight':
        for (let i = index + 1; i < navigationsStore.navigations.length; i++) {
          clickClose(navigationsStore.navigations[i], i)
          i--
        }
        return
      case 'closeLeft':
        for (let i = 0; i < index; i++) {
          clickClose(navigationsStore.navigations[i], i)
          i--
          index--
        }
        return
      case 'closeOther':
        for (let i = 0; i < navigationsStore.navigations.length; i++) {
          if (navigationsStore.navigations[i].name !== name) {
            clickClose(navigationsStore.navigations[i], i)
            i--
          }
        }
        return
    }
  }

  return {
    left,
    maxWidth,
    refContainer,
    refWrapper,
    navigationsStore,
    clickItem,
    clickClose,
    changeLeft,

    // 右击处理
    rightBoxIndex,
    rightOptions,
    isShow,
    clickItemRight,
    handleChangeRight
  }
}

/**
 * 导航栏拖拽处理
 */
export const useNavigatorDrag = (option: ObjectAny = {}) => {
  const navigationsStore = useNavigationsStore()
  const draggable = ref<boolean>(true)
  const dragIndex = ref<number>(-1)
  let startX = 0
  let startIndex = -1
  const dragstart = (e: DragEvent, index: number) => {
    dragIndex.value = index
    startIndex = index
    startX = e.clientX
  }
  const dragend = () => {
    dragIndex.value = -1
    startX = 0
    startIndex = -1
  }
  const drop = (e: MouseEvent) => {
    e.preventDefault()
    // navigationsStore.navigations.splice()
    if (startIndex !== -1 && dragIndex.value !== -1 && startIndex !== dragIndex.value)
      exchangeArr(navigationsStore.navigations, startIndex, dragIndex.value)
  }
  const dragover = (e: MouseEvent) => {
    const { clientX } = e
    const diff = (clientX - startX) / getPx(119)
    let num: number
    if (diff > 0) num = Math.ceil(diff)
    else num = Math.floor(diff)
    dragIndex.value = num + startIndex
    e.preventDefault()
  }

  return {
    dragIndex,
    draggable,
    dragend,
    dragstart,
    drop,
    dragover
  }
}

// 交换两个菜单
function exchangeArr(arr: any[], originIndex: number, targetIndex: number) {
  const item = { ...arr[originIndex] }
  arr.splice(originIndex, 1)
  arr.splice(targetIndex, 0, item)
}
