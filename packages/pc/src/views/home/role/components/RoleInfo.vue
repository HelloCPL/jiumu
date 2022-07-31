<!--
  @describe: 角色详情
  @author cpl
  @update 2022-07-26 16:37:39
-->

<template>
  <Dialog title="角色信息" width="380px" :show-footer="false">
    <div v-if="dataInfo" class="px-4">
      <ElRow class="my-3">
        <ElCol :span="4" class="text-right pr-2">code：</ElCol>
        <ElCol :span="20" class="text-lighter">{{ dataInfo?.code }}</ElCol>
      </ElRow>
      <ElRow class="mb-3">
        <ElCol :span="4" class="text-right pr-2">角色：</ElCol>
        <ElCol :span="20" class="text-lighter">{{ dataInfo?.label }}</ElCol>
      </ElRow>
      <ElRow class="mb-3">
        <ElCol :span="4" class="text-right pr-2">排序：</ElCol>
        <ElCol :span="20" class="text-lighter">{{ dataInfo?.sort }}</ElCol>
      </ElRow>
      <ElRow class="mb-3">
        <ElCol :span="4" class="text-right pr-2">备注：</ElCol>
        <ElCol :span="20" class="text-lighter">{{ dataInfo?.remarks }}</ElCol>
      </ElRow>
      <ElRow class="mb-3">
        <ElCol class="text-sm text-lighter text-right">
          <span class="mr-2">{{ dataInfo.terminal }}</span>
          <span>{{ dataInfo.updateTime }}</span>
        </ElCol>
      </ElRow>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from '@/components/Dialog/index.vue'
import { ref } from 'vue'
import { getRoleOne } from '@/api/role'
import { ElRow, ElCol } from 'element-plus'
import { roleInfoProps } from './type'

const props = defineProps(roleInfoProps)

const dataInfo = ref<DataRole | null>(null)

const _getOne = async (id: string) => {
  const res = await getRoleOne(id, true)
  if (res.code === 200) {
    dataInfo.value = res.data
  }
}
_getOne(props.id)
</script>

<style lang="scss" scoped></style>
