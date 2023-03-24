<!--
  @describe 我的口令列表
  @author cpl
  @create 2023-03-23 10:20:26
-->

<template>
  <div class="g-container">
    <!-- 筛选框 -->
    <FilterBox @search="getDataList(1)" @reset="handleReset">
      <ElFormItem label="关键字">
        <ElInput v-model="keyword" type="text" clearable placeholder="请输入关键字"></ElInput>
      </ElFormItem>
      <ElFormItem label="类型">
        <SelectType v-model="type" parent-code="800"></SelectType>
      </ElFormItem>
      <ElFormItem label="标签">
        <SelectType v-model="classify" type="classify" parent-code="cipherClassify"></SelectType>
      </ElFormItem>
    </FilterBox>
    <!-- 操作盒子 -->
    <FilterButton :list="btnList" @click="handleBtn"></FilterButton>
    <!-- 列表 -->
    <Table :data="data">
      <ElTableColumn type="index" label="序号" width="60">
        <template #default="{ $index }">{{ getIndex($index, pageNo, pageSize) }}</template>
      </ElTableColumn>
      <ElTableColumn prop="sort" label="排序" width="60" />
      <ElTableColumn label="标题" min-width="150">
        <template #default="{ row }">
          <GRichText :html="row.title" />
        </template>
      </ElTableColumn>
      <ElTableColumn prop="typeLabel" label="类型" min-width="100" />
      <ElTableColumn label="标签" min-width="100">
        <template #default="{ row }">
          <span v-if="row.classify">
            <span v-for="(item, index) in row.classify" :key="item.id">
              {{ index === 0 ? '' : '、' }}
              {{ item.label }}
            </span>
          </span>
        </template>
      </ElTableColumn>
      <ElTableColumn label="账号" min-width="150">
        <template #default="{ row }">
          <span v-if="row.type === '802'">{{ row.show === '1' ? row.account : '******' }}</span>
          <span v-else>{{ row.account }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn label="密码" min-width="150">
        <template #default="{ row }">
          <span>{{ row.show === '1' ? row.cipher : '******' }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn label="更新时间" :width="getPx(150)">
        <template #default="{ row }">
          <span>{{ formatDate(row.updateTime, 'YYYY-MM-DD HH:mm') }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="terminal" label="创建终端" :width="getPx(90)" />
      <ElTableColumn label="操作" :width="getPx(100)" fixed="right">
        <template #default="{ row, $index }">
          <div class="flex items-center">
            <ElIcon
              color="var(--jm-color-primary)"
              class="cursor-pointer mr-2"
              v-if="row.show === '1'"
              @click="handleShowCipher($index, 'hide')"
            >
              <Hide />
            </ElIcon>
            <ElIcon
              color="var(--jm-color-lighter)"
              class="cursor-pointer mr-2"
              v-else
              @click="handleShowCipher($index, 'show')"
            >
              <View />
            </ElIcon>
            <ElButton type="primary" text size="small" @click="handleEdit(row)">修改</ElButton>
            <ElButton type="danger" text size="small" @click="handleDelete(row)">删除</ElButton>
          </div>
        </template>
      </ElTableColumn>
    </Table>
    <!-- 分页 -->
    <Pagination
      v-model:page-no="pageNo"
      v-model:page-size="pageSize"
      :total="total"
      @change="getDataList"
    ></Pagination>
    <!-- 口令新增或编辑  -->
    <CipherAdd
      v-if="state.show"
      :id="state.id"
      @close="state.show = false"
      @confirm="handleConfirm"
    ></CipherAdd>
    <!-- 口令code -->
    <CipherCodeAdd v-if="state.showCode" @close="state.showCode = false"></CipherCodeAdd>
  </div>
</template>

<script lang="ts" setup>
import FilterBox from '@/components/FilterBox/index.vue'
import FilterButton from '@/components/FilterButton/index.vue'
import Table from '@/components/Table/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import { ElFormItem, ElInput, ElTableColumn, ElButton, ElIcon } from 'element-plus'
import { View, Hide } from '@element-plus/icons-vue'
import { useIndex, useIndexInfo } from './hooks/use-index'
import { formatDate } from '@jiumu/utils'
import { getIndex, getPx } from '@/utils/tools'
import SelectType from '@/components/SelectType/index.vue'
import CipherAdd from './components/CipherAdd.vue'
import CipherCodeAdd from './components/CipherCodeAdd.vue'

defineOptions({
  name: 'CipherMe'
})

const { keyword, type, classify, pageNo, pageSize, total, data, getDataList, handleReset, handleShowCipher } =
  useIndex()
const { state, btnList, handleBtn, handleEdit, handleDelete, handleConfirm } = useIndexInfo({ getDataList })
</script>
