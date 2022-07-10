<template>
  <div class="box">
    <el-button @click="click('PingFang')">安安PingFang</el-button>
    <el-button @click="click('Traditional')">Traditional</el-button>
    <p class="tw-text-xs">你哈</p>
    <p class="tw-text-sm">你哈</p>
    <p class="tw-text-base">你哈</p>
    <p class="tw-text-lg">你哈</p>
    <p class="tw-text-xl">你哈</p>
    <p class="tw-text-2xl">你哈</p>
    <p class="tw-text-3xl">会打瞌睡罚款哈款到发货家得福安徽科技的发哈好地方卡大豪科技发挥的发卡机哈加卡迪夫按键电话费卡好地方卡好地方加厚的发行剪短发我也返回哦啊粉红微风哦穷安全哦甲方登录注册你按地方你是典型的</p>
    <p class="tw-text-4xl">你哈</p>
    <!-- <img :src="$STATIC_URL + 'pc/tags.png'" alt=""> -->
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store'
const store = useThemeStore()
store.toggleTheme('light')
setTimeout(() => {
  // const a = store.getRootColor('--jm-color-primary-50')
  // console.log('aaaa', a)


})

const click = (n: string) => {
  store.toggleFontFamily(n)
}

</script>

<style lang="scss" scoped>
  .box {
    // background: url('#{$STATIC_URL}/pc/tags.png');
  }
</style>