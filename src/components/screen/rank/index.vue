<template>
<div class="rank_ratio">
  <div class="content">
    <div class="chart-title-bg">
      <h2>热门景区排行榜</h2>
      <div class="subtitles">
        <span>景区</span>
        <span>预约数量</span>
        <span>百分比</span>
      </div>
    </div>
    <!--  图形图表的容器 -->
    <div class="charts" ref="charts"></div>
  </div>
</div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

const charts = ref()
const progressData = [30, 40, 60, 10, 75, 50, 70]
onMounted(()=>{
  // 一个容器可以同时展示多种类型的图形图表
  // 初始化图形图标的DOM节点
  let myCharts = echarts.init(charts.value)
  const option = {
    grid:{
      left:"10",
      top:"5",
      right:"0",
      bottom:"0",
      containLabel:true
    },
    xAxis: {
      type: 'value',
      splitLine:{show:false},
      axisLabel:{show:false},
      axisTick:{show:false},
      axisLine:{show:false},
      max: 100  // 表示柱状进度的总数为100%
    },
    yAxis:[
      {
        type: 'category',
        axisTick:{show:false},
        axisLine:{show:false},
        axisLabel:{
          color:"black",
          fontSize:14,
          textStyle: {
            color: '#fff'
          }
        },
        data:["北京故宫","万里长城","九寨沟","黄山","西湖","大理古城","青海湖"],
        max:6, // 关键：设置y刻度最大值，相当于设置总体行高
        inverse:true
      },
      {
        type: 'category',
        axisTick:{show:false},
        axisLine:{show:false},
        axisLabel:{
          color:"black",
          fontSize:14,
          textStyle: {
            color: '#fff'
          }
        },
        data:progressData.map((val) => val + '%'),
        max:6, // 关键：设置y刻度最大值，相当于设置总体行高
        inverse:true
      }
    ],
    series: [
      {
        name:"条",
        type:"bar",
        barWidth:19,
        data:progressData,
        barCategoryGap:20,
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(0, 98, 102, 0.3)',
          borderRadius: [10, 10, 10, 10],
          borderColor: '#00f5ff',            // 背景条边框颜色
          borderWidth: 0.5,
        },
        itemStyle:{
          normal:{
            barBorderRadius:10,
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
              offset: 0,
              color: '#00f5ff'
            }, {
              offset: 1,
              color: '#f4b8e4'
            }]),
          }
        },
        // zlevel:1

      },
      // {
      //   name:"进度条背景",
      //   type:"bar",
      //   barGap:"-100%",
      //   barWidth:19,
      //   data:[100,100,100,100,100,100,100],
      //   // color:"#2e5384",
      //   color:"rgba(0, 98, 102, 0.3)",
      //   itemStyle:{
      //     normal:{
      //       barBorderRadius:10,
      //       borderColor: "#00f5ff",  // 设置边框颜色为白色
      //       borderWidth: 0.5  // 设置边框宽度
      //     }
      //   },
      // }
    ],
  }
  // 设置配置项
  myCharts.setOption(option)
})
</script>

<style scoped lang="scss">
.rank_ratio {
  background: url('@/assets/screen/dataScreen-blocks.png') no-repeat;
  background-size: 100% 100%;
  margin: 10px 0;

  .content {
    padding: 20px; // 所有内容内缩 20px，避免紧贴边缘
  }
  .title {
    p {
      font-size: 20px;
      color: white;
    }
  }
  .charts {
    width: 100%;
    height: 320px;
  }
  .subtitles {
    background-image: url("@/assets/screen/title_bg.png"); /* 替换为实际图片路径 */
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    padding: 5px;
    text-align: center;
  }

  .chart-title-bg h2 {
    color: #fff;
    margin-top: 10px;
    margin-left: 250px;
    font-size: 20px;
  }

  .chart-title-bg .subtitles {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
  }

  .chart-title-bg .subtitles span {
    color: #00f5ff;
    padding: 5px;
  }

}
</style>