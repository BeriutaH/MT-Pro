<template>
  <!-- 路由组件出口的位置,中间内容的展示 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染layout一级路由组件的子路由 -->
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
// 引入监听模块
import { watch, ref, nextTick } from 'vue'
/*
* watch 是 Vue 3 中用于监听响应式数据或计算属性变化的函数
* 它可以用于监听一个具体的值（如单个变量、对象中的某个属性等），当该值发生变化时，会执行回调函数
* 有两个参数：
    1.要监听的源数据，通常是一个响应式的值、计算属性，或者返回响应式数据的函数
    2.回调函数，在监听的值发生变化时触发
*/
import useSettingStore from '@/stores/modules/setting'
const settingStore = useSettingStore()
// 控制当前组件是否销毁重建
let flag = ref(true)  // 默认true为展示

//  监听仓库内部数据是否发生变化，如果发生变化，说明用户点击刷新按钮
watch(()=> settingStore.refresh, ()=>{
  // 销毁再创建组件，v-if
  flag.value = false
  // 异步方法 nextTick 等到所有的 DOM 响应式数据变化完成后再一次性更新视图
  nextTick(()=>{
    // 再次触发 v-if 使组件重新渲染
    flag.value = true
  })
})
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
