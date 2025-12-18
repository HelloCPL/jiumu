<!--
  @describe: 角色-角色关联
  @author cpl
  @update 2022-07-30 18:28:23
-->

<template>
  <Dialog :show-footer="false">
    <!-- 自定义头部 -->
    <template #header>
      <ElRow class="h-12">
        <ElCol :span="12" class="pl-4 pt-3 border-r-1" :class="{ 'role-permission-active': active === 0 }">
          <span class="g-line-1 cursor-pointer" @click.self="handleActive(0)">已关联权限{{ _label }}</span>
        </ElCol>
        <ElCol :span="12" class="pl-4 pt-3" :class="{ 'role-permission-active': active === 1 }">
          <span @click.self="handleActive(1)" class="cursor-pointer">所有权限</span>
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
        <div>
          <Card
            show-close
            title="#"
            v-for="(item, index) in dataList2"
            :key="item.id"
            class="mb-3"
            @close="handleDelete(item, index)"
          >
            <template #header>
              <div class="py-2 flex items-center">
                <span class="text pr-3">{{ item.code }}</span>
                <span class="sub-title"></span>
                <span class="text-lighter pl-3">
                  <PermissionLabel class="text" :html="item.label"></PermissionLabel>
                </span>
              </div>
            </template>
            <div class="text-sm text-lighter">
              <div v-if="item.href && item.href !== '#'" class="pb-2">
                <span>关联接口：</span>
                <span>{{ item.href }}</span>
              </div>
              <div v-if="item.remarks" class="pb-2">
                <span>备注：</span>
                <span>{{ item.remarks }}</span>
              </div>
            </div>
          </Card>
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
        <div>
          <Card
            title="#"
            v-for="item in dataList"
            :key="item.id"
            class="mb-3"
            show-checkbox
            :model-value="item._checked"
            @update:model-value="changeCheck($event as boolean, item)"
          >
            <template #header>
              <div class="py-2 flex items-center">
                <span class="text pr-3">
                  <GRichText :html="item.code"></GRichText>
                </span>
                <span class="sub-title"></span>
                <span class="text-lighter pl-3">
                  <PermissionLabel class="text h-5" :html="item.label"></PermissionLabel>
                </span>
              </div>
            </template>
            <div class="text-sm text-lighter">
              <div v-if="item.href && item.href !== '#'" class="pb-2">
                <span>关联接口：</span>
                <span>{{ item.href }}</span>
              </div>
              <div v-if="item.remarks" class="pb-2">
                <span>备注：</span>
                <span>{{ item.remarks }}</span>
              </div>
            </div>
          </Card>
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
import { ElRow, ElCol } from 'element-plus'
import PermissionLabel from '@/views/home/permission/components/PermissionLabel.vue'
import Card from '@/components/Card/index.vue'

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

.sub-title {
  @apply h-3 relative top-0.5;
  width: 1px;
  background: var(--jm-color-border);
}
</style>
