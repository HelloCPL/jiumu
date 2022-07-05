import { Router, RouteLocationNormalized } from 'vue-router'
import { useKeepAliveStore } from '@/store/keep-alive'
import { KeepAliveOption } from '@/store/keep-alive.interface'
import { getHomeRoutes, HomeRouteRecord } from '@/router/routes'

/**
 * 路由 afterEach 拦截
 * 主要用于home 子页面缓存
 */
export const afterEach = (router: Router) => {
  router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    // 动态修改meta标题
    if (to.params.metaTitle) to.meta.title = <string>to.params.metaTitle
    else if (to.query.metaTitle) to.meta.title = <string>to.query.metaTitle

    // home 子页面缓存
    const homeRoutes = getHomeRoutes()
    const flag = _findInHomeRoutes(to, homeRoutes)
    if (flag) {
      const store = useKeepAliveStore()
      store.handleKeepAlive(_getKParams(to), _getKParams(from))
    }
  })
}

function _getKParams(params: RouteLocationNormalized): KeepAliveOption {
  return {
    name: params.name,
    path: params.path,
    fullPath: params.fullPath,
    hash: params.hash,
    meta: params.meta,
    params: params.params,
    query: params.query
  }
}

// 查找是否在home路由页面
function _findInHomeRoutes(to: RouteLocationNormalized, homeRoutes: HomeRouteRecord[]): boolean {
  let flag = false
  homeRoutes.find((item) => {
    if (to.name === item.name || to.path === item.path) {
      flag = true
      return flag
    }
  })
  return flag
}
