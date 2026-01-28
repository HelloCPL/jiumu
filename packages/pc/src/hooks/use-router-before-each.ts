import { Router, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { useUserStore } from '@/store'
import { useNavigationsStore } from '@/store'
import { hasPermission } from '@/utils/permission'

/**
 * 路由 beforeEach 拦截
 * 主要对 meta.code 需要权限校验的页面进行校验
 */
export const beforeEach = (router: Router) => {
  router.beforeEach(
    (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      // 处理目标页面是否仅更新一次
      const navigationsStore = useNavigationsStore()
      if (to.params._refreshOne === '1') {
        navigationsStore.refreshNavigations(<string>to.name)
        delete to.params._refreshOne
      } else if (to.query._refreshOne === '1') {
        navigationsStore.refreshNavigations(<string>to.name)
        delete to.query._refreshOne
      }

      const userStore = useUserStore()

      // token 校验
      if (!userStore.token && to.name !== 'Login') {
        return next({
          path: '/login',
          query: { redirect: to.path }
        })
      }
      // 页面路由权限校验
      const code = to?.meta?.code
      if (code) {
        if (!hasPermission(code)) {
          return next({
            path: '/home/unauthorized',
            query: {
              msg: `你没有权限访问${to?.meta?.title || to.path}页面，点击下方按钮返回首页。`
            }
          })
        }
      }
      next()
    }
  )
}
