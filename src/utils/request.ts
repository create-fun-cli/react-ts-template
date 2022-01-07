import { notification } from 'antd'
import type { AxiosError } from 'axios'
import axios from 'axios'

const instance = axios.create({ baseURL: import.meta.env.DEV ? '/api' : '/' })

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

instance.interceptors.request.use(config => {
  // 注入自定义配置，例如 token
  // config.headers['Authorization'] = 'Bearer xxx'
  return config
})

instance.interceptors.response.use(
  response => response.data.data,
  (error: AxiosError) => {
    if (error.response) {
      // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
      switch (error.response.status) {
        default:
          notification.error({
            message: error.response.status,
            description: error.response.data.msg,
          })
      }
    } else if (error.request) {
      // 请求已经成功发起，但没有收到响应
      console.log(error.request)
    } else {
      // 发送请求时出了点问题
      if (error.message?.includes('timeout')) {
        notification.error({
          message: 'Timeout',
        })
      }
    }
    return Promise.reject(error)
  },
)

export const request = instance
