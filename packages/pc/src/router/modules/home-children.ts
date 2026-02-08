/**
 * @describe: home 页面下的子路由
 * @author: cpl
 * @create: 2022-07-06 15:21:36
 */

import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    // 特殊的刷新页面 常用于 home 下的页面刷新
    path: 'refresh',
    name: 'Refresh',
    component: () => import('@/views/home/refresh/index.vue')
  },
  {
    path: 'user',
    name: 'User',
    meta: {
      title: '用户管理',
      code: 'pc:user:page'
    },
    component: () => import('@/views/home/user/index.vue')
  },
  {
    path: '/role',
    name: 'Role',
    meta: {
      title: '角色管理',
      code: 'pc:role:page'
    },
    component: () => import('@/views/home/role/index.vue')
  },
  {
    path: '/menu',
    name: 'Menu',
    meta: {
      title: '菜单管理',
      code: 'pc:menu:page'
    },
    component: () => import('@/views/home/menu/index.vue')
  },
  {
    path: '/permission',
    name: 'Permission',
    meta: {
      title: '权限管理',
      code: 'pc:permission:page'
    },
    component: () => import('@/views/home/permission/index.vue')
  },
  {
    path: '/tag',
    name: 'Tag',
    meta: {
      title: '系统标签管理',
      code: 'pc:tag:page'
    },
    component: () => import('@/views/home/tag/index.vue')
  },
  {
    path: '/classify-me',
    name: 'ClassifyMe',
    meta: {
      title: '我的自定义标签',
      code: 'pc:classify:me:page'
    },
    component: () => import('@/views/home/classify-me/index.vue')
  },
  {
    path: '/article-me-draft',
    name: 'ArticleMeDraft',
    meta: {
      title: '我的文章草稿箱',
      code: 'pc:article:me:draft:page'
    },
    component: () => import('@/views/home/article-me-draft/index.vue')
  },
  {
    path: '/article-me',
    name: 'ArticleMe',
    meta: {
      title: '我的文章',
      code: 'pc:article:me:page'
    },
    component: () => import('@/views/home/article-me/index.vue')
  },
  {
    path: '/article',
    name: 'Article',
    meta: {
      title: '所有文章',
      code: 'pc:article:public:page'
    },
    component: () => import('@/views/home/article/index.vue')
  },
  {
    path: '/article-add',
    name: 'ArticleAdd',
    meta: {
      title: '新增文章',
      code: 'pc:article:add:page'
    },
    component: () => import('@/views/home/article-add/index.vue')
  },
  {
    path: '/source-me',
    name: 'SourceMe',
    meta: {
      title: '我的资源',
      code: 'pc:source:me:page'
    },
    component: () => import('@/views/home/source-me/index.vue')
  },
  {
    path: '/source',
    name: 'Source',
    meta: {
      title: '所有资源',
      code: 'pc:source:public:page'
    },
    component: () => import('@/views/home/source/index.vue')
  },
  {
    path: '/source-add',
    name: 'SourceAdd',
    meta: {
      title: '资源新增',
      code: 'pc:source:add:page'
    },
    component: () => import('@/views/home/source-add/index.vue')
  },
  {
    path: '/question-me-draft',
    name: 'QuestionMeDraft',
    meta: {
      title: '我的问答草稿箱',
      code: 'pc:question:me:draft:page'
    },
    component: () => import('@/views/home/question-me-draft/index.vue')
  },
  {
    path: '/question-me',
    name: 'QuestionMe',
    meta: {
      title: '我的问答',
      code: 'pc:question:me:page'
    },
    component: () => import('@/views/home/question-me/index.vue')
  },
  {
    path: '/question',
    name: 'Question',
    meta: {
      title: '所有问答',
      code: 'pc:question:public:page'
    },
    component: () => import('@/views/home/question/index.vue')
  },
  {
    path: '/question-add',
    name: 'QuestionAdd',
    meta: {
      title: '问答新增',
      code: 'pc:question:add:page'
    },
    component: () => import('@/views/home/question-add/index.vue')
  },
  {
    path: '/novel-me-draft',
    name: 'NovelMeDraft',
    meta: {
      title: '我的连载草稿箱',
      code: 'pc:novel:me:draft:page'
    },
    component: () => import('@/views/home/novel-me-draft/index.vue')
  },
  {
    path: '/novel-me',
    name: 'NovelMe',
    meta: {
      title: '我的连载',
      code: 'pc:novel:me:page'
    },
    component: () => import('@/views/home/novel-me/index.vue')
  },
  {
    path: '/novel',
    name: 'Novel',
    meta: {
      title: '所有连载',
      code: 'pc:novel:public:page'
    },
    component: () => import('@/views/home/novel/index.vue')
  },
  {
    path: '/novel-add',
    name: 'NovelAdd',
    meta: {
      title: '连载新增',
      code: 'pc:novel:add:page'
    },
    component: () => import('@/views/home/novel-add/index.vue')
  },
  {
    path: '/novel-chapter',
    name: 'NovelChapter',
    meta: {
      title: '章节列表',
      code: 'pc:novel:chapter:page'
    },
    component: () => import('@/views/home/novel-chapter/index.vue')
  },
  {
    path: '/novel-chapter-add',
    name: 'NovelChapterAdd',
    meta: {
      title: '章节新增',
      code: 'pc:novel:chapter:add:page'
    },
    component: () => import('@/views/home/novel-chapter-add/index.vue')
  },
  {
    path: '/collection-me',
    name: 'CollectionMe',
    meta: {
      title: '我的收藏',
      code: 'pc:collection:me:page'
    },
    component: () => import('@/views/home/collection-me/index.vue')
  },
  {
    path: '/cipher-me',
    name: 'CipherMe',
    meta: {
      title: '我的口令',
      code: 'pc:cipher:me:page'
    },
    component: () => import('@/views/home/cipher-me/index.vue')
  },
  {
    // 无权限提示页面
    path: '/home/unauthorized',
    name: 'HomeUnauthorized',
    component: () => import('@/views/unauthorized/index.vue')
  },
]

export default routes
