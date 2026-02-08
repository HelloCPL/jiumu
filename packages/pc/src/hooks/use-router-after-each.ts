import { Router, RouteLocationNormalized } from 'vue-router'
import { useNavigationsStore } from '@/store'

/**
 * 路由 afterEach 拦截
 * 主要用于home 子页面缓存
 */
export const afterEach = (router: Router) => {
  router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    // 动态修改meta标题
    if (to.params._metaTitle) to.meta.title = <string>to.params._metaTitle
    else if (to.query._metaTitle) to.meta.title = <string>to.query._metaTitle

    // 处理缓存参数
    if (to.params.hasOwnProperty('_keepAliveTo')) to.meta.keepAlive = to.params._keepAliveTo === '1'
    else if (to.query.hasOwnProperty('_keepAliveTo')) to.meta.keepAlive = to.query._keepAliveTo === '1'
    if (to.params.hasOwnProperty('_keepAliveFrom')) from.meta.keepAlive = to.params._keepAliveFrom === '1'
    else if (to.query.hasOwnProperty('_keepAliveFrom')) from.meta.keepAlive = to.query._keepAliveFrom === '1'

    // 处理 home 子页面导航栏
    const navigationsStore = useNavigationsStore()
    navigationsStore.handleNavigations(_getKParams(to), _getKParams(from))
  })
}

export function _getKParams(params: RouteLocationNormalized): KeepAliveOption {
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
