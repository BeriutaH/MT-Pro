<template>
  <!-- 顶部左侧静态  -->
  <el-icon style="margin: 0 10px" @click="changeIcon">
    <!-- 动态添加图标 -->
    <component :is="settingIcon.shrinkIcon ? 'Expand' : 'Fold'"></component>
  </el-icon>
  <!--  顶部面包屑  -->
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import userSettingStore from '@/stores/modules/setting'
// 获取配置相关仓库
let settingIcon = userSettingStore()


const changeIcon = () => {
  console.log('是否收缩', settingIcon.shrinkIcon)
  settingIcon.shrinkIcon= !settingIcon.shrinkIcon
}
</script>

<style scoped lang="scss"></style>
