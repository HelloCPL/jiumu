<!--
  @describe 登录日志
  @author cpl
  @create 2023-03-17 16:47:36
-->

<template>
  <div class="w-full h-full pl-2 relative g-scroll-x">
    <div class="w-full h-full g-scroll-y user-logs-container" style="min-width: 380px">
      <span class="text-sm text-lighter pl-2">
        <span>登录记录</span>
        <span v-if="total" class="pl-1">{{ total }}条</span>
      </span>
      <ElRow class="w-full mt-2 text-light">
        <ElCol :span="11" class="pl-2">登录设备</ElCol>
        <ElCol :span="5" class="pl-1">IP</ElCol>
        <ElCol :span="5" class="pl-1">登录时间</ElCol>
        <ElCol :span="3">终端</ElCol>
      </ElRow>
      <div class="mt-4 pb-2">
        <ElRow v-for="item in data" class="mb-2 text-sm text-lighter" :key="item.id">
          <ElCol :span="11" class="pl-2 break-all"> {{ item.userAgent }}</ElCol>
          <ElCol :span="5" class="pl-1">{{ item.ip }}</ElCol>
          <ElCol :span="5" class="pl-1">
            <p>{{ formatDate(item.createTime, 'YYYY-MM-DD') }}</p>
            <p>{{ formatDate(item.createTime, 'HH:mm:ss') }}</p>
          </ElCol>
          <ElCol :span="3" class="pl-1">{{ item.terminal }}</ElCol>
        </ElRow>
        <MoreBtn :show="total > data.length" @click="getLoginInfo"></MoreBtn>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElRow, ElCol, ElAffix } from 'element-plus'
import { ref } from 'vue'
import { getLoginInfoList } from '@/api/user'
import { formatDate, getDataDiff } from '@jiumu/utils'
import MoreBtn from '@/components/MoreBtn/index.vue'
import { debounce } from 'lodash-es'
import { userStore } from '@/store/user/instance'

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
}, 300)
getLoginInfo()
</script>
