import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import pinia from '@/stores'
// 注册全局样式
import '@/styles/index.scss'
// 引入插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入自定义插件对象: 注册整个项目全局组件
import GlobalComponent from '@/components'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(pinia)
app.use(router)
// 安装应用实例对象
app.use(ElementPlus)
// 安装自定义插件
app.use(GlobalComponent)

app.mount('#app')
