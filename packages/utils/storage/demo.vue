<script lang="ts" setup>
import { storage } from '@jiumu/utils'
// 缓存 可缓存任何类型的值
storage.setItem('num', 123)
storage.setItem('bool', true)
storage.setItem('str', 'abc')
storage.setItem('arr', [123, 'abc'])
storage.setItem('obj', { a: 123 })
// 获取指定缓存 会自动转成原始值
const num = storage.getItem('num') // 123
const bool = storage.getItem('bool') // true
const str = storage.getItem('str') // 'abc'
const arr = storage.getItem('arr') // [123, 'abc']
const obj = storage.getItem('obj') // { a: 123 }
// 移除某个指定的缓存
storage.removeItem('num')
// 清除所有缓存
storage.clear()
// 配置项
storage.setItem('a', 123, {
  type: 'local', // 缓存类型 默认 local
  prefix: 'gggg', // 缓存key前缀
  expire: 60 * 60, // 缓存有效期 单位 s 每次获取或设置自动更新有效期
  encrypt: true // 缓存内容是否加密
})
</script>
