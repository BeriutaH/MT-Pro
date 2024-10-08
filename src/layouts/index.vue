<template>
  <div class="layout_container">
    <!-- 左侧菜单栏 -->
    <div class="layout_slider" :class="{ fold: settingStore.shrinkIcon }">
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
          :collapse="settingStore.shrinkIcon"
        >
          <!-- 根据动态生成菜单 Menu为子组件-->
          <DynamicMenu :menuList="useStore.menuRouters"></DynamicMenu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_top_navigation" :class="{ fold: settingStore.shrinkIcon }">
      <TopNavigation></TopNavigation>
    </div>
    <!-- 中间内容区域 -->
    <div class="layout_main" :class="{ fold: settingStore.shrinkIcon }">
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
import useUserStore from '@/stores/modules/users/user'
import useSettingStore from '@/stores/modules/setting'
const useStore = useUserStore()
const settingStore = useSettingStore()
// 获取路由对象
const $route = useRoute()
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  background: $light-color;
}
.layout_top_navigation {
  position: fixed; /* 相对定位 */
  width: calc(100% - $base-menu-width);
  height: $base-top-navigation-height;
  background: $top-color;
  top: 0;
  left: $base-menu-width;
  transition: all 0.3s;
  &.fold {
    width: calc(100% - $base-menu-min-width);
    left: $base-menu-min-width;
  }
}
.layout_main {
  position: absolute;
  width: calc(100% - $base-menu-width);
  height: calc(100vh - $base-top-navigation-height);
  //background: $medium-color;
  left: $base-menu-width;
  top: $base-top-navigation-height;
  padding: 20px;
  overflow: auto; /* 背景跟随滚动 */
  //color: white;
  transition: all 0.3s;
  //overflow-y: scroll;  /* 始终显示垂直滚动条 */
  &.fold {
    width: calc(100% - $base-menu-min-width);
    left: $base-menu-min-width;
  }
}
.layout_slider {
  width: $base-menu-width;
  height: 100vh;
  background: $primary-color;
  transition: all 0.3s;
  .scrollbar {
    width: 100%;
    height: calc(100vh - $base-logo-height); /* 避免滚动条撑出去 */
    .el-menu {
      border-right: none; /* 将左侧菜单边框隐身 */
      margin-top: 3px; /* 下移 3px */
    }
  }
  /* 这个 & 指代当前的父选择器，也就是说，& 在这里相当于父选择器的占位符。它确保这些嵌套的样式定义是在父元素上下文中应用的 */
  //& {
  //  &:deep(.el-tooltip__trigger),  // Element Plus 中用于触发工具提示的元素
  //  &:deep(.el-menu-item),  // Element Plus 中的菜单项
  //  &:deep(.el-sub-menu__title),  // Element Plus 中子菜单的标题
  //  &:deep(.el-menu.el-menu--inline) {  // Element Plus 中的内联菜单
  //    transition: 0.3s;
  //  }
  //}

  &.fold {
    width: $base-menu-min-width;
    &:deep(.el-tooltip__trigger),
    &:deep(.el-menu-item),
    &:deep(.el-sub-menu__title) {
      padding-left: 9px; // 设置这些元素在折叠状态下的左内边距为 9px，以保证菜单项在折叠时有适当的间距
    }
    //&:deep(.el-menu.el-menu--inline) {
    //  height: 0;  // 将菜单的高度设为 0，意味着菜单会被隐藏
    //  overflow: hidden;  // 将溢出内容隐藏，确保当菜单高度为 0 时，内部的子菜单内容不会显示
    //}
    //&:deep(.el-menu-item),
    //&:deep(.el-sub-menu__title) {
    //  & > span {
    //    transition: 0.3s;  // 为 <span> 元素添加一个 0.3 秒的过渡效果。当它的某些样式（例如 opacity）发生变化时，会有一个平滑的过渡
    //    opacity: 0;  // 折叠状态下，设置文字或图标的透明度为 0，意味着它们会隐藏，导致文字不可见
    //  }
    //}
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
