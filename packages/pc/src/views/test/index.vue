<template>
  <div class="box">
    <div class="target" ref="refDiv"></div>
  </div>
</template>

<script setup lang="ts">
import { useMousewheel } from '@jiumu/utils'

const { refDiv } = useMousewheel()

</script>
<style lang="scss" scoped>
.target {
  position: absolute;
  top: 200px;
  left: 200px;
  border: 1px solid blue;
}
</style>