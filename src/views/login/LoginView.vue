<template>
  <div class="login_container">
    <!--  一行两列，一人占一半 栅格24个，左右各12个，xs=0当网页小于等以768的时候，直接隐身-->
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_from">
          <h1>Hello</h1>
          <h2>欢迎进入平台</h2>
          <el-form-item>
            <!-- 输入的用户名 -->
            <el-input
              :prefix-icon="UserFilled"
              v-model="loginForm.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <!-- 输入的密码 -->
            <el-input
              :prefix-icon="Lock"
              type="password"
              v-model="loginForm.password"
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" class="login_btn" type="primary" size="default" @click="handleLogin"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
// 消息提示窗
import { ElNotification } from 'element-plus'
// 引入用户相关的小仓库
import useUserStore from '@/stores/modules/user'
const useStore = useUserStore()
console.log("小仓库", useStore)
import { UserFilled, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
const loginForm = reactive({
  username: 'admin',
  password: 'admin12'
})
// 获取路由器
const $router = useRouter()
let loading = ref(false)
const handleLogin = async () => {
  /*
  * 点击登录按钮，通知仓库发送登录请求
  * 请求成功-> 首页展示数据
  * 请求失败-> 弹出请求失败信息
  */
  loading.value = true  // 让登录按钮转圈
  console.log('登录信息', loginForm)
  // const loginRes = useStore.userLogin(loginForm)
  // console.log(loginRes)
  try {
    await useStore.userLogin(loginForm)
    // 加载效果消失
    loading.value = false
    // 跳转首页
    await $router.push('/home')
    // 弹出成功信息
    ElNotification({
      type: 'success',
      message: '登录成功'
    })
  } catch (error) {
    // 加载效果消失
    loading.value = false
    // 登录失败，弹出错误信息
    ElNotification({
      type: 'error',
      message: (error as Error).message || '登录失败'
    })
  }
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('../../assets/images/background.png') no-repeat;
  background-size: cover;
  .login_from {
    position: relative;
    width: 40%;
    top: 25vh;
    padding: 40px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* 背景阴影样式 */
    border-radius: 20px; /* 圆角样式，调整10px为你想要的圆角值 */
    background-color: rgba(255, 255, 255, 0.4); /* 确保背景色可见 */
    margin-left: 30%; /* 增加左侧空白，将元素右移 */
    h1 {
      color: #295f5f;
    }
    h2 {
      color: #295f5f;
    }
  }
  .login_btn {
    width: 100%;
  }
}
</style>
