<script lang="ts" setup>
import { encrypt, decrypt } from '@jiumu/utils'
// 加密
const a = encrypt('123456')
const b = decrypt(a)
console.log(a, b)

// 自定义加密 盐
const c = encrypt('123456', 'hdhdhskksks', 'sjdfhjdsfdhj')
const d = decrypt(c, 'hdhdhskksks', 'sjdfhjdsfdhj') // 解密对应
console.log(c, d)
</script>
