import { Router, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { useUserStore } from '@/store'
/**
 * 路由 beforeEach 拦截
 * 主要对 meta.code 需要权限校验的页面进行校验
 */
export const beforeEach = (router: Router) => {
  router.beforeEach(
    (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      // if (to.meta.code) {
      const store = useUserStore()
      //   const codes = to.meta.code.split(',')
      //   const flag = _hasPermission(codes, store.permissions)
      //   if (!flag) {
      //     // 有token 重定向到无权限页面
      //     if (store.token) {
      //       next({
      //         path: '/authorized'
      //       })
      //     }
      //     else {
      //       // 无token 重定向到登录页面
      //       next({
      //         path: '/login',
      //         query: { redirect: to.path }
      //       })
      //     }
      //     return
      //   }
      // }
      // next()

      // 暂时只做 token 校验
      if (!store.token && to.name !== 'Login') {
        next({
          path: '/login',
          query: { redirect: to.path }
        })
      } else next()
    }
  )
}

// function _hasPermission(codes: string[], permissions: DataPermission[]): boolean {
//   let flag = true
//   const _find = (code: string) => {
//     let flag = false
//     permissions.find((item) => {
//       if (item.code === code) {
//         flag = true
//         return true
//       }
//     })
//     return flag
//   }
//   codes.find((code) => {
//     flag = _find(code)
//     if (!flag) {
//       return true
//     }
//   })

//   return flag
// }
