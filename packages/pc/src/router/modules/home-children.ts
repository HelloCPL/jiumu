/**
 * @describe: home 页面下的子路由
 * @author: cpl
 * @create: 2022-07-06 15:21:36
 */

import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: 'user',
    name: 'User',
    component: () => import(/* webpackChunkName: "User" */ '@/views/home/user/index.vue')
  },
  {
    path: '/role',
    name: 'Role',
    component: () => import(/* webpackChunkName: "Role" */ '@/views/home/role/index.vue')
  }
]

export default routes
