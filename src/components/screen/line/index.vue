<template>
  <div class="line_ratio">
    <div class="content">
      <div class="title"><p>地图组件</p></div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.line_ratio {
  background: url('@/assets/screen/dataScreen-blocks.png') no-repeat;
  background-size: 100% 100%;

  .content {
    padding: 20px; // 所有内容内缩 20px，避免紧贴边缘
  }

  .title {
    p {
      font-size: 20px;
      color: white;
    }
  }
}
</style>