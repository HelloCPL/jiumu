<!--
  @describe: 查看用户-菜单关联
  @author cpl
  @update 2022-07-30 18:28:23
-->

<template>
  <Dialog width="500px" :title="'查看用户-菜单关联' + _username" :show-footer="false">
    <PopupTwo :show-right="false" :span-left="24" height="60vh" :show-more="false" @scroll-left="getDataList">
      <template #leftTop>
        <p class="px-4 text-sm text-lighter">
          <span class="text-danger">注意：</span>
          <span>菜单仅跟角色关联，如要修改用户的菜单列表请在角色管理中修改“角色-菜单”之间的关联。</span>
        </p>
      </template>
      <!-- 左侧 -->
      <template #left>
        <div class="pl-4 user-menu-box">
          <ElTree
            :data="dataList"
            default-expand-all
            check-strictly
            node-key="id"
            :render-content="renderContent"
          >
            <!-- <template #default="node">
              <span>{{ node }}</span>
            </template> -->
          </ElTree>
        </div>
      </template>
    </PopupTwo>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from '@/components/Dialog/index.vue'
import PopupTwo from '@/components/PopupTwo/index.vue'
import { userInfoProps } from './type'
import { useUserMenu } from '../hooks/use-user-menu'
import { ElTree } from 'element-plus'

const props = defineProps(userInfoProps)

const { _username, dataList, getDataList } = useUserMenu(props)

const renderContent = (h: any, { data }: any) => {
  return h('span', [h('span', {}, [data.label]), h('span', { class: 'text-lighter pl-4' }, [data.code])])
}
</script>

<style lang="scss">
.user-menu-box {
  .el-tree {
    // background-color: var(--jm-color-bg);
  }
  .el-tree-node:focus > .el-tree-node__content,
  .el-tree-node__content:hover {
    background-color: var(--jm-color-bg);
  }
}
</style>
