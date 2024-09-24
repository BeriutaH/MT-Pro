<template>
<div class="navigation">
  <!-- 顶部左侧 -->
  <div class="navigation_left">
    <!-- 顶部左侧静态  -->
    <el-icon>
      <Expand />
    </el-icon>
    <!--  顶部面包屑  -->
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <!-- 顶部右侧 -->
  <div class="navigation_right">456</div>
</div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.navigation {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.navigation_left {
  display: flex;
}
</style>