<!--
  @describe: 关于我们组件
  @author: cpl
  @create: 2022-12-30 11:02:19
-->

<template>
  <div class="w-full pt-16 h-80 about-us-container">
    <div class="mb-6 flex justify-center items-center" v-for="(item, index) in dataList" :key="index + 'a'">
      <div
        v-for="(row, i) in item"
        :key="i + 'b'"
        class="flex items-center mr-6"
        :class="{ 'cursor-pointer': row.url, 'hover:text-primary-6': row.url }"
        @click="handleClick(row)"
      >
        <img :src="$STATIC_URL + row.icon" alt="" v-if="row.icon" class="w-4 h-4" />
        <span class="pl-1">{{ row.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

type Info = {
  name: string
  url?: string
  icon?: string
}

// 链接地址
const dataList = ref<Info[][]>([
  [
    { name: '备案号：粤ICP备2022064746号' },
    { name: '工信部链接', url: 'https://beian.miit.gov.cn/' },
    { name: 'Copyright © 2022 Cpl.All rights reserved' }
  ],
  [
    {
      name: '樛木后台管理系统',
      // url: 'https://www.jiumublog.cn/jiumu-pc-prod/',
      icon: '/pc/icons/icon_pc_management2.png'
    },
    {
      name: '樛木PC网',
      // url: 'https://www.jiumublog.cn/jiumu-web-prod/',
      icon: '/pc/icons/icon_pc2.png'
    },
    {
      name: '樛木移动端',
      // url: 'https://www.jiumublog.cn/jiumu-mobile-prod/',
      icon: '/pc/icons/icon_mobile2.png'
    },
    {
      name: '樛木小程序',
      // url: 'https://www.jiumublog.cn/jiumu-wechat-prod/',
      icon: '/pc/icons/icon_program2.png'
    }
  ],
  [
    {
      name: '樛木后台管理系统（测试环境）',
      url: 'https://www.jiumublog.cn/jiumu-pc-test/',
      icon: '/pc/icons/icon_pc_management2.png'
    },
    {
      name: '樛木PC网（测试环境）',
      // url: 'https://www.jiumublog.cn/jiumu-web-test/',
      icon: '/pc/icons/icon_pc2.png'
    },
    {
      name: '樛木移动端（测试环境）',
      // url: 'https://www.jiumublog.cn/jiumu-mobile-test/',
      icon: '/pc/icons/icon_mobile2.png'
    }
  ],
  [
    {
      name: 'github',
      url: 'https://github.com/HelloCPL/',
      icon: '/pc/icons/icon_github2.png'
    }
  ]
])

const handleClick = (item: Info) => {
  if (item.url) {
    window.open(item.url, '_blank')
  }
}
</script>

<style lang="scss" scoped>
.about-us-container {
  background: rgba(1, 0, 0, 0.9);
  color: rgb(180, 180, 180);
}
</style>
