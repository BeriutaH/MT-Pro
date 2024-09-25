<template>
  <!-- 顶部左侧静态  -->
  <el-icon style="margin: 0 10px" @click="changeIcon">
    <!-- 动态添加图标 -->
    <component :is="settingIcon.shrinkIcon ? 'Expand' : 'Fold'"></component>
  </el-icon>
  <!--  顶部面包屑  -->
  <el-breadcrumb separator-icon="ArrowRight">
    <!--  动态获取路由以及图标,$route.matched能获取到路由的所有信息  -->
    <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
      <!-- 图标 -->
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <!--  面包屑展示匹配路由的标题 -->
      <span style="margin: 0 5px">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import userSettingStore from '@/stores/modules/setting'
import  { useRoute } from 'vue-router'
// 获取配置相关仓库
let settingIcon = userSettingStore()


const changeIcon = () => {
  console.log('是否收缩', settingIcon.shrinkIcon)
  settingIcon.shrinkIcon= !settingIcon.shrinkIcon
}

const $route = useRoute()
</script>

<style scoped lang="scss">
</style>
