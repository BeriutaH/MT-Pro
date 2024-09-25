<template>
  <template v-for="route in menuList" :key="route.path">
    <!--    没有子路由-->
    <template v-if="!route.children">
      <el-menu-item v-if="!route.meta.hidden" :index="route.path" @click="goRoute">
        <el-icon>
          <component :is="route.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ route.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!--    只有一个子路由-->
    <template v-if="route.children && route.children.length == 1">
      <el-menu-item v-if="!route.children[0].meta.hidden" :index="route.children[0].path" @click="goRoute">
        <el-icon>
          <component :is="route.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ route.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!--    有多个子路由-->
    <el-sub-menu v-if="route.children && route.children.length > 1" :index="route.path">
      <template #title>
        <el-icon>
          <component :is="route.meta.icon"></component>
        </el-icon>
        <span>{{ route.meta.title }}</span>
      </template>
      <DynamicMenu :menuList="route.children"></DynamicMenu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
// 获取父组件传递过来的全部数组
defineProps(['menuList'])
// 实例化路由器对象
const $router = useRouter()
const goRoute = (vc: any) => {
  // 获取路由跳转的path
  // console.log(vc.index)
  $router.push(vc.index)
}
</script>
<script lang="ts">
// 递归组件必须要有name名字
export default {
  name: 'DynamicMenu'
}
</script>
<style scoped lang="scss"></style>
