import { toPath } from '@jiumu/utils'
import { RouteRecordName, RouteRecordRaw } from 'vue-router'
import homeChildrenRoutes from './modules/home-children'
import primaryRoutes from './modules/primary'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '@/views/home/index.vue'),
    children: homeChildrenRoutes
  },
  ...primaryRoutes
]

export interface HomeRouteRecord {
  path: string
  name?: RouteRecordName
}

/**
 * 仅获取 home 子路由
 * 返回扁平化的 homeRoutes
 */
export const getHomeRoutes = (): HomeRouteRecord[] => {
  const homeRoutes: HomeRouteRecord[] = []
  routes.find((item) => {
    if (item.name === 'Home' && Array.isArray(item.children)) {
      item.children.forEach((list) => {
        if (list.name !== 'Refresh') _addRouteRecord(list, homeRoutes)
      })
      return true
    }
  })
  return homeRoutes
}

function _addRouteRecord(route: RouteRecordRaw, homeRoutes: HomeRouteRecord[], parent?: RouteRecordRaw) {
  const path = parent && !route.path.startsWith('/') ? toPath(parent.path, route.path) : toPath(route.path)
  homeRoutes.push({
    path,
    name: route.name
  })
  if (Array.isArray(route.children)) {
    route.children.forEach((child) => {
      _addRouteRecord(child, homeRoutes, route)
    })
  }
}

/**
 * 判断某个路由是否属于 home 子路由
 */
let _homeRoutes: HomeRouteRecord[] = []
export const isHomeRoutes = (name: any): boolean => {
  if (!_homeRoutes.length) {
    _homeRoutes = getHomeRoutes()
  }
  let flag = false
  _homeRoutes.find((item) => {
    if (item.name === name || item.path === name) {
      flag = true
      return flag
    }
  })
  return flag
}
