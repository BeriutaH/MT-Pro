<template>
<div class="tourist_ratio">
  <div class="content">
    <div class="top_ratio">
      <p class="title"></p>
      <p class="title">实时游客统计</p>
      <p class="right">可预约总量: <span>8888</span>人</p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index" style="color: white">{{ item }}</span>
    </div>
    <div class="charts" ref="charts">123</div>
  </div>
</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
// 水球图
import 'echarts-liquidfill'
const people = ref('216908')
const charts = ref()
// 获取节点
onMounted(()=>{
  // 获取echarts类的实例
 let myCharts =  echarts.init(charts.value)
  console.log(myCharts)
  // 设置实例的配置项
  myCharts.setOption({
    // 标题设置
    title:{
      text:'水球图'
    },
    // x/y轴组件
    xAxis:{},
    yAxis:{},
    // 系列：决定你展示什么样的图形图标
    series: [{
      type: 'liquidFill',
      data: [0.6],
      radius: '90%',
    }],
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
.tourist_ratio {
  background: url('@/assets/screen/dataScreen-blocks.png') no-repeat;
  background-size: 100% 100%;
  .content {
    padding: 20px; // 统一内缩 10px，所有文字往内收缩
  }

  .top_ratio{
    color: white;
    font-size: 20px;
  }
  .number {
    margin-top: 30px;
     display: flex;
    span{
      //flex: 1;
      width: 40px;
      height: 70px;
      text-align: center;  // 文字居中
      line-height: 70px;
      background: url("@/assets/screen/btn.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .charts {
    width: 100%;
    height: 197px;
    //background: #065758;
  }
  .right {
    float: right;
    span{
      color: $pink-color;
    }
  }
}
</style>