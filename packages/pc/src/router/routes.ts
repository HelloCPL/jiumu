import { RouteRecordRaw } from 'vue-router'
import { useRouter, Router, RouteLocationRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '@/views/home/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/login/index.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "Test" */ '@/views/test/index.vue')
  }
]

// 给push replace 方法扩展属性
export const useCustomRouter = () => {
  const router: Router = useRouter()
  console.log(router)
  // 扩展 push
  const _push = router.push
  router.push = function push(to: RouteLocationRaw) {
    let _to: RouteLocationRaw
    if (typeof to === 'string') {
      _to = {
        path: to,
        params: { __routerType__: 'push' }
      }
    } else {
      _to = to
      _to.params = _to.params || {}
      _to.params.__routerType__ = 'push'
    }
    console.log(_to)
    return _push.call(this, _to)
  }
}
