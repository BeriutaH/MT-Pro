import { fileURLToPath, URL } from 'node:url'
import { viteMockServe } from 'vite-plugin-mock'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    viteMockServe({
      // 配置选项
      mockPath: 'mock', // 指定mock文件夹的目录名称，默认为'mock'
      logger: true, // 在控制台显示 mock 请求日志
      enable: true,  // 是否启用 mock 功能
      watchFiles:true,  // 设置是否监视mockPath对应的文件夹内文件中的更改
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
