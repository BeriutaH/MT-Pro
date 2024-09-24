<template>
  <div class="logo">
    <img :src="Setting.logo" v-if="Setting.logoHidden" alt="" />
    <p>{{ Setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import Setting from '@/config/setting'
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-logo-height;
  color: white;
  display: flex;
  align-items: center;
  padding: 20px;
  img {
    width: $base-logo-height;
    height: $base-logo-height;
    border: 0.5px solid white; // 添加白色边框
    border-radius: 50%; // 圆形边框
    margin-top: 10px;
  }
  p {
    font-size: $base-logo-title-font-size;
    margin-left: 10px;
    margin-top: 10px; // 向下移动5px
  }
}
</style>
