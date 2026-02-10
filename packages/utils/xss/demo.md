### xss 字段过滤规则用法说明

```
import {xss} from '@jiumu/utils'
let h = '<a href="https://baidu.com/xx">哈哈</p>'

h = xss.process(h)
```