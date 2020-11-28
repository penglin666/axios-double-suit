/**
 * axios请求的工具函数
 * 2019-11-13 by 我自己
 */

// 引入核心库
import axios from 'axios'
import qs from 'qs'

// 引入ui组件
import { Message } from 'element-ui'

// 设置请求的服务器根路径
axios.defaults.baseURL = 'http://xxxxxx1'
// 设置请求超时
axios.defaults.timeout = 3000;

// 设置请求拦截器（在请求发送出去之前 带上一些东西）
axios.interceptors.request.use(cofing => {
  return cofing;
}, err => Promise.reject(err))

// 设置响应拦截器 在接收到后端的响应结果以后 统一处理
axios.interceptors.response.use(response => {
  // 拦截数据  统一处理
  let { code, msg } = response.data;
  if (code === 0) {
    Message({ type: 'success', message: msg })
  }
  else if (code === 1) {
    Message.error(msg)
  }

  return response
}, err => {
  Message.error('网络请求发生错误，请稍后再试！')
  Promise.reject(err)
})


// get和post请求
export default {
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, { params })
        .then(response => {
          resolve(response.data) // 成功
        })
        .catch(err => {
          reject(err) // 失败
        })
    })
  },
  post(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, qs.stringify(params))
        .then(response => {
          resolve(response.data) // 成功
        })
        .catch(err => {
          reject(err) // 失败
        })
    })
  }
}

