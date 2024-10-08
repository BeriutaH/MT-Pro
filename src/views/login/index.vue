<template>
  <div class="login_container">
    <!--  一行两列，一人占一半 栅格24个，左右各12个，xs=0当网页小于等以768的时候，直接隐身-->
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_from" :model="loginForm" :rules="loginRules" ref="loginRef">
          <h1>Hello</h1>
          <h2>欢迎进入平台</h2>
          <el-form-item prop="username">
            <!-- 输入的用户名 -->
            <el-input
              :prefix-icon="UserFilled"
              v-model="loginForm.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
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
            <el-button
              :loading="loading"
              class="login_btn custom_button"
              type="primary"
              size="default"
              @click="handleLogin"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { getTime } from '@/utils/time'
// 消息提示窗
import { ElNotification } from 'element-plus'
// 引入用户相关的小仓库
import useUserStore from '@/stores/modules/users/user'
const useStore = useUserStore()
console.log('小仓库', useStore)
import { UserFilled, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
const loginForm = reactive({
  username: 'admin',
  password: '111111'
})

//  定义登录表单校验规则
const loginRules = reactive({
  username: [
    { required: true, min: 3, max: 10, message: '长度不得小于3位，不得超出10位', trigger: 'blur' }
  ],
  password: [
    { required: true, min: 3, max: 12, message: '长度不得小于3位，不得超出12位', trigger: 'blur' }
  ]
})
// const validatorUserName = (rule:any, value: any, callback: any) => {
//   /*
//   * rule: 即校验规则对象
//   * value: 即为表单元素文本内容
//   * callback: 如果符合条件callback放行通过, 如果不符合条件cal1Back方法，注入错误提示信息
//   */
//
//   // console.log('规则', rule)
//   // console.log('值', value)
//   // console.log('回调', callback)
//   if (value.length >= 5) {
//     callback()
//   } else {
//     callback(new Error('账号长度至少5位'))
//   }
// }
// const validatorPassword = (rule:any, value: any, callback: any) => {
//   if (value.length >= 8) {
//     callback()
//   } else {
//     callback(new Error('密码长度至少8位'))
//   }
// }
//
// //  自定义表单校验规则
// const loginRules = {
//   username: [
//     {trigger: 'blur', validator: validatorUserName}
//   ],
//   password: [
//     {trigger: 'blur', validator: validatorPassword}
//   ]
// }
// 获取路由器
const $router = useRouter()
const $route = useRoute()

let loading = ref(false)
let loginRef = ref()
const handleLogin = async () => {
  /*
   * 点击登录按钮，通知仓库发送登录请求
   * 请求成功-> 首页展示数据
   * 请求失败-> 弹出请求失败信息
   */
  // 只有所有表单校验通过后才会发送请求
  await loginRef.value.validate()
  loading.value = true // 让登录按钮转圈
  console.log('登录信息', loginForm)
  // const loginRes = useStore.userLogin(loginForm)
  // console.log(loginRes)
  try {
    await useStore.userLogin(loginForm)
    // 加载效果消失
    loading.value = false
    // 获取有没有redirect参数,没有跳转首页
    const redirect: any = $route.query.redirect || '/home'
    await $router.push(redirect)
    // 弹出成功信息
    ElNotification({
      type: 'success',
      message: '登录成功',
      title: `HI, ${getTime()}`
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
      color: $primary-color;
      font-size: 2rem; // 调整字体大小
      font-weight: bold; // 设置为粗体
      margin-bottom: 15px;
    }
    h2 {
      color: $primary-color;
      margin-bottom: 10px;
    }
  }
  .login_btn {
    width: 100%;
  }
}
</style>
