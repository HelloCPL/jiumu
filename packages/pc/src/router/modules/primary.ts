/**
 * @describe: 一级路由
 * @author: cpl
 * @create: 2022-07-06 15:21:36
 */

import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/login/index.vue')
  },
  {
    path: '/article-info',
    name: 'ArticleInfo',
    component: () => import(/* webpackChunkName: "ArticleInfo" */ '@/views/home/article-info/index.vue')
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: () => import(/* webpackChunkName: "Unauthorized" */ '@/views/unauthorized/index.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "Test" */ '@/views/test/index.vue')
  }
]

export default routes
