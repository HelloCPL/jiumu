<!--
  @describe: 角色-用户关联
  @author cpl
  @update 2022-07-30 18:28:23
-->

<template>
  <Dialog title="角色-用户关联" :show-footer="false">
    <PopupTwo
      v-model:keyword="keyword"
      :more-left="total > dataList.length"
      :total="dataList2.length"
      :show-delete="false"
      @search="search"
      @scroll-left="getDataList"
    >
      <!-- 左侧 -->
      <template #left>
        <div v-for="item in dataList" :key="item.id" class="pl-4">
          <ElCheckbox
            :model-value="item._checked"
            :label="item.id"
            :checked="item._checked"
            @update:model-value="changeCheck($event as boolean, item)"
          >
            <GRichText :html="item.username"></GRichText>
            <UsernameShow :text="item.phone" class="pl-2"></UsernameShow>
          </ElCheckbox>
        </div>
      </template>
      <!-- 右侧 -->
      <template #right>
        <div class="px-4 pt-3">
          <span
            v-for="item in dataList2"
            :key="item.id"
            class="text-lighter w-full justify-between flex items-center mb-2"
          >
            <span class="mr-2">
              <GRichText :html="item.username"></GRichText>
              <UsernameShow :text="item.phone" class="pl-2"></UsernameShow>
            </span>
            <ElIcon class="cursor-pointer" @click="deleteRelevance(item)">
              <Close />
            </ElIcon>
          </span>
        </div>
      </template>
    </PopupTwo>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from '@/components/Dialog/index.vue'
import PopupTwo from '@/components/PopupTwo/index.vue'
import { roleInfoProps } from './type'
import { useRoleUser } from '../hooks/use-role-user'
import { ElCheckbox, ElIcon } from 'element-plus'
import { Close } from '@element-plus/icons-vue'
import UsernameShow from '@/components/UsernameShow/index.vue'

const props = defineProps(roleInfoProps)

const { keyword, total, dataList, getDataList, search, dataList2, changeCheck, deleteRelevance } =
  useRoleUser(props)
</script>

<style lang="scss" scoped></style>
