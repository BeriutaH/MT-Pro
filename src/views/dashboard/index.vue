<template>
  <div class="container">
    <!-- 数据大屏展示内容区域 -->
    <div class="screen" ref="screen">
      <!-- 数据大屏顶部 -->
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist"/>
          <Sex class="sex"/>
          <Age class="age"/>
        </div>
        <div class="center">
          <Map class="map"/>
<!--          <Line class="line"/>-->
        </div>
        <div class="right">
          <Rank class="rank"/>
          <Year class="year"/>
          <Transportation class="transportation"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
// 引入子组件
import Top from '@/components/screen/top/index.vue'
// 引入左侧三个子组件
import Tourist from '@/components/screen/tourist/index.vue'
import Sex from '@/components/screen/sex/index.vue'
import Age from '@/components/screen/age/index.vue'

// 引入中间两个子组件
import Map from '@/components/screen/map/index.vue'
import Line from '@/components/screen/line/index.vue'

// 引入右侧三个子组件
import Rank from '@/components/screen/rank/index.vue'
import Year from '@/components/screen/year/index.vue'
import Transportation from '@/components/screen/transportation/index.vue'


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
  //background: url('@/assets/screen/background.jpg') no-repeat;
  background: url('@/assets/screen/bg12.png') no-repeat;
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

        display: flex;
        flex-direction: column;

        .rank {
          flex: 1;
        }
        .year {
          flex: 0.8;
        }
        .transportation {
          flex: 1.2;
        }
      }
      .center {
        flex: 2;
        display: flex;
        flex-direction: column;
        //.map {
        //  flex: 4;
        //  //background: #00999f;
        //}
        //.line {
        //  flex: 1;
        //  //background: #065758;
        //}
      }
      .left {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;
        .tourist {
          flex: 1;
        }
        .sex {
          flex: 1;
        }
        .age {
          flex: 1;
        }
      }

    }
  }
}

</style>
