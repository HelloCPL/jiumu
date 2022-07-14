import { Router, RouteLocationNormalized } from 'vue-router'
import { useKeepAliveStore, useNavigationsStore } from '@/store'
import { KeepAliveOption } from '@/store/keep-alive.b'

/**
 * 路由 afterEach 拦截
 * 主要用于home 子页面缓存
 */
export const afterEach = (router: Router) => {
  router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    // 动态修改meta标题
    if (to.params.metaTitle) to.meta.title = <string>to.params.metaTitle
    else if (to.query.metaTitle) to.meta.title = <string>to.query.metaTitle

    // 处理缓存参数
    if (to.params.hasOwnProperty('keepAliveTo')) to.meta.keepAlive = to.params.keepAliveTo === '1'
    else if (to.query.hasOwnProperty('keepAliveTo')) to.meta.keepAlive = to.query.keepAliveTo === '1'
    if (to.params.hasOwnProperty('keepAliveFrom')) from.meta.keepAlive = to.params.keepAliveFrom === '1'
    else if (to.query.hasOwnProperty('keepAliveFrom')) from.meta.keepAlive = to.query.keepAliveFrom === '1'

    // 处理 home 子页面导航栏
    const navigationsStore = useNavigationsStore()
    navigationsStore.handleNavigations(_getKParams(to), _getKParams(from))
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
