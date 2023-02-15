<!--
  @describe: 用户登录记录
  @author cpl
  @update 2022-07-23 12:43:06
-->

<template>
  <div class="pt-3">
    <span class="text-sm text-lighter">登录记录</span>
    <ElRow class="mt-2 text-light">
      <ElCol :span="11">登录设备</ElCol>
      <ElCol :span="5">IP</ElCol>
      <ElCol :span="5">登录时间</ElCol>
      <ElCol :span="3">登录终端</ElCol>
    </ElRow>
    <ElRow v-for="item in state.dataList" class="mt-2 text-sm text-lighter" :key="item.id">
      <ElCol :span="11" class="pr-1">{{ item.userAgent }}</ElCol>
      <ElCol :span="5" class="pr-1">{{ item.ip }}</ElCol>
      <ElCol :span="5" class="pr-1">{{ formatDate(item.createTime, 'YYYY-MM-DD HH:mm') }}</ElCol>
      <ElCol :span="3" class="pr-1">{{ item.terminal }}</ElCol>
    </ElRow>
    <MoreBtn :show="state.total > state.dataList.length" @click="getLoginInfo"></MoreBtn>
  </div>
</template>

<script lang="ts" setup>
import { ElRow, ElCol } from 'element-plus'
import { reactive } from 'vue'
import { getLoginInfoList } from '@/api/user'
import { formatDate, getDataDiff } from '@jiumu/utils'
import MoreBtn from '@/components/MoreBtn/index.vue'

type Props = {
  userId: string
}
const props = defineProps<Props>()

interface StateData {
  dataList: DataLoginInfo[]
  pageNo: number
  total: Number
}
const state = reactive<StateData>({
  dataList: [],
  pageNo: 1,
  total: 0
})

let lock = false
const getLoginInfo = async () => {
  if (lock) return
  lock = true
  const params = {
    userId: props.userId,
    pageNo: state.pageNo,
    pageSize: 20
  }
  const res = await getLoginInfoList(params)
  if (res.code === 200) {
    state.dataList = getDataDiff(state.dataList, res.data)
    state.pageNo++
    state.total = res.total
  }
  lock = false
}
getLoginInfo()
</script>
