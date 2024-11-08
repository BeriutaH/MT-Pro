<template>
<div class="map_ratio">
  <div class="content">
    <div class="map" ref="map"></div>
  </div>
</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
// 引入中国地图的json文件
import chinaMapJson from '@/components/screen/map/chine.json'

const map = ref()
// 注册中国地图
echarts.registerMap('china', chinaMapJson as any)
onMounted(()=>{
  let myCharts = echarts.init(map.value)
  // 设置配置项
  myCharts.setOption({
    title: {
      text: '全国景区人流量',  // 设置标题文本
      left: 'center',    // 标题水平居中
      top: '5%',        // 标题距离顶部 10% 的位置（可以调整为更合适的值）
      textStyle: {
        color: '#00f5ff',  // 设置标题的字体颜色
        fontSize: 24,    // 设置标题字体大小
        fontWeight: 'bold' // 设置标题字体加粗
      }
    },
    geo: {
      map:'china',
      roam: true,  // 鼠标缩放效果
      // left:0,  // 地图位置调试
      label: {  // 地图上文字的设置
        show:true,
        color:'white'
      },
      // 如果宽高比大于 1 则宽度为 100，如果小于 1 则高度为 100，保证了不超过 100x100 的区域
      layoutSize: 100,
      itemStyle: {
        // color: '#065758',
        // areaColor:'#00999f',
        areaColor: {
          type: 'linear',
          x: 0,               // 起始点 x 坐标，0 表示左侧
          y: 0,               // 起始点 y 坐标，0 表示顶部
          x2: 1,              // 结束点 x 坐标，1 表示右侧
          y2: 1,              // 结束点 y 坐标，1 表示底部
          colorStops: [
            { offset: 0, color: '#00f5ff' },   // 起始颜色
            { offset: 1, color: '#00171a' }    // 结束颜色
          ]
        },
        borderColor: '#00f5ff',
        shadowColor: 'rgba(0, 245, 255, 0.5)',  // 阴影颜色
        shadowBlur: 15,               // 阴影模糊度
        shadowOffsetX: 5,             // 阴影 x 方向偏移
        shadowOffsetY: 5              // 阴影 y 方向偏移
      },
      // 地图高亮
      emphasis: {
        label: {
          color: '#f4b8e4'  // 高亮区域时文字颜色为白色
        },
        itemStyle: {
          color: '#032e30',
        }
      }

    },
    series:[
      {
        type:'lines', // 航线
        smooth:true,
        data:[
          {
            coords:[
              [105.752937,33.291994],  // 起点[129.013886,43.522976]
              [118.230636,24.401228]  // 终点
            ]
          },
          {
            coords:[
              [125.3245,43.886841],
              [101.778916,36.623178]
            ]
          },
          {
            coords:[
              [85.294711,41.371801],
              [104.065735,30.659462]
            ]
          },
          {
            coords:[
              [104.065735,30.659462],
              [85.294711,41.371801]
            ]
          },
          {
            coords:[
              [117.000923,36.675807],
              [101.485106,25.008643]
            ]
          },
          {
            coords:[
              [104.065735,30.659462],
              [108.7944,23.833381]
            ]
          },
          {
            coords:[
              [116.41995,40.18994],
              [109.754859,19.189767]
            ]
          },
          {
            coords:[
              [109.754859,19.189767],
              [116.41995,40.18994]
            ]
          },
          ],
        // 是否显示特效
        effect:{
          show: true,
          period:4,  // 图标飞跃速度，值越小速度越快
          trailLength:0.4,  // 尾迹长度［0，1] 值越大，尾迹越长
          symboLSize:4,  // 图标大小
          symbol: 'arrow',
          color: 'white',  // 图标颜色
          symbolSize:10
        },
        lineStyle: {
          normal: {
            show: true,
            width:1,
            opacity:0.2,
            curveness:0.2,  // 设置线条的曲度，范围是 0 到 1，`0` 表示直线，`1` 表示曲线
            color:'white'
          }
        }
      },
    ],
    graphic: [
      {
        type: 'rect',
        shape: {
          x: -100,    // 调整阴影的横向偏移量
          y: -100,    // 调整阴影的纵向偏移量
          width: 2000, // 设置阴影的宽度，确保它能覆盖整个地图
          height: 1500 // 设置阴影的高度，确保它能覆盖整个地图
        },
        style: {
          fill: 'rgba(0, 98, 102, 0.5)'  // 设置阴影颜色为半透明黑色
        },
        z: -1 // 确保阴影在地图下层
      }
    ]
  })
})

</script>

<style scoped lang="scss">
.map_ratio {
  background: url('@/assets/screen/dataScreen-blocks.png') no-repeat;
  background-size: 100% 100%;

  .content {
    padding: 20px; // 所有内容内缩 20px，避免紧贴边缘
  }
  .map {
    margin-top: 10px;
    height: 990px;
  }
}
</style>