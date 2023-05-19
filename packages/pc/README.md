## `pc` 管理端说明

- 该项目主要为 `pc` 管理端项目

### `interface | type` 类型声明规则

- 全局类型，`typings` 目录或以 `*.b.d.ts` 文件声明的类型，可直接使用（遵循无导入无导出规则）

- 按模块导出类型，以 `*.b.ts` 文件声明的类型，需要导入才可使用

- `API` 接口返回数据类型声明以 `Data*` 开头，接口参数类型以 `Params*` 开头

- 其他接口类型声明根据需要自定义名称

### 路由说明

#### 路由页面缓存

- 只对 `home` 子页面进行缓存，`home` 子页面默认前进的页面刷新、后退的页面缓存，可跳转路由时手动规定是否缓存

- 缓存使用方法说明

  1. 直接在路由定义时设置 `meta.keepAlive` , 如 `meta: { keepAlive: true }`

  2. 路由跳转时设置 `_keepAliveTo` 或 `_keepAliveFrom` 参数，'1' 缓存 其他 不缓存，注意：该优先级高于方法1
  ```
  router.push({
    name: 'User',
    params: {
      _keepAliveTo: '1'
    }
  })
  ```

  #### 路由跳转

  - 正常使用 `vue-router` 插件方法即可，但跳转时新增了4个特殊参数

    1. `_metaTitle` 动态设置 `home` 页面标题

    2. `_keepAliveTo` 动态设置目标页面是否缓存，'1' 缓存 其他 不缓存

    3. `_keepAliveFrom` 动态设置 `from` 前页面是否缓存，'1' 缓存 其他 不缓存

    4. `_refreshOne` 动态设置目标页面仅更新一次 '1' 更新 其他不更新

  ### 静态资源

  - 项目静态资源单独放在 `jiumu-static` 项目中

  - 在 `.vue` 文件使用 `<img :src="$STATIC_URL + 'pc/tags.png'" alt=""> `

  - 在 `.scss` 文件使用 `background: url('#{$STATIC_URL}/pc/tags.png'); `

  ### css 说明

  - 本项目主要使用 `tailwind.css`

  - 有关颜色的变量使用遵循 `element-plus` 颜色变量规则

tab 栏关闭优化
