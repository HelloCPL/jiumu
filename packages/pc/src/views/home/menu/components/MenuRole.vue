<!--
  @describe: 查看菜单-角色关联
  @author cpl
  @update 2022-07-30 18:28:23
-->

<template>
  <Dialog width="500px" :title="'查看菜单-角色关联（' + label + '）'" :show-footer="false">
    <PopupTwo
      :more-left="total > dataList.length"
      :show-right="false"
      :span-left="24"
      height="60vh"
      @scroll-left="getDataList"
    >
      <template #leftTop>
        <ElAlert
          description="如要修改角色的菜单列表请在角色管理中修改“角色-菜单”之间的关联。"
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
        <div class="px-4 pt-4">
          <span
            v-for="item in dataList"
            :key="item.id"
            class="text-lighter w-full justify-between flex items-center mb-2"
          >
            <span class="mr-2">
              <span>{{ item.label }}</span>
              <span class="pl-2">{{ item.code }}</span>
            </span>
          </span>
        </div>
      </template>
    </PopupTwo>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from '@/components/Dialog/index.vue'
import PopupTwo from '@/components/PopupTwo/index.vue'
import { menuInfoProps } from './type'
import { useMenuRole } from '../hooks/use-menu-role'
import { Warning } from '@element-plus/icons-vue'
import { ElAlert } from 'element-plus'

const props = defineProps(menuInfoProps)

const { total, dataList, getDataList } = useMenuRole(props)
</script>
