<template>
  <div class="navigation">
    <!-- 顶部左侧 -->
    <div class="navigation_left">
      <Breadcrumb />
    </div>
    <!-- 顶部右侧 -->
    <div class="navigation_right">
      <TopSetting />
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from '@/components/top_navigation/breadcrumb/index.vue'
import TopSetting from '@/components/top_navigation/top_settings/index.vue'
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
  align-items: center; /* 竖着居中 */
  padding-left: 10px;
}
.navigation_right {
  display: flex;
  align-items: center;
  transform: translateX(-15px); /* 向左移动10px */
  :deep(.el-button) {
    background-color: $top-color;
  }
}
</style>
