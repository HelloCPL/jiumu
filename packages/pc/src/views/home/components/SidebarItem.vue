<!--
  @describe: 侧边栏选项
  @author cpl
  @update 2022-07-10 18:36:21
-->

<template>
  <template v-for="item in data">
    <ElSubMenu v-if="item.children?.length" :key="item.id" :index="item.code">
      <template #title>
        <span>{{ item.label }}</span>
      </template>
      <sidebar-item :data="item.children"></sidebar-item>
    </ElSubMenu>
    <ElMenuItem :index="item.code" :key="item.id" v-else>
      {{ item.label }}
    </ElMenuItem>
  </template>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'SidebarItem'
})

interface Props {
  data: DataMenu[]
}

const props = withDefaults(defineProps<Props>(), {
  data: () => []
})
</script>
