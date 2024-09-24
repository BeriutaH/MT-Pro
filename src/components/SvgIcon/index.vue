<template>
  <div>
    <h1>SVG</h1>
    <!--  svg测试: 图标外层容器节点，内部需要与use标签结合使用  -->
    <svg :style="{ width, height, fill: color }">
      <!-- 套入子标签: :href执行用哪一个图标, 属性值必须要#icon-图标名字 -->
      <use :href="prefix + name"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
// 接收父组件传递过来的参数，返回相应的svg图标
defineProps({
  // xlink:href属性值前缀
  prefix: {
    type: String,
    default: '#icon-'
  },
  // 提供使用的图标的名字
  name: String,
  // 颜色
  color: {
    type: String,
    default: '#111'
  },
  // 宽度
  width: {
    type: String,
    default: '50px'
  },
  // 高度
  height: {
    type: String,
    default: '50px'
  }
})
</script>

<style scoped></style>
