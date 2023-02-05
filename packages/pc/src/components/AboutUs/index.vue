<!--
  @describe: 关于我们组件
  @author: cpl
  @create: 2022-12-30 11:02:19
-->

<template>
  <div class="w-full pt-16 h-80 about-us-container" v-if="!lock">
    <div class="mb-6 flex justify-center items-center" v-for="(item, index) in dataList" :key="index + 'a'">
      <div
        v-for="(row, i) in item"
        :key="i + 'b'"
        class="flex items-center mr-6"
        :class="{ 'cursor-pointer': row.url, 'hover:text-primary-6': row.url }"
        @click="handleClick(row)"
      >
        <IconSvg :name="row.iconName" width="14" v-if="row.iconName"></IconSvg>
        <span class="pl-1">{{ row.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import IconSvg from '@/components/IconSvg'

type Info = {
  name: string
  url?: string
  iconName?: string
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
      iconName: 'pcManagement'
    },
    {
      name: '樛木PC网',
      // url: 'https://www.jiumublog.cn/jiumu-web-prod/',
      iconName: 'pc'
    },
    {
      name: '樛木移动端',
      // url: 'https://www.jiumublog.cn/jiumu-mobile-prod/',
      iconName: 'phone'
    },
    {
      name: '樛木小程序',
      // url: 'https://www.jiumublog.cn/jiumu-wechat-prod/',
      iconName: 'program'
    }
  ],
  [
    {
      name: '樛木后台管理系统（测试环境）',
      url: 'https://www.jiumublog.cn/jiumu-pc-test/',
      iconName: 'pcManagement'
    },
    {
      name: '樛木PC网（测试环境）',
      // url: 'https://www.jiumublog.cn/jiumu-web-test/',
      iconName: 'pc'
    },
    {
      name: '樛木移动端（测试环境）',
      // url: 'https://www.jiumublog.cn/jiumu-mobile-test/',
      iconName: 'phone'
    }
  ],
  [
    {
      name: 'github',
      url: 'https://github.com/HelloCPL/',
      iconName: 'github'
    }
  ]
])

const handleClick = (item: Info) => {
  if (item.url) {
    window.open(item.url, '_blank')
  }
}

const lock = ref(true)
setTimeout(() => {
  lock.value = false
}, 1500)
</script>

<style lang="scss" scoped>
.about-us-container {
  background: rgba(1, 0, 0, 0.9);
  color: rgb(180, 180, 180);
}
</style>
