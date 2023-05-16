<template>
  <div class="m-4 box">
    <!-- <Upload @change="handleChange" type="files_big"></Upload> -->
    <button @click="hh">按钮</button>

    <!-- 用户信息 -->
    <UserInfo @close="isShowUserInfo = false" v-if="isShowUserInfo"></UserInfo>
  </div>
</template>

<script setup lang="ts">
// import Upload from '@/components/Upload/index.vue'
import UserInfo from '../components/UserInfo/index.vue'
import EditBaseInfo from '../components/UserInfo/components/EditBaseInfo.vue'
import {ref} from 'vue'
import {xss} from '@jiumu/utils'

const h = '<div>这是一段文本</div>或多或少`a > 123`'
console.log('h', xss.process(h))

const isShowUserInfo = ref<boolean>(false)

// const handleChange = (file) => {
//   console.log(file)
// }

const hh = () => {
  // isShowUserInfo.value = true
  console.log('h', xss.process(h))
}
</script>

<style lang="scss" scoped>
</style>