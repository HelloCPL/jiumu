/**
 * @describe: 一级路由
 * @author: cpl
 * @create: 2022-07-06 15:21:36
 */

import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    // 重定向组件 常用于相同页面间的刷新 比 refresh 刷新组件作用范围广
    path: '/redirect',
    name: 'Redirect',
    component: () => import(/* webpackChunkName: "Redirect" */ '@/views/redirect/index.vue')
  },
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
    // 资源详情
    path: '/source-info',
    name: 'SourceInfo',
    component: () => import(/* webpackChunkName: "SourceInfo" */ '@/views/home/source-info/index.vue')
  },
  {
    // 问答详情
    path: '/question-info',
    name: 'QuestionInfo',
    component: () => import(/* webpackChunkName: "QuestionInfo" */ '@/views/home/question-info/index.vue')
  },
  {
    // 连载详情
    path: '/novel-info',
    name: 'NovelInfo',
    component: () => import(/* webpackChunkName: "NovelInfo" */ '@/views/home/novel-info/index.vue')
  },
  {
    path: '/novel-chapter-info',
    name: 'NovelChapterInfo',
    meta: {
      title: '章节详情',
      code: ''
    },
    component: () =>
      import(/* webpackChunkName: "NovelChapterInfo" */ '@/views/home/novel-chapter-info/index.vue')
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
  },
  {
    // MD api 文档
    path: '/mdapi',
    name: 'Mdapi',
    component: () => import(/* webpackChunkName: "Mdapi" */ '@/views/mdapi/index.vue')
  }
]

export default routes
