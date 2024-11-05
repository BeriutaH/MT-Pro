<template>
<div class="sex_ratio">
  <div class="content">
    <div class="title">
      <p>男女比例</p>
    </div>
    <div class="sex">
      <div class="man">
        <img src="@/assets/screen/man.png">
      </div>
      <div class="women">
        <img src="@/assets/screen/women.png">
      </div>
    </div>
    <div class="rate">
      <p>男士58%</p>
      <p>女士42%</p>
    </div>
    <div class="charts" ref="charts">

    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

const charts = ref()
onMounted(()=>{
  // 初始化图形图标的DOM节点
  let myCharts = echarts.init(charts.value)
  // 设置配置项
  myCharts.setOption({
    // 标题设置
    xAxis:{
      show:false,
      min:0,
      max:100
    },
    yAxis:{
      show:false,
      type:'category'
    },
    series: [
      {
        type: 'bar',
        data: [58],
        barWidth:20,
        z:100,
        itemStyle: {
          color:'skyblue',
          borderRadius:20
        }

      },
      {
        type: 'bar',
        data: [100],
        barWidth:20,
        // 调整女士柱状图位置
        barGap:'-100%',
        itemStyle: {
          color:'pink',
          borderRadius:20
        }
      },
    ],
    // 布局组件
    grid: {
      left:0,
      right:0,
      top:0,
      bottom:0,
    }
  })

})
</script>

<style scoped lang="scss">
.sex_ratio {
  background: url('@/assets/screen/dataScreen-blocks.png') no-repeat;
  background-size: 100% 100%;

  .content {
    padding: 20px; // 所有内容内缩 20px，避免紧贴边缘
  }

  .title {
    p {
      font-size: 20px;
      color: white;
    }
  }

  .sex {
    display: flex;
    justify-content: space-around;
    margin-top: 40px;

    .man img,
    .women img {
      width: 80px; // 图片宽度
      height: 80px; // 图片高度
      object-fit: contain; // 保持图片比例
    }
  }
  .rate {
    display: flex;
    justify-content: space-around;
    width: 100%; // 占满容器宽度
    margin-top: 20px;

    p {
      font-size: 16px;
      color: white;
      margin: 0;
    }
  }
  .charts {
    height: 100px;
    //background: #065758;
  }
}
</style>