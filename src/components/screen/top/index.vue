<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="goHome">首页</span>
    </div>
    <div class="center">
      <div class="title">智慧旅游可视化大数据平台</div>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time">当前时间 {{time}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useRouter } from 'vue-router'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import moment from 'moment/moment'

// 存储当前时间
const time = ref(moment().format('YYYY年MM月DD日 hh:mm:ss'))
const timer = ref(0)
const $router = useRouter()
// 点击获取首页按钮回到首页
const goHome = () => {
  $router.push('/home')
}
// 组件挂载完毕，要实时更新当前时间
onMounted(()=>{
  timer.value = setInterval(()=>{
    time.value = moment().format('YYYY年MM月DD日 hh:mm:ss')
  }, 1000)
})
//  组件销毁之前清除定时器
onBeforeUnmount(()=>{
  clearInterval(timer.value)
})
</script>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 40px;
  display: flex;

  .left {
    flex: 1;
    background: url("@/assets/screen/dataScreen-header-left-bg.png") no-repeat;
    background-size: 100% 100%;  // 强制图片拉伸到 100% 宽度和高度
    .lbtn {
      width: 100px;
      height: 40px;
      float: right;
      background: url("@/assets/screen/dataScreen-header-btn-bg.png") no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
      color: $top-color;
    }
  }
  .center {
    flex: 2;
    .title {
      width: 100%;
      height: 74px;
      background: url("@/assets/screen/dataScreen-header-center-bg.png") no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 74px;
      color: $top-color;
      font-size: 30px;
    }
  }
  .right {
    flex: 1;
    background: url("@/assets/screen/dataScreen-header-left-bg.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .rbtn {
      width: 130px;
      height: 40px;
      background: url("@/assets/screen/dataScreen-header-btn-bg.png") no-repeat;
      background-size: 100% 100%;
      float: left;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
      color: $top-color;
    }
    .time {
      color: $top-color;
      font-size: 15px;
    }
  }

}
</style>