<template>
  <div class="layout_container">
<!--    左侧菜单-->
    <div class="layout_slider">
      <Logo></Logo>
    </div>
<!--    顶部导航-->
    <div class="layout_top_navigation">456</div>
<!--    中间内容区域-->
    <div class="layout_main">
      <p style="height: 10000px; background: #F4B8E4">我是内容</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 菜单Logo子组件
import Logo from '@/components/logo/index.vue'
</script>

<style scoped lang="scss">

.layout_container {
  width: 100%;
  height: 100vh;
  background: #99D1DB;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $primary-color;
  }
  .layout_top_navigation {
    position: fixed;  /* 相对定位 */
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
    top:$base-top-navigation-height;
    padding: 20px;
    overflow: auto;  /* 背景跟随滚动 */
    //overflow-y: scroll;  /* 始终显示垂直滚动条 */
  }
}

</style>
