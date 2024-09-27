// 对axios的二次封装: 使用请求与响应的拦截器等
import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import useUserStore from '@/stores/modules/user'

// 基础配置
const request = axios.create({
  baseURL: import.meta.env.VITE_SERVE, // 基础路径
  timeout: 5000 // 超时时间5秒
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // config是请求的所有配置信息,在发送请求之前做些什么，比如添加 token
    // 从 localStorage 获取 token
    // const authToken = localStorage.getItem('authToken')
    // // config.headers.Authorization = `Bearer ${yourToken}`
    // // 如果 token 存在，添加到请求头中
    // if (authToken) {
    //   config.headers.Authorization = authToken
    // }
    console.log('请求接口token', config.headers.Authorization)

    // 返回配置对象
    return config
  },
  (error) => {
    // 请求错误处理
    console.log('请求接口错误')
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 请求成功，对响应数据做些什么
    console.log('请求成功的回复')
    return response.data
    // return response
  },
  (error) => {
    // 请求失败，处理Http网络错误
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 封装泛型请求方法，允许调用时指定返回数据的类型
const requestWrapper = <T = any>(config: AxiosRequestConfig): Promise<T> => {
  const userStore = useUserStore()
  const token = userStore.token
  console.log('token', token)
  if (token) {
    config.headers = {
      ...config.headers,
      // Authorization: token // 在 headers 中添加 token
      token: token // 正式平台 在 headers 中添加 token
    }
  }
  return request(config)
}

// 对外暴露
export default requestWrapper
