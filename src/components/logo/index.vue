<template>
  <div class="logo" :class="{ fold: settingStore.shrinkIcon }">
    <img :src="Setting.logo" v-if="Setting.logoHidden" alt="" />
    <p>{{ Setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import Setting from '@/config/setting'
import userSettingStore from '@/stores/modules/setting'
const settingStore = userSettingStore()
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  color: white;
  display: flex;
  align-items: center;
  padding: 10px 20px 4px;
  gap: 10px;
  transition: 0.3s;
  &.fold {
    padding: 10px 2px 4px;
    transform: scale(0.8);
  }
  img {
    width: $base-logo-height;
    height: $base-logo-height;
    border: 0.5px solid white; // 添加白色边框
    border-radius: 50%; // 圆形边框
  }
  p {
    font-size: $base-logo-title-font-size;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
