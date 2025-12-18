<!--
  @describe: 查看权限-用户关联
  @author cpl
  @update 2022-07-30 18:28:23
-->

<template>
  <Dialog width="500px" :title="'查看权限-用户关联' + _label" :show-footer="false">
    <PopupTwo
      :more-left="total > dataList.length"
      :show-right="false"
      :span-left="24"
      height="60vh"
      @scroll-left="getDataList"
    >
      <template #leftTop>
        <ElAlert
          description="权限仅跟角色关联，如要修改用户的权限列表请在角色管理中修改“角色-权限”之间的关联。"
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
              <GRichText :html="item.username"></GRichText>
              <UsernameShow :text="item.phone" class="pl-2"></UsernameShow>
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
import { permissionInfoProps } from './type'
import { usePermissionUser } from '../hooks/use-permission-user'
import UsernameShow from '@/components/UsernameShow/index.vue'
import { Warning } from '@element-plus/icons-vue'
import { ElAlert } from 'element-plus'

const props = defineProps(permissionInfoProps)

const { _label, total, dataList, getDataList } = usePermissionUser(props)
</script>
