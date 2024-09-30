import { fileURLToPath, URL } from 'node:url'
import { viteMockServe } from 'vite-plugin-mock'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
  // 根据 `mode` 加载 .env 文件的配置
  const env = loadEnv(mode, process.cwd())
  return {
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
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";` // 引入全局 SCSS 文件
        }
      }
    },
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVE,  // 目标 API 服务器的地址
          changeOrigin: true,  // 允许跨域
          rewrite: (path) => path.replace(/^\/api/, ''),  // 重写请求路径，把 `/api` 移除
        }
      }
    }
  }
})

