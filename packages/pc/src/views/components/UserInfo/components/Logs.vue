<!--
  @describe 登录日志
  @author cpl
  @create 2023-03-17 16:47:36
-->

<template>
  <div class="w-full h-full pt-20">
    <div class="absolute top-0 left-0 w-full h-20 pt-2">
      <span class="text-sm text-lighter pl-2">
        <span>登录记录</span>
        <span v-if="total" class="pl-1">{{ total }}条</span>
      </span>
      <ElRow class="mt-2 text-light">
        <ElCol :span="11" class="pl-2">登录设备</ElCol>
        <ElCol :span="5" class="pl-2">IP</ElCol>
        <ElCol :span="5" class="pl-1">登录时间</ElCol>
        <ElCol :span="3">终端</ElCol>
      </ElRow>
    </div>
    <div class="w-full h-full pb-2 g-scroll-y-0">
      <ElRow v-for="item in data" class="text-sm text-lighter" :key="item.id">
        <ElCol :span="11" class="pl-2">{{ item.userAgent }}</ElCol>
        <ElCol :span="5" class="pl-2">{{ item.ip }}</ElCol>
        <ElCol :span="5" class="pl-1">
          <p>{{ formatDate(item.createTime, 'YYYY-MM-DD') }}</p>
          <p>{{ formatDate(item.createTime, 'HH:mm') }}</p>
        </ElCol>
        <ElCol :span="3" class="pl-1">{{ item.terminal }}</ElCol>
      </ElRow>
      <MoreBtn :show="total > data.length" @click="getLoginInfo"></MoreBtn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElRow, ElCol } from 'element-plus'
import { ref } from 'vue'
import { getLoginInfoList } from '@/api/user'
import { formatDate, getDataDiff } from '@jiumu/utils'
import MoreBtn from '@/components/MoreBtn/index.vue'
import { useUserStore } from '@/store'
import { debounce } from 'lodash-es'

const userStore = useUserStore()

const data = ref<DataLoginInfo[]>([])
const total = ref(0)
let pageNo = 1

const getLoginInfo = debounce(async () => {
  const params: ParamsLoginInfo = {
    userId: <string>userStore.userInfo?.id,
    pageNo: pageNo,
    pageSize: 20
  }
  const res = await getLoginInfoList(params)
  if (res.code === 200) {
    data.value = getDataDiff(data.value, res.data)
    pageNo++
    total.value = res.total
  }
})
getLoginInfo()
</script>
