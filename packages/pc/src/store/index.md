### 使用说明

- `store ` 会在 `index.ts` 统一导出，推荐按需使用，如

```
// any file
import { useUserStore, useKeepAliveStore } from '@/store'
const userStore = useUserStore()
const keepAliveStore = useKeepAliveStore()
// ...
```

### `Store` 公共状态类型说明

- 文件类型声明命名 `type.d.ts`

- 接口类型全局使用

```
// any file
const obj: KeepAliveOption = { ... }
```