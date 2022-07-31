<!--
  @describe: 角色-角色关联
  @author cpl
  @update 2022-07-30 18:28:23
-->

<template>
  <Dialog title="角色-菜单关联" :show-footer="false" width="400px">
    <PopupTwo :span-left="24" :show-right="false" height="60vh">
      <template #leftTop>
        <p class="py-2 px-4 text-sm text-lighter">
          <span class="text-danger">注意：</span>新增关联时必须先关联其父级，删除关联时必须先删除其所有子级
        </p>
      </template>
      <!-- 左侧 -->
      <template #left>
        <div class="pl-4 role-menu-box">
          <ElTree
            :data="dataList"
            show-checkbox
            default-expand-all
            check-strictly
            node-key="id"
            ref="refTree"
            @check-change="changeCheck"
          ></ElTree>
        </div>
      </template>
    </PopupTwo>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from '@/components/Dialog/index.vue'
import PopupTwo from '@/components/PopupTwo/index.vue'
import { roleInfoProps } from './type'
import { useRoleMenu } from '../hooks/use-role-menu'
import { ElTree } from 'element-plus'

const props = defineProps(roleInfoProps)

const { dataList, refTree, changeCheck } = useRoleMenu(props)
</script>

<style lang="scss">
.role-menu-box {
  .el-tree {
    background-color: var(--jm-color-bg);
  }
  .el-tree-node:focus > .el-tree-node__content,
  .el-tree-node__content:hover {
    background-color: var(--jm-color-bg);
  }
}
</style>
