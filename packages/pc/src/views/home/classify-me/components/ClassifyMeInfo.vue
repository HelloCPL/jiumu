<!--
  @describe: 我的自定义标签详情
  @author: cpl
  @create: 2022-10-14 11:08:00
-->

<template>
  <Dialog title="自定义标签信息" width="380px" :show-footer="false">
    <div v-if="dataInfo" class="px-4">
      <ElRow class="my-3">
        <ElCol :span="4" class="text-right pr-2">标签：</ElCol>
        <ElCol :span="20" class="text-lighter">{{ dataInfo?.label }}</ElCol>
      </ElRow>
      <ElRow class="mb-3">
        <ElCol :span="4" class="text-right pr-2">类型：</ElCol>
        <ElCol :span="20" class="text-lighter">{{ dataInfo?.type }}</ElCol>
      </ElRow>
      <ElRow class="mb-3">
        <ElCol :span="4" class="text-right pr-2">排序：</ElCol>
        <ElCol :span="20" class="text-lighter">{{ dataInfo?.sort }}</ElCol>
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
import { classifyMeAddProps } from './type'
import { ref } from 'vue'
import { getTagCustomByIdsSelf } from '@/api/classify'
import { ElRow, ElCol } from 'element-plus'

const props = defineProps(classifyMeAddProps)
const dataInfo = ref<DataTagCustom | null>()
// 获取详情
const _getOne = async (id: string) => {
  const res = await getTagCustomByIdsSelf(id, true)
  if (res.code === 200 && res.data.length) {
    dataInfo.value = res.data[0]
  }
}
_getOne(props.id)
</script>
