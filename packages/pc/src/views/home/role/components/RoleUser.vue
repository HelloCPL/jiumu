<!--
  @describe: 角色-用户关联
  @author cpl
  @update 2022-07-30 18:28:23
-->

<template>
  <Dialog :title="'角色-用户关联' + _label" :show-footer="false">
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
        <div v-for="item in dataList" :key="item.id" class="pl-2">
          <ElCheckbox
            :model-value="item._checked"
            :label="item.id"
            :checked="item._checked"
            :disabled="!hasPermission('pc:role:user:relevant:btn')"
            @update:model-value="changeCheck($event as boolean, item)"
          >
            <GRichText :html="item.username"></GRichText>
            <UsernameShow :text="item.phone" class="pl-2"></UsernameShow>
          </ElCheckbox>
        </div>
      </template>
      <!-- 右侧 -->
      <template #right>
        <div class="pl-4 pt-4">
          <Card
            :title="item.username"
            :sub-title="item.phone"
            :show-close="hasPermission('pc:role:user:relevant:btn')"
            v-for="item in dataList2"
            :key="item.id"
            class="mb-4"
            @close="deleteRelevance(item)"
          >
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
import { useRoleUser } from '../hooks/use-role-user'
import { ElCheckbox } from 'element-plus'
import UsernameShow from '@/components/UsernameShow/index.vue'
import Card from '@/components/Card/index.vue'
import { hasPermission } from '@/utils/permission'

const props = defineProps(roleInfoProps)

const { _label, keyword, total, dataList, getDataList, search, dataList2, changeCheck, deleteRelevance } =
  useRoleUser(props)
</script>

<style lang="scss" scoped></style>
