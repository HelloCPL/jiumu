<!--
  @describe: 角色-角色关联
  @author cpl
  @update 2022-07-30 18:28:23
-->

<template>
  <Dialog :title="'角色-菜单关联' + _label" :show-footer="false" width="500px">
    <PopupTwo :span-left="24" :show-right="false" height="60vh">
      <template #leftTop>
        <ElAlert
          description="“角色-菜单”新增关联时必须先关联其父级，删除关联时必须先删除其所有子级"
          type="error"
          show-icon
          :closable="false"
          style="z-index: 10"
        >
          <template #icon>
            <Warning />
          </template>
        </ElAlert>
      </template>
      <!-- 左侧 -->
      <template #left>
        <div class="pl-4 pt-2 role-menu-box">
          <ElTree
            :data="dataList"
            :show-checkbox="hasPermission('pc:role:menu:relevant:btn')"
            default-expand-all
            check-strictly
            node-key="id"
            ref="refTree"
            @check-change="changeCheck"
            :render-content="renderContent"
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
import { Warning } from '@element-plus/icons-vue'
import { ElAlert } from 'element-plus'
import { hasPermission } from '@/utils/permission'

const props = defineProps(roleInfoProps)

const { _label, dataList, refTree, changeCheck } = useRoleMenu(props)

const renderContent = (h: any, { data }: any) => {
  return h('span', [h('span', {}, [data.label]), h('span', { class: 'text-lighter pl-4' }, [data.code])])
}
</script>

<style lang="scss">
.role-menu-box {
  .el-tree {
    background-color: var(--jm-color-bg-white);
  }

  .el-tree-node:focus > .el-tree-node__content,
  .el-tree-node__content:hover {
    background-color: var(--jm-color-bg-white);
  }
}
</style>
