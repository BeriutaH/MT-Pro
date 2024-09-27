<template>
  <div>我是首页{{ userStore.username }}</div>
</template>

<script setup lang="ts">
// 引入组合式API函数之生命周期函数
import { onMounted } from 'vue'
// 获取仓库
import useUserStore from '@/stores/modules/user'
const userStore = useUserStore()
// 首页挂载完毕发送请求获取用户信息
onMounted(() => {
  userStore.userInfo()
})
console.log('打印小仓库用户的数据', userStore.username)
console.log('打印小仓库用户的数据', userStore.avatar)
</script>

<style scoped lang="scss"></style>
