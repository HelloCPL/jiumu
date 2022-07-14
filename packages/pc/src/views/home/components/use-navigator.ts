import { useNavigationsStore } from '../../../store'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { KeepAliveOption } from '@/store/keep-alive.b'

export const useNavigator = () => {
  // 导航栏菜单
  const navStore = useNavigationsStore()
  const router = useRouter()

  const clickItem = (item: KeepAliveOption) => {
    console.log('clickItem', item)
    router.push({
      name: <string>item.name
    })
  }

  // 点击关闭
  const clickClose = (item: KeepAliveOption) => {
    console.log('clickClose', navStore.oldRouterName)
    if (navStore.routerName === item.name) {
      if (navStore.oldRouterName) {
        router.replace({
          name: <string>item.name
        })
      } else {
        router.back()
      }
    } else {
      navStore._pop(item)
    }
  }

  return {
    navStore,
    clickItem,
    clickClose
  }
}
