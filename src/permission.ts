// 路由鉴权，项目中路由能不能被访问的权限的设置
/*
 * 全局守卫是作用于所有路由的守卫，常见的全局守卫包括:
 * beforeEach：在每次路由切换之前触发，可以决定是否允许导航
 * beforeResolve：在所有组件内守卫和异步路由组件被解析之后，但在导航被确认之前触发
 * afterEach：导航成功完成后触发
 */
import router from '@/router'
import setting from '@/config/setting'
// 导入进度条插件
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 加载进度条的圆圈去掉
nprogress.configure({ showSpinner: false })
// 引入大仓库跟小仓库的用户相关数据
import pinia from '@/stores'
import useUserStore from '@/stores/modules/users/user'
const userStore = useUserStore(pinia)
const username = userStore.username

// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  // 设置网页标签页的名称
  document.title = `${setting.title} - ${to.meta.title}`
  nprogress.start()
  const token = userStore.token
  if (token) {
    if (to.path == '/login') {
      next('/home')
    } else {
      if (username) {
        // 放行
        next()
      } else {
        // 如果没有用户信息，需要发送请求获取用户信息再放行
        try {
          await userStore.userInfo()
          next()
        } catch (error) {
          // token过期，退出登录，跳转登录
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    // 判断要去的是什么路由，如果是登录，就放行，其余的记录路径并且跳转登录
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})
// 全局后置守卫
router.afterEach((to: any, from: any) => {
  nprogress.done()
})
