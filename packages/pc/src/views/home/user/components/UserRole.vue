<!--
  @describe: 查看用户-角色关联
  @author cpl
  @update 2022-07-30 18:28:23
-->

<template>
  <Dialog width="500px" :title="'查看用户-角色关联' + _username" :show-footer="false">
    <PopupTwo :more-left="total > dataList.length" :show-left-top="false" :show-right="false" :span-left="24"
      height="60vh" @scroll-left="getDataList">
      <!-- 左侧 -->
      <template #left>
        <div class="px-4 pt-3 ">
          <Card v-for="item in dataList" :key="item.id" :title="item.code" :sub-title="item.label" class="mb-3">
          </Card>
        </div>
      </template>
    </PopupTwo>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from '@/components/Dialog/index.vue'
import PopupTwo from '@/components/PopupTwo/index.vue'
import { userInfoProps } from './type'
import { useUserRole } from '../hooks/use-user-role'
import Card from '@/components/Card/index.vue'

const props = defineProps(userInfoProps)

const { _username, total, dataList, getDataList } = useUserRole(props)
</script>
