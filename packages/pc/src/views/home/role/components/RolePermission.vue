<!--
  @describe: 角色-角色关联
  @author cpl
  @update 2022-07-30 18:28:23
-->

<template>
  <Dialog :show-footer="false">
    <template #header>
      <ElRow class="h-12">
        <ElCol
          :span="12"
          class="flex items-center pl-4 cursor-pointer border-r-1 text-lg"
          :class="{ 'role-permission-active': active === 0 }"
          @click="handleActive(0)"
        >
          <span class="g-line-1">已关联权限{{ _label }}</span>
        </ElCol>
        <ElCol
          :span="12"
          class="flex items-center pl-4 cursor-pointer text-lg"
          :class="{ 'role-permission-active': active === 1 }"
          @click="handleActive(1)"
        >
          所有权限
        </ElCol>
      </ElRow>
    </template>
    <!-- 已关联菜单 -->
    <PopupTwo
      :show-left-top="false"
      :more-left="total2 > dataList2.length"
      :span-left="24"
      :show-right="false"
      @scroll-left="getDataList2"
      v-if="active === 0"
    >
      <template #left>
        <div class="px-4 pt-3">
          <span
            v-for="(item, index) in dataList2"
            :key="item.id"
            class="text-lighter w-full justify-between flex items-center mb-2"
          >
            <span class="mr-2">
              <span>{{ item.label }}</span>
              <span class="pl-2">{{ item.code }}</span>
            </span>
            <ElIcon class="cursor-pointer" @click="handleDelete(item, index)">
              <Close />
            </ElIcon>
          </span>
        </div>
      </template>
    </PopupTwo>
    <!-- 所有菜单 -->
    <PopupTwo
      v-model:keyword="keyword"
      :more-left="total > dataList.length"
      :span-left="24"
      :show-right="false"
      @search="search"
      @scroll-left="getDataList"
      v-if="active === 1"
    >
      <template #left>
        <div v-for="item in dataList" :key="item.id" class="pl-4">
          <ElCheckbox
            :model-value="item._checked"
            :label="item.id"
            :checked="item._checked"
            @update:model-value="changeCheck($event as boolean, item)"
          >
            <span>{{ item.label }}</span>
            <span class="pl-2">{{ item.code }}</span>
          </ElCheckbox>
        </div>
      </template>
    </PopupTwo>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from '@/components/Dialog/index.vue'
import PopupTwo from '@/components/PopupTwo/index.vue'
import { roleInfoProps } from './type'
import { useRolePermission } from '../hooks/use-role-permission'
import { ElRow, ElCol, ElCheckbox, ElIcon } from 'element-plus'
import { Close } from '@element-plus/icons-vue'

const props = defineProps(roleInfoProps)

const {
  _label,
  active,
  handleActive,
  keyword,
  total,
  dataList,
  getDataList,
  search,
  changeCheck,
  total2,
  dataList2,
  getDataList2,
  handleDelete
} = useRolePermission(props)
</script>

<style lang="scss" scoped>
.role-permission-active {
  position: relative;
  background: var(--jm-color-bg);
  color: var(--jm-color-primary);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    height: 3px;
    width: 100%;
    background: var(--jm-color-bg);
  }
}
</style>
