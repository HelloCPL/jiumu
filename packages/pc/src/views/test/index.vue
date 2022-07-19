<template>
  <div class="box">
    nihao
    <button @click="open">按钮</button>
    <Dialog title="大标题" v-if="show" :draggable="true"  @close="close" @confirm="confirm">
    你好

    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    <p>邯郸市三等奖</p>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Dialog from '@/components/Dialog/index.vue'
import {ref} from 'vue'
const show = ref(false)

const close = () => {
  console.log('关闭了');
  show.value = false
}
const open = () => {
  console.log(111, show.value);
  show.value = !show.value
}

const confirm = () => {
  console.log('confirm');
  show.value = false

}
</script>

<style lang="scss" scoped>
</style>