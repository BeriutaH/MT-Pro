<template>
  <div class="layout_container">
    <div class="layout_slider">
      <Logo></Logo>
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 active-text-color 激活颜色 -->
        <el-menu
          background-color="#065758"
          class="menu"
          text-color="white"
          active-text-color="#f4b8e4"
          :default-active="$route.path"
        >
          <!-- 根据动态生成菜单 Menu为子组件-->
          <DynamicMenu :menuList="useStore.menuRouters"></DynamicMenu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_top_navigation">
      <TopNavigation></TopNavigation>
    </div>
    <!-- 中间内容区域 -->
    <div class="layout_main">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import Logo from '@/components/logo/index.vue'
import DynamicMenu from '@/components/menu/index.vue'
import Main from '@/components/main/index.vue'
import TopNavigation from '@/components/top_navigation/index.vue'
// 获取小仓库存储的数据
import useUserStore from '@/stores/modules/user'
const useStore = useUserStore()
// 获取路由对象
const $route = useRoute()
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  background: #99d1db;
}
.layout_top_navigation {
  position: fixed; /* 相对定位 */
  width: calc(100% - $base-menu-width);
  height: $base-top-navigation-height;
  background: $top-color;
  top: 0;
  left: $base-menu-width;
}
.layout_main {
  position: absolute;
  width: calc(100% - $base-menu-width);
  height: calc(100vh - $base-top-navigation-height);
  background: $medium-color;
  left: $base-menu-width;
  top: $base-top-navigation-height;
  padding: 20px;
  overflow: auto; /* 背景跟随滚动 */
  color: white;
  //overflow-y: scroll;  /* 始终显示垂直滚动条 */
}
.layout_slider {
  width: $base-menu-width;
  height: 100vh;
  background: $primary-color;
  .scrollbar {
    width: 100%;
    height: calc(100vh - $base-logo-height); /* 避免滚动条撑出去 */
    .el-menu {
      border-right: none; /* 将左侧菜单边框隐身 */
    }
  }
}
/* 注意标签的优先级 */
//.menu {
//  background-color: $primary-color;
//  :deep(.el-menu) {
//    background-color: $primary-color;
//  }
//
//  --el-menu-hover-bg-color: #1F4848;  /* 鼠标悬停颜色 */
//}
</style>
