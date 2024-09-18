import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import pinia from '@/stores'
// 引入插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(pinia)
app.use(router)
// 安装应用实例对象
app.use(ElementPlus)

app.mount('#app')
