<!--
  @describe: 选择用户弹框
  @author: cpl
  @create: 2022-07-28 17:18:48
-->

<template>
  <Dialog title="选择用户" @confirm="confirm">
    <PopupTwo
      v-model:keyword="keyword"
      :more-left="total > dataList.length"
      :total="_data.length"
      @search="search"
      @delete="handleDeleteAll"
      @scroll-left="getDataList"
    >
      <template #left>
        <template v-if="multiple">
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
        <template v-else>
          <div v-for="item in dataList" :key="item.id" class="pl-4">
            <ElRadio
              :model-value="item._checked ? item.id : ''"
              :label="item.id"
              :checked="item._checked"
              @update:model-value="changeRadio(item)"
            >
              <GRichText :html="item.username"></GRichText>
              <UsernameShow :text="item.phone" class="pl-2"></UsernameShow>
            </ElRadio>
          </div>
        </template>
      </template>
      <template #right>
        <div class="px-4 pt-3">
          <span
            v-for="item in _data"
            :key="item.id"
            class="text-lighter w-full justify-between flex items-center mb-2"
          >
            <span class="mr-2">
              <GRichText :html="item.username"></GRichText>
              <UsernameShow :text="item.phone" class="pl-2"></UsernameShow>
            </span>
            <ElIcon class="cursor-pointer" @click="handleDelete(item)">
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
import UsernameShow from '@/components/UsernameShow/index.vue'
import { ElCheckbox, ElRadio, ElIcon } from 'element-plus'
import { Close } from '@element-plus/icons-vue'
import PopupTwo from '@/components/PopupTwo/index.vue'
import { useSelectUserBox } from './hooks/use-select-user-box'
import { PropType } from 'vue'

const props = defineProps({
  data: {
    type: Array as PropType<DataUserInfo[]>,
    default: () => []
  },
  multiple: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['change'])

const {
  keyword,
  total,
  dataList,
  _data,
  getDataList,
  search,
  changeCheck,
  changeRadio,
  handleDelete,
  handleDeleteAll,
  confirm
} = useSelectUserBox(props, emit)
</script>
