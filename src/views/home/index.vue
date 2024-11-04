<template>
  <div>
    <el-card>
      <div class="box">
        <img :src="userStore.avatar" class="avatar">
        <div class="bottom">
          <h3 class="title">{{ getTime() }} {{ userStore.username }}</h3>
          <p class="subtitle"> {{ setting.title }} </p>
        </div>
      </div>
    </el-card>
    <el-card style="margin-top: 20px">
      <div class="wellcome">
        <img src="@/assets/images/wellcome1.png" style="height: 600px; width: 700px;">
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// 引入组合式API函数之生命周期函数
import { onMounted } from 'vue'
import { getTime } from '@/utils/time'
import setting from '@/config/setting'
// 获取仓库
import useUserStore from '@/stores/modules/users/user'
const userStore = useUserStore()
// 首页挂载完毕发送请求获取用户信息
onMounted(() => {
  userStore.userInfo()
})
</script>

<style scoped lang="scss">
.box {
  display: flex;
  .avatar{
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .bottom {
    margin-left: 20px;
    .title {
      font-size: 30px;
      font-weight: 900;
      margin-bottom: 30px;
    }
    .subtitle {
      font-style: italic;
      color: $medium-color;
    }
  }
}
.wellcome {
  display: flex;
  justify-content: center; /* 水平方向居中 */
  align-items: center; /* 垂直方向居中 */
  height: 100%; /* 让容器充满高度以实现完全居中 */
}
</style>
