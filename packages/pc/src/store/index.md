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

- 文件类型声明命名 `*.b.ts`

- 接口类型以模块形式导出，使用按需导入，如

```
// any file
import { KeepAliveOption } from '@/store/keep-alive.b'
const obj: KeepAliveOption = { ... }
```