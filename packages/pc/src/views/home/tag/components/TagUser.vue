<!--
  @describe: 特殊标签-用户关联
  @author cpl
  @update 2022-07-30 18:28:23
-->

<template>
  <Dialog :title="'特殊标签-用户关联（' + code + '）'" :show-footer="false">
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
        <div v-for="item in dataList" :key="item.id">
          <ElCheckbox
            :model-value="item._checked"
            :label="item.id"
            :checked="item._checked"
            :disabled="!hasPermission('pc:tag:user:relevant:btn')"
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
            v-for="item in dataList2"
            :key="item.id"
            :title="item.username"
            :sub-title="item.phone"
            class="mb-3"
            :show-close="hasPermission('pc:tag:user:relevant:btn')"
            @close="deleteRelevance(item)"
          ></Card>
        </div>
      </template>
    </PopupTwo>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from '@/components/Dialog/index.vue'
import PopupTwo from '@/components/PopupTwo/index.vue'
import { tagInfoProps } from './type'
import { useTagUser } from '../hooks/use-tag-user'
import { ElCheckbox } from 'element-plus'
import UsernameShow from '@/components/UsernameShow/index.vue'
import Card from '@/components/Card/index.vue'
import { hasPermission } from '@/utils/permission'

const props = defineProps(tagInfoProps)

const { keyword, total, dataList, getDataList, search, dataList2, changeCheck, deleteRelevance } =
  useTagUser(props)
</script>

<style lang="scss" scoped></style>
