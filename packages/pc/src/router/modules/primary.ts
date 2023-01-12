/**
 * @describe: 一级路由
 * @author: cpl
 * @create: 2022-07-06 15:21:36
 */

import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    // 登录
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/login/index.vue')
  },
  {
    // 文章详情
    path: '/article-info',
    name: 'ArticleInfo',
    component: () => import(/* webpackChunkName: "ArticleInfo" */ '@/views/home/article-info/index.vue')
  },
  {
    // 问答详情
    path: '/question-info',
    name: 'QuestionInfo',
    component: () => import(/* webpackChunkName: "QuestionInfo" */ '@/views/home/question-info/index.vue')
  },
  {
    // 用户信息
    path: '/user-info',
    name: 'UserInfo',
    component: () => import(/* webpackChunkName: "UserInfo" */ '@/views/home/user-info/index.vue')
  },
  {
    // 无权限提示页面
    path: '/unauthorized',
    name: 'Unauthorized',
    component: () => import(/* webpackChunkName: "Unauthorized" */ '@/views/unauthorized/index.vue')
  },
  {
    // 测试页面
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "Test" */ '@/views/test/index.vue')
  }
]

export default routes
