### 说明

- 该目录下的方法为 `pc` `web` `mobile` 多个项目共用的公共方法

- 所有方法在 `index.ts` 中统一导出，使用按需导入，如

```
// any file
import { encrypt } from '@jiumu/utils'
```
