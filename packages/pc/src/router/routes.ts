import { findIndex, toPath } from '@jiumu/utils'
import { RouteRecordName, RouteRecordRaw } from 'vue-router'
import homeChildrenRoutes from './modules/home-children'
import primaryRoutes from './modules/primary'
import { isArray } from 'lodash-es'
import { useNavigationsStore } from '@/store'

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

type CodeLabel = {
  code: string
  label: string
}

/**
 * 根据菜单管理动态修改 home 子路由的名称
 */
export const updateHomesMetaByMenus = (menus: DataMenu[]) => {
  const getMenus = (list: CodeLabel[], menus: DataMenu[]) => {
    if (isArray(menus)) {
      for (let i = 0; i < menus.length; i++) {
        const menu = menus[i]
        const index = findIndex(list, (item) => item.code === menu.code)
        if (index == -1) {
          list.push({
            code: menu.code,
            label: menu.label
          })
        }
        if (isArray(menu.children) && menu.children.length) {
          getMenus(list, menu.children)
        }
      }
    }
  }
  const list: CodeLabel[] = []
  getMenus(list, menus)
  const handleRoutes = (list: CodeLabel[], routes: Array<RouteRecordRaw | KeepAliveOption>) => {
    list.forEach((item) => {
      const index = findIndex(routes, (row) => row.name === item.code)
      if (index !== -1 && routes[index].meta) {
        routes[index].meta.title = item.label
      }
    })
  }
  // 更新 home 子路由
  handleRoutes(list, routes[0].children as RouteRecordRaw[])
  // 更新中间导航栏菜单名称
  const navigationsStore = useNavigationsStore()
  handleRoutes(list, navigationsStore.navigations)
}
