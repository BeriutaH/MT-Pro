<template>
  <div class="container">
    <!-- 数据大屏展示内容区域 -->
    <div class="screen" ref="screen">
      <!-- 数据大屏顶部 -->
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <div class="left">左侧</div>
        <div class="center">中间</div>
        <div class="right">右侧</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
// 引入子组件
import Top from '@/components/screen/top/index.vue'

// 获取数据大屏展示内容盒子的DOM元素
const screen = ref()

onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
})

// 监听视口变化
window.onresize = ()=>{
  screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
}

// 定义大屏缩放比例
const getScale = (w = 1920, h = 1080) => (Math.min(window.innerWidth / w, window.innerHeight / h))
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/screen/background.jpg') no-repeat;
  background-size: cover;

  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    left: 50%;
    top: 50%;
    transform-origin: left top;  // 设置基点

    .top {
      width: 100%;
      height: 40px;
    }
    .bottom {
      display: flex;
      .right {
        flex: 1;
      }
      .center {
        flex: 2;
      }
      .left {
        flex: 1;
        height: 1040px;
        background: #71c2c2;
      }

    }
  }
}

</style>
