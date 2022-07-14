<template>
  <div class="box">
    <div class="target" ref="refDiv">
      <p>华东师大</p>
      <p>华东师大</p>
      <p>华东师大</p>
      <p>华东师大</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDivMousewheel } from '@jiumu/utils'

const a = (t: number) => {
  console.log('t', t)
}

const { refDiv } = useDivMousewheel(a)


</script>
<style lang="scss" scoped>
.aa {
  position: absolute;
  top: 100px;
  left: 100px;
}

.target {
  width: 200px;
  height: 50px;
  position: absolute;
  top: 200px;
  left: 200px;
  border: 1px solid blue;
}
</style>