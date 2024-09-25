<template>
  <div class="logo" :class="{ fold: settingStore.shrinkIcon }">
    <img :src="Setting.logo" v-if="Setting.logoHidden" alt="" />
    <p>{{ Setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import Setting from '@/config/setting'
import useSettingStore from '@/stores/modules/setting'
const settingStore = useSettingStore()
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-logo-height;
  color: white;
  display: flex;
  align-items: center;
  //padding: 20px;
  padding: 10px 20px 4px;  /* 上边距 10px,右边距 20px,下边距 4px,左边距 20px */
  gap: 10px;  /* 用于设置子元素之间的间距（只有在 flex 或 grid 布局中生效）。这里表示 .logo 内的子元素之间会有 10px 的间距。这比使用 margin 更加简洁和适用于 flex 布局 */
  transition: 0.3s;
  &.fold {
    //padding: 0;
    padding: 10px 2px 4px;
    transform: scale(0.8);  /* 表示将元素的宽度和高度缩小到原来的 80%（即 0.8 倍），因此整个 .fold 元素会被整体缩小 */
  }
  img {
    width: $base-logo-height;
    height: $base-logo-height;
    border: 0.5px solid white; // 添加白色边框
    border-radius: 50%; // 圆形边框
    //margin-top: 10px;
  }
  p {
    font-size: $base-logo-title-font-size;
    //margin-left: 10px;
    //margin-top: 10px; // 向下移动5px
    overflow: hidden;  /* 当 <p> 元素的内容（文字）超过容器的宽度时，隐藏超出的部分。不会显示超出容器的内容。这种情况下，超出容器的文字将被裁剪掉 */
    white-space: nowrap;  /* 强制文字不换行，所有文字会在一行内显示。即使内容超出了容器的宽度，文字也不会自动换行，而是超出部分被隐藏（结合 overflow: hidden） */
  }
}
</style>
