<template>
  <el-button size="default" icon="Refresh" circle @click="updateRefresh"></el-button>
  <el-button size="default" icon="FullScreen" circle @click="fullScreen"></el-button>
  <el-button size="default" icon="Setting" circle></el-button>
<!--  <img src="/public/cloud.png" style="width: 24px; height: 24px; margin: 0 10px" />-->
  <img :src="userStore.avatar" style="width: 24px; height: 24px; margin: 0 10px; border-radius: 50%" />
  <el-dropdown :hide-on-click="false">
    <!-- 下拉菜单 -->
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right"><arrow-down /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useSettingStore from '@/stores/modules/setting'
import useUserStore from '@/stores/modules/user'
const settingStore = useSettingStore()
const userStore = useUserStore()
// 刷新按钮点击事件
const updateRefresh = () => {
  settingStore.refresh = !settingStore.refresh
  console.log(settingStore.refresh)
}

// 点击全屏按钮
const fullScreen = () => {
  // DOM对象的属性 fullscreenElement 获取当前的项目是否是全屏，是true，否null
  // 不同的浏览器会有兼容问题，当前只适用谷歌浏览器
  console.log(document.fullscreenElement)
  let full = document.fullscreenElement
  if (!full) {
    // 根据文档根节点的方法，实现全屏模式
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏模式
    document.exitFullscreen()
  }
}
</script>

<style scoped lang="scss"></style>
