<template>
  <el-button size="default" icon="Refresh" circle @click="updateRefresh"></el-button>
  <el-button size="default" icon="FullScreen" circle @click="fullScreen"></el-button>
  <!-- 设置主题 -->
  <el-popover placement="bottom" title="主题设置" :width="100" trigger="hover">
    <!-- 放置表单组件 -->
    <el-form>
      <el-form-item>
        主题颜色
        <el-color-picker size="small" v-model="color" show-alpha :predefine="predefineColors" />
      </el-form-item>
      <el-form-item>
        暗黑模式
        <el-switch
          @change="changeDark"
          style="--el-switch-on-color: #00999f; --el-switch-off-color: #000000"
          size="small"
          v-model="darkValue"
          inline-prompt
          active-icon="Sunny"
          inactive-icon="Moon"
        />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button size="default" icon="Setting" circle></el-button>
    </template>
  </el-popover>

  <!--  <img src="/public/cloud.png" style="width: 24px; height: 24px; margin: 0 10px" />-->
  <!--  测试用户图像用本地文件路径，一般是用文件服务器的，因为没有创建文件服务器，所以暂时用本地文件夹代替-->
  <img
    :src="userStore.avatar"
    style="width: 24px; height: 24px; margin: 0 10px; border-radius: 50%"
  />
  <el-dropdown :hide-on-click="false">
    <!-- 下拉菜单 -->
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right"><arrow-down /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import useSettingStore from '@/stores/modules/setting'
import useUserStore from '@/stores/modules/users/user'
import { ref } from 'vue'
const settingStore = useSettingStore()
const userStore = useUserStore()
// 获取路由对象
const $router = useRouter()
// 获取路由相关的数据对象
const $route = useRoute()
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
const changeDark = () => {
  // 获取html根节点
  let html = document.documentElement
  darkValue.value ? (html.className = 'dark') : (html.className = '')
}

// 收集开关的
const darkValue = ref(true)
// 颜色组件
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
])

// 退出登录
const logout = async () => {
  /*
   * 向服务器发送请求
   * 仓库中关于相关的用户数据清空
   * 跳转到登录页面，并且后面带着退出登录时所在的页面路径
   */
  await userStore.userLogout()
  await $router.push({
    path: '/login',
    query: { redirect: $route.path }
  })
}
</script>

<style scoped lang="scss"></style>
