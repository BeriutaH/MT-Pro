<template>
<div class="transportation_ratio">
  <div class="content">
    <div class="charts" ref="charts"></div>
    <div class="earth">
      <p>交通工具统计数据</p>
      <img src="@/assets/screen/earth5.gif" style="width: 200px; height: auto; margin-left: 30px" alt="Rotating Earth">
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
const charts = ref()
const legendData = ['动保投入', '农资占比2']
const indicator = [
  {
    name: '测试1',
    max: 5000
  },
  {
    name: '测试2',
    max: 5000
  },
  {
    name: '测试3',
    max: 5000
  },
  {
    name: '测试4',
    max: 5000
  },
  {
    name: '测试5',
    max: 5000
  },
  {
    name: '测试6',
    max: 5000
  }
]
onMounted(()=>{
  let myCharts = echarts.init(charts.value)
  const option = {
    tooltip: {
      trigger: 'item',
      borderColor: '#62FFFF',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      show: false,
      orient: 'vertical',
      icon: 'circle', //图例形状
      data: legendData,
      bottom: '5%',
      right: '5%',
      itemWidth: 14, // 图例标记的图形宽度。[ default: 25 ]
      itemHeight: 14, // 图例标记的图形高度。[ default: 14 ]
      itemGap: 21, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
      textStyle: {
        fontSize: 14,
        color: '#00E4FF'
      }
    },
    radar: {
      // shape: 'circle',
      // 调整雷达图的位置
      center: ['50%', '50%'], // 雷达图的中心点，默认在容器的中心
      radius: '90%', // 雷达图的半径，默认占容器大小的 90%
      axisName: {
        color: '#B5BDC8',
        fontSize: 10
      },
      axisNameGap: 5, // 值越小，文字越靠近雷达图
      indicator: indicator,
      splitArea: {
        // 坐标轴在 grid 区域中的分隔区域，默认不显示。
        show: false, // 关闭背景填充区域
        areaStyle: {
          // 分隔区域的样式设置。
          color: '#5F6568'
          // color: ['rgba(255,255,255,0)', 'rgba(255,255,255,0)'] // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
        }
      },
      axisLine: {
        //指向外圈文本的分隔线样式
        show: true,
        lineStyle: {
          color: '#1D6B86'
        }
      },
      splitLine: {
        show: true, // 关闭背景网格线
        lineStyle: {
          color: '#1D6B86', // 分隔线颜色
          width: 1 // 分隔线线宽
        }
      }
    },
    series: [
      {
        type: 'radar',
        symbolSize: 4,
        // symbol: 'angle',
        data: [
          {
            value: [4300, 4700, 3600, 3900, 3800, 4200],
            name: legendData[0],
            lineStyle: {
              width: 1 // 这里设置线条的宽度，比如设置为1使其变细
            },
            itemStyle: {
              width: 5,
              lineStyle: {
                color: '#rgba(74, 153, 255,1)'
                // shadowColor: '#rgba(74, 153, 255,1)',
                // shadowBlur: 10,
              },
              shadowColor: '#rgba(74, 153, 255,1)',
              shadowBlur: 10
            },
            areaStyle: {
              // 单项区域填充样式
              color: {
                type: 'linear',
                x: 0, //右
                y: 0, //下
                x2: 1, //左
                y2: 1, //上
                colorStops: [
                  {
                    offset: 0,
                    // color: '#rgba(74, 153, 255,1)'
                    color: 'rgba(74, 153, 255,1)'
                  },
                  {
                    offset: 0.5,
                    // color: 'rgba(0,0,0,0)'
                    color: 'rgba(74, 153, 255,0.1)'
                  },
                  {
                    offset: 1,
                    // color: '#rgba(74, 153, 255,1)'
                    color: 'rgba(74, 153, 255,1)'
                  }
                ],
                globalCoord: false
              },
              opacity: 1 // 区域透明度
            }
          },
          {
            value: [3200, 3000, 3400, 2000, 3900, 2000],
            name: legendData[1],
            lineStyle: {
              width: 1 // 这里设置线条的宽度，比如设置为1使其变细
            },
            itemStyle: {
              lineStyle: {
                color: 'rgba(75, 255, 252,1)',
                shadowColor: 'rgba(75, 255, 252,1)',
                shadowBlur: 10
              },
              shadowColor: 'rgba(75, 255, 252,1)',
              shadowBlur: 10
            },
            areaStyle: {
              // 单项区域填充样式
              color: {
                type: 'linear',
                x: 0, //右
                y: 0, //下
                x2: 1, //左
                y2: 1, //上
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(75, 255, 252,1)'
                  },
                  {
                    offset: 0.5,
                    // color: 'rgba(0,0,0,0)'
                    color: 'rgba(75, 255, 252,0.1)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(75, 255, 252,1)'
                  }
                ],
                globalCoord: false
              },
              opacity: 1 // 区域透明度
            }
          }
        ]
      }
    ]
  }
  myCharts.setOption(option as any)
})
</script>

<style scoped lang="scss">
.transportation_ratio {
  background: url('@/assets/screen/dataScreen-blocks.png') no-repeat;
  background-size: 100% 100%;
  margin: 10px 0;
  .charts {
    width: 50%;
    height: 180px;
    float: left;
    margin-top: 35px;
  }
  .earth {
    width: 50%;
    height: 140px;
    float: right;
    p {
      font-size: 20px;
      color: white;
      margin-top: 25px;
      //margin-left: 30px;
    }
  }
}
</style>