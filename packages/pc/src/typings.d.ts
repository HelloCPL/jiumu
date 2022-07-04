
// typings.d.ts or router.ts
import 'vue-router'
declare module 'vue-router' {
  interface RouteMeta {
    title?: string // 标题
    keepAlive?: boolean // 是否缓存
    code?: string // 页面权限code 如果填写就需要相应权限的code 多个用逗号隔开
  }
}

// import 'vue-router'
// declare module 'vue-router' {
//   export interface RouteMeta {
//     title?: string // 标题
//     keepAlive?: boolean // 是否缓存
//     code?: string // 页面权限code 如果填写就需要相应权限的code 多个用逗号隔开
//   }
// }
