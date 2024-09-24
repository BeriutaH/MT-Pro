<template>
  <!-- 路由组件出口的位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染layout一级路由组件的子路由 -->
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style scoped lang="scss">
.fade-enter-active {
  transition: all 0.5s; /* 过渡动画 */
}
/* from, to进入动画开始和结束时分别应用的类 */
.fade-enter-from {
  opacity: 0; /* 透明度 */
}
.fade-enter-to {
  opacity: 1;
}
</style>
