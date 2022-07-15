1. 在 `main.ts` 使用自定义插件

```
import { createApp, App } from 'vue'
import { createPinia, Pinia } from 'pinia'
import AppComponent from './App.vue'
import { usePiniaStoragePlugin } from '@jiumu/utils'

const app: App = createApp(AppComponent)
const pinia: Pinia = createPinia()
// 使用自定义插件
pinia.use(usePiniaStoragePlugin)
app.use(pinia)
app.mount('#app')
```

2. 在定义 `store` 时添加 `storage` 配置参数即可

```
import { defineStore, StoreDefinition } from 'pinia'
export const useTestStore: StoreDefinition = defineStore('myTestId', {
  state: () => {
    return {
      age: 123,
      name: 'xxx'
    }
  },
  storage: {
    enabled: true, // 是否缓存
    // type: 'session', // 缓存类型 默认 session
    // prefix: 'pinia', // 缓存key前缀
    // expire: 60 * 60 * 24, // 缓存有效期 单位 s 每次获取或设置自动更新有效期
    // encrypt: true, // 缓存内容是否加密
    // keys: ['name'] // 指定缓存的key 不填默认缓存所有
  }
})
```