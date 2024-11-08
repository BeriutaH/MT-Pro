<template>
<div class="year_ratio">
  <div class="title">
    <p>景区年度游客量</p>
  </div>
  <div class="charts" ref="charts"></div>
</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
// 水球图
import 'echarts-liquidfill'
const charts = ref()
onMounted(()=>{
  let myCharts = echarts.init(charts.value)
  // 配置项示例
  const  option = {
    tooltip: {
      trigger: 'axis',

    },
    legend: {
      data: ['预测游客量', '实际游客量'],
      textStyle: {
        color: '#c0c7d0' // 图例字体颜色
      },
      right: '10%'
    },
    grid: {
      left: '5%',
      right: '6%',
      bottom: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
      axisLine: {
        lineStyle: {
          color: '#4c5e70' // x轴颜色
        }
      },
      axisLabel: {
        color: '#c0c7d0' // x轴字体颜色
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#4c5e70' // y轴颜色
        }
      },
      axisLabel: {
        color: '#c0c7d0' // y轴字体颜色
      },
      splitLine: {
        lineStyle: {
          color: '#2a3b4a' // 分割线颜色
        }
      }
    },
    series: [
      {
        name: '预测游客量',
        type: 'line',
        smooth: true,
        data: [500, 2500, 1900, 3200, 2200, 4000, 500, 1500, 1000, 800, 5500],
        lineStyle: {
          color: '#54d4d4', // 预测游客量线条颜色
          width: 0.2,
          shadowColor: 'rgba(0, 245, 255, 0.7)',
          shadowBlur: 8
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(0, 245, 255, 0.8)' },
            { offset: 1, color: 'rgba(0, 245, 255, 0)' }
          ]),
          shadowColor: 'rgba(0, 245, 255, 0.5)',
          shadowBlur: 10
        }
      },
      {
        name: '实际游客量',
        type: 'line',
        smooth: true,
        data: [100, 3700, 2200, 5800, 2000, 1300, 2000, 4400, 100, 2222, 1300],
        lineStyle: {
          color: '#f4b8e4', // 实际游客量线条颜色
          width: 0.2,
          shadowColor: 'rgba(244, 184, 228, 0.7)',
          shadowBlur: 8
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(244, 184, 228, 0.8)' },
            { offset: 1, color: 'rgba(244, 184, 228, 0)' }
          ]),
          shadowColor: 'rgba(244, 184, 228, 0.5)',
          shadowBlur: 10
        }
      }
    ],
    animationDuration: 2000, // 动画持续时间
    animationEasing: 'cubicOut' // 动画效果
  }
  myCharts.setOption(option as any)
})


</script>

<style scoped lang="scss">
.year_ratio {
  background: url('@/assets/screen/dataScreen-blocks.png') no-repeat;
  background-size: 100% 100%;

  .content {
    padding: 20px; // 所有内容内缩 20px，避免紧贴边缘
  }
  .title {
    margin-left: 20px;
    margin-top: 20px;
    p {
      font-size: 20px;
      color: white;
    }
  }
  .charts {
    margin-top: 10px;
    height: 250px;
  }
}
</style>