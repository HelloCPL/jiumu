import { useRouter, Router, RouteLocationRaw, RouteLocationNamedRaw } from 'vue-router'

// 给push replace 方法扩展属性 仅在home子路由添加
export const useCustomRouter = () => {
  const router: Router = useRouter()

  // 扩展 push
  const _push = router.push
  router.push = function push(to: RouteLocationRaw) {
    let _to: RouteLocationRaw = to
    if (typeof to === 'string') {
      _to = {
        path: to,
        query: { __routerType: 'push' }
      }
    } else {
      _to = { ...to }
      if ((_to as RouteLocationNamedRaw).name) {
        // @ts-ignore
        _to.params = _to.params || {}
        // @ts-ignore
        _to.params.__routerType = 'push'
      } else {
        _to.query = _to.query || {}
        _to.query.__routerType = 'push'
      }
    }
    return _push.call(this, _to)
  }

  // 扩展 replace
  const _replace = router.replace
  router.replace = function replace(to: RouteLocationRaw) {
    let _to: RouteLocationRaw = to
    if (typeof to === 'string') {
      _to = {
        path: to,
        query: { __routerType: 'replace' }
      }
    } else {
      _to = { ...to }
      if ((_to as RouteLocationNamedRaw).name) {
        // @ts-ignore
        _to.params = _to.params || {}
        // @ts-ignore
        _to.params.__routerType = 'replace'
      } else {
        _to.query = _to.query || {}
        _to.query.__routerType = 'replace'
      }
    }
    return _replace.call(this, _to)
  }
}

// 查找目标路由是否在home范围
// function _findInHomeRoutes(to: RouteLocationRaw, routes: HomeRouteRecord[]): boolean {
//   let flag: boolean = false
//   routes.find((item) => {
//     let bool: boolean = false
//     if (typeof to === 'string') bool = to === item.path
//     else {
//       // @ts-ignore
//       bool = to.name === item.name || to.path === item.path
//     }
//     if (bool) {
//       flag = true
//       return flag
//     }
//   })
//   return flag
// }
