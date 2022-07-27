### xss 字段过滤规则用法说明

```
import xss from '@jiumu/utils'
let h = '<p>哈哈</p>'

h = xss.process(h)
```