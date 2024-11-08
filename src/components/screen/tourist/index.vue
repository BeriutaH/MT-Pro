<template>
<div class="tourist_ratio">
  <div class="content">
    <div class="top_ratio">
      <p class="title"></p>
      <p class="title">实时游客统计</p>
      <p class="right">可预约总量: <span>8888</span>人</p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index" style="color: #00f5ff;">{{ item }}</span>
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
const people = ref('216908人')
const charts = ref()
// 获取节点
onMounted(()=> {
  // 获取echarts类的实例
  let myCharts = echarts.init(charts.value)
  const option = {
    // x/y轴组件
    series: [
      {
        type: 'liquidFill',
        data: [0.3, 0.35, 0.5],  // 几个数据，表示几个波浪
        radius: '95%',
        label: {
          normal: {
            formatter: '预测量',
            // 修改文字位置
            position: ['50%', '30%'],
            // 修改文字样式
            textStyle: {
              fontSize: 20,    // 修改字体大小
              fontWeight: 'bold', // 修改字体粗细
              color: 'white',   // 修改字体颜色
              // color: '#00f5ff',   // 修改字体颜色
            },
          }
        },
        itemStyle: {
          normal: {  // 调整水球的颜色
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(244, 184, 228, 1)',
                },
                {
                  offset: 0.3,
                  color: 'rgba(0, 245, 255, 0.5)',
                },
                {
                  offset: 1,
                  color: 'rgba(0, 245, 255, 1)',
                },
              ],
              globalCoord: false,
            },
          },
        },
        outline: {
          borderDistance: 0,
          itemStyle: {
            borderWidth: 0,
            borderColor: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,

              globalCoord: false,
            },
          },
        },
        backgroundStyle: {
          color: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [
              { offset: 0, color: 'rgba(0,59,51, 0)' },
              { offset: 0.75, color: 'rgba(0,59,51, 0)' },
              { offset: 1, color: 'rgba(37,237,259, 1)' },
            ],
            globalCoord: false,
          },
        }
      },
    ],
    // 布局组件
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  }

  myCharts.setOption(option)
})
</script>

<style scoped lang="scss">
.tourist_ratio {
  background: url('@/assets/screen/dataScreen-blocks.png') no-repeat;
  background-size: 100% 100%;
  margin: 10px 0;

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
      flex: 1;
      width: 30px;
      height: 60px;
      text-align: center;  // 文字居中
      font-size: 30px;
      line-height: 70px;
      background: url("@/assets/screen/btn.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .charts {
    width: 100%;
    height: 200px;
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