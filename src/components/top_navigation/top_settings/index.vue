<template>
  <el-button size="default" icon="Refresh" circle></el-button>
  <el-button size="default" icon="FullScreen" circle></el-button>
  <el-button size="default" icon="Setting" circle></el-button>
  <img src="/public/cloud.png" style="width: 24px; height: 24px; margin: 0 10px" />
  <el-dropdown :hide-on-click="false">
    <!-- 下拉菜单 -->
    <span class="el-dropdown-link">
      Admin
      <el-icon class="el-icon--right"><arrow-down /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
