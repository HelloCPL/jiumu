<!--
  @describe: 侧边栏选项
  @author cpl
  @update 2022-07-10 18:36:21
-->

<template>
  <template v-for="item in data">
    <ElSubMenu v-if="item.children?.length" :key="item.id" :index="item.code">
      <template #title>
        <span class="g-line-1">{{ item.label }}</span>
      </template>
      <sidebar-item :data="item.children"></sidebar-item>
    </ElSubMenu>
    <ElMenuItem :index="item.code" :key="item.id" v-else>
      <span>{{ item.label }}</span>
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
}
withDefaults(defineProps<Props>(), {
  data: () => []
})
</script>
