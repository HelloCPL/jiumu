## `pc` 管理端说明

- 该项目主要为 `pc` 管理端项目

### `interface` 类型声明规则

- 全局类型，`typings` 目录或以 `*.b.d.ts` 文件声明的类型，可直接使用（遵循无导入无导出规则）

- 按模块导出类型，以 `*.b.ts` 文件声明的类型，需要导入才可使用

- `API` 接口返回数据类型声明以 `Data*` 开头

- 其他接口类型声明根据需要自定义名称

### 页面缓存

- 只对 `home` 子页面进行缓存，`home` 子页面默认前进缓存、后退刷新，可跳转路由时手动规定是否缓存

- 缓存方法说明

  1. 直接在路由定义时设置 `meta.keepAlive` , 如 `meta: { keepAlive: true }`

  2. 路由跳转时设置 `keepAliveTo` 或 `keepAliveFrom` 参数，'1' 缓存 '0' 不缓存，如
  ```
  router.push({
    name: 'User',
    params: {
      keepAliveTo: '1'
    }
  })
  ```

  ### 静态资源

  - 项目静态资源单独放在 `jiumu-static` 项目中

  - 在 `.vue` 文件使用 `<img :src="$STATIC_URL + 'pc/tags.png'" alt=""> `

  - 在 `.scss` 文件使用 `background: url('#{$STATIC_URL}/pc/tags.png'); `

  ### css 说明

  - 本项目主要使用 `tailwind.css`

  - 有关颜色的变量使用遵循 `element-plus` 颜色变量规则

  
