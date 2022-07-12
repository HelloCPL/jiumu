<!--
  @describe: 侧边栏选项
  @author cpl
  @update 2022-07-10 18:36:21
-->

<template>
  <template v-for="(item, index) in data">
    <ElSubMenu v-if="item.children?.length" :key="item.id" :index="item.code">
      <template #title>
        <template v-if="collapse && item.label.length > 2"> {{ item.label.substring(0, 2) }}... </template>
        <template v-else>{{ item.label }}</template>
      </template>
      <sidebar-item :data="item.children" :collapse="false"></sidebar-item>
    </ElSubMenu>
    <ElMenuItem :index="item.code" :key="item.id + index" v-else>
      <template v-if="collapse && item.label.length > 2"> {{ item.label.substring(0, 2) }}... </template>
      <template v-else>{{ item.label }}</template>
    </ElMenuItem>
  </template>
</template>

<script setup lang="ts">
import { ElSubMenu, ElMenuItem } from 'element-plus'

defineOptions({
  name: 'SidebarItem'
})

type Props = {
  data: DataMenu[]
  collapse: boolean
}

withDefaults(defineProps<Props>(), {
  data: () => []
})
</script>
