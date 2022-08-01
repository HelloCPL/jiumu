<!--
  @describe: 查看用户-权限关联
  @author cpl
  @update 2022-07-30 18:28:23
-->

<template>
  <Dialog width="500px" :title="'查看用户-权限关联' + _username" :show-footer="false">
    <PopupTwo
      :more-left="total > dataList.length"
      :show-right="false"
      :span-left="24"
      height="60vh"
      @scroll-left="getDataList"
    >
      <template #leftTop>
        <p class="px-4 text-sm text-lighter">
          <span class="text-danger">注意：</span>
          <span>权限仅跟角色关联，如要修改用户的权限列表请在角色管理中修改“角色-权限”之间的关联。</span>
        </p>
      </template>
      <!-- 左侧 -->
      <template #left>
        <div class="px-4 pt-3">
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
import { userInfoProps } from './type'
import { useUserPermission } from '../hooks/use-user-permission'

const props = defineProps(userInfoProps)

const { _username, total, dataList, getDataList } = useUserPermission(props)
</script>
