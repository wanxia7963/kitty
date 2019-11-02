import axios from 'axios';
import config from './config';
import qs from 'qs';
import Cookies from "js-cookie";
import router from '@/router'
import NProgress from 'nprogress'
import store from '@/store';

// 使用vuex做全局loading时使用
// import store from '@/store'

export default function $axios(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseURL,
      headers: config.headers
    })

    // request 拦截器
    instance.interceptors.request.use(
      config => {
        console.log('request 拦截器')
        NProgress.start();
        let token = Cookies.get('token')
        // console.log('token',token)
        // 1. 请求开始的时候可以结合 vuex 开启全屏 loading 动画
        // console.log(store.state.loading)
        // console.log('准备发送请求...')
        // 2. 带上token
        if (token) {
          config.headers.token = token
        } else {
          // 重定向到登录页面
          router.push('/login')
        }
        // 3. 根据请求方法，序列化传来的参数，根据后端需求是否序列化
        if (config.method === 'post') {
          // if (config.data.__proto__ === FormData.prototype
          //   || config.url.endsWith('path')
          //   || config.url.endsWith('mark')
          //   || config.url.endsWith('patchs')
          // ) {
          // } else {
          //   config.data = qs.stringify(config.data)
          // }
        }
        return config
      },

      error => {

        return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    )

    // response 拦截器
    instance.interceptors.response.use(
      res => {
        const status = res.data.code || 200
        const message = res.data.msg || '未知错误';
        if (status === 1003) {
          store.dispatch('FedLogOut')
            .then(() => router.push({path: '/login'}));
        }
        if (status !== 200) {
          this.$message({
            message: message,
            type: 'error'
          })
          return Promise.reject(new Error(message))
        }
        return res;
      }, error => {
        NProgress.done();
        if(error.response) {
          switch (error.response.status) {
            case 401: store.dispatch('FedLogOut')
              .then(()=>{
                router.push({path: '/login'})
              })
          }
        }
        return Promise.reject(new Error(error));
      })

    // 请求处理
    instance(options).then(res => {
      resolve(res)
      return false
    }).catch(error => {
      reject(error)
    })
  })
}
