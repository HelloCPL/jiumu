/**
 * @describe: home 页面下的子路由
 * @author: cpl
 * @create: 2022-07-06 15:21:36
 */

import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    // 特殊的刷新页面
    path: 'refresh',
    name: 'Refresh',
    component: () => import(/* webpackChunkName: "Refresh" */ '@/views/home/refresh/index.vue')
  },
  {
    path: 'user',
    name: 'User',
    meta: {
      title: '用户管理',
      code: ''
    },
    component: () => import(/* webpackChunkName: "User" */ '@/views/home/user/index.vue')
  },
  {
    path: '/role',
    name: 'Role',
    meta: {
      title: '角色管理',
      code: ''
    },
    component: () => import(/* webpackChunkName: "Role" */ '@/views/home/role/index.vue')
  },
  {
    path: '/menu',
    name: 'Menu',
    meta: {
      title: '菜单管理',
      code: ''
    },
    component: () => import(/* webpackChunkName: "Menu" */ '@/views/home/menu/index.vue')
  },
  {
    path: '/permission',
    name: 'Permission',
    meta: {
      title: '权限管理',
      code: ''
    },
    component: () => import(/* webpackChunkName: "Permission" */ '@/views/home/permission/index.vue')
  },
  {
    path: '/tag',
    name: 'Tag',
    meta: {
      title: '系统标签管理',
      code: ''
    },
    component: () => import(/* webpackChunkName: "Tag" */ '@/views/home/tag/index.vue')
  },
  {
    path: '/classify-me',
    name: 'ClassifyMe',
    meta: {
      title: '我的自定义标签',
      code: ''
    },
    component: () => import(/* webpackChunkName: "ClassifyMe" */ '@/views/home/classify-me/index.vue')
  },
  {
    path: '/classify',
    name: 'Classify',
    meta: {
      title: '所有自定义标签',
      code: ''
    },
    component: () => import(/* webpackChunkName: "Classify" */ '@/views/home/classify/index.vue')
  },
  {
    path: '/ariticle-me-draft',
    name: 'AriticleMeDraft',
    meta: {
      title: '我的文章草稿箱',
      code: ''
    },
    component: () =>
      import(/* webpackChunkName: "AriticleMeDraft" */ '@/views/home/ariticle-me-draft/index.vue')
  },
  {
    path: '/ariticle-me',
    name: 'AriticleMe',
    meta: {
      title: '我的文章',
      code: ''
    },
    component: () => import(/* webpackChunkName: "AriticleMe" */ '@/views/home/ariticle-me/index.vue')
  },
  {
    path: '/ariticle',
    name: 'Ariticle',
    meta: {
      title: '所有文章',
      code: ''
    },
    component: () => import(/* webpackChunkName: "Ariticle" */ '@/views/home/ariticle/index.vue')
  },
  {
    path: '/source-me',
    name: 'SourceMe',
    meta: {
      title: '我的资源',
      code: ''
    },
    component: () => import(/* webpackChunkName: "SourceMe" */ '@/views/home/source-me/index.vue')
  },
  {
    path: '/source',
    name: 'Source',
    meta: {
      title: '所有资源',
      code: ''
    },
    component: () => import(/* webpackChunkName: "Source" */ '@/views/home/source/index.vue')
  },
  {
    path: '/question-me-draft',
    name: 'QuestionMeDraft',
    meta: {
      title: '我的问答草稿箱',
      code: ''
    },
    component: () =>
      import(/* webpackChunkName: "QuestionMeDraft" */ '@/views/home/question-me-draft/index.vue')
  },
  {
    path: '/question-me',
    name: 'QuestionMe',
    meta: {
      title: '我的问答',
      code: ''
    },
    component: () => import(/* webpackChunkName: "QuestionMe" */ '@/views/home/question-me/index.vue')
  },
  {
    path: '/question',
    name: 'Question',
    meta: {
      title: '所有问答',
      code: ''
    },
    component: () => import(/* webpackChunkName: "Question" */ '@/views/home/question/index.vue')
  },
  {
    path: '/novel-me-draft',
    name: 'NovelMeDraft',
    meta: {
      title: '我的连载草稿箱',
      code: ''
    },
    component: () => import(/* webpackChunkName: "NovelMeDraft" */ '@/views/home/novel-me-draft/index.vue')
  },
  {
    path: '/novel-me',
    name: 'NovelMe',
    meta: {
      title: '我的连载',
      code: ''
    },
    component: () => import(/* webpackChunkName: "NovelMe" */ '@/views/home/novel-me/index.vue')
  },
  {
    path: '/novel',
    name: 'Novel',
    meta: {
      title: '所有连载',
      code: ''
    },
    component: () => import(/* webpackChunkName: "Novel" */ '@/views/home/novel/index.vue')
  },
  {
    path: '/collection-me',
    name: 'CollectionMe',
    meta: {
      title: '我的收藏',
      code: ''
    },
    component: () => import(/* webpackChunkName: "CollectionMe" */ '@/views/home/collection-me/index.vue')
  }
]

export default routes
