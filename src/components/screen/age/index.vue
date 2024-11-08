<template>
<div class="age_ratio">
  <div class="content">
    <div class="title">
      <p>年龄比例</p>
    </div>
    <!-- 图形图表容器 -->
    <div class="charts" ref="charts">

    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const charts = ref()
onMounted(()=>{
  let myCharts = echarts.init(charts.value)
  // 设置配置项
  myCharts.setOption(
    {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '40px',
        right: '15px',
        orient:'vertical',  // 竖着方向
        textStyle:{
          color:'white',
          fontSize:18
        }
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['30%', '50%'],  // 调整位置
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 8,
            // borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            position: 'inside',
            color:'white',
          },
          // emphasis: {  // 放大文字
          //   label: {
          //     show: true,
          //     fontSize: 40,
          //     fontWeight: 'bold'
          //   }
          // },
          labelLine: {
            show: false
          },
          data: [
            { value: 16, name: '10岁以下'},
            { value: 8, name: '10 - 18岁'},
            { value: 12, name: '18 - 30岁'},
            { value: 24, name: '30 - 40岁'},
            { value: 20, name: '40 - 60岁'},
            { value: 20, name: '60岁以上'}
          ]
          // data: [
          //   { value: 16, name: '10岁以下', itemStyle: {color:'#fc8251'}},
          //   { value: 8, name: '10 - 18岁', itemStyle: {color:'#5470c6'}},
          //   { value: 12, name: '18 - 30岁', itemStyle: {color:'#91cd77'}},
          //   { value: 24, name: '30 - 40岁', itemStyle: {color:'#ef6567'}},
          //   { value: 20, name: '40 - 60岁', itemStyle: {color:'#f9c956'}},
          //   { value: 20, name: '60岁以上', itemStyle: {color:'#75bedc'}}
          // ]
        }
      ],
      // 布局组件
      grid: {
        left:0,
        right:0,
        top:0,
        bottom:0,
      }
    }
  )
})
</script>

<style scoped lang="scss">
.age_ratio {
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
    margin-top: 10px;
    height: 260px;
  }
}
</style>