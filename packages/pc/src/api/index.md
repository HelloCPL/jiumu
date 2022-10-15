### 使用说明

- `API ` 接口不使用自动引入，且不做 `index.ts` 统一导出，推荐按需按文件使用，如

```
// any file
import { login } from '@/api/user'
```

### `API` 数据接口类型说明

- 文件类型声明命名 `*.b.d.ts` 可直接使用，如

```
// any file
const data: ParamsArticleList = { ... }
```

- 参数型接口以 `Params` 开头的驼峰命名法，接口数据返回类型以 `Data` 开头的驼峰命名法
