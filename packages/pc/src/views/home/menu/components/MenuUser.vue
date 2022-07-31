<!--
  @describe: 查看菜单-用户关联
  @author cpl
  @update 2022-07-30 18:28:23
-->

<template>
  <Dialog width="400px" title="查看菜单-用户关联" :show-footer="false">
    <PopupTwo
      :more-left="total > dataList.length"
      :show-left-top="false"
      :show-right="false"
      :span-left="24"
      height="60vh"
      @scroll-left="getDataList"
    >
      <!-- 左侧 -->
      <template #left>
        <div class="px-4 pt-3">
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
import { menuInfoProps } from './type'
import { useMenuUser } from '../hooks/use-menu-user'
import UsernameShow from '@/components/UsernameShow/index.vue'

const props = defineProps(menuInfoProps)

const { total, dataList, getDataList } = useMenuUser(props)
</script>
