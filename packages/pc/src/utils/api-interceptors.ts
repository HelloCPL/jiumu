/**
 * @author chen
 * @description 请求拦截
 * @update 2022-07-03 15:55:45
 */

import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios'
import { toPath } from '@jiumu/utils'
import { useUserStore } from '@/store'
import { Code } from '@/enumerations'
import { isArray } from 'lodash-es'
import { updateToken } from '@/api/user'
const { VITE_TIME_OUT, VITE_API_URL } = import.meta.env

// 创建axios实例
const service = axios.create({
  timeout: VITE_TIME_OUT,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// 接口加载效果
let loading: any
let requireCount = 0
const showLoading = (isLoading?: boolean) => {
  if (requireCount === 0 && !loading && isLoading) {
    // loading = ElLoading.service({
    //   text: '拼命加载中，请稍后...',
    //   background: 'rgba(0, 0, 0, 0.7)',
    //   spinner: 'el-icon-loading'
    // })
  }
  requireCount++
}
const hideLoading = () => {
  requireCount--
  if (requireCount === 0 && loading) {
    // loading.close()
  }
}

/**
 * 请求拦截
 */
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    console.log('config', config)
    // 对项目内置的api添加前缀或token
    const userStore = useUserStore()
    if (config.url?.startsWith('/pc/') || config.url?.startsWith('pc/')) {
      config.url = toPath(VITE_API_URL, config.url)
      const headers = config.headers as AxiosRequestHeaders
      if (userStore.token && headers['retransmission'] !== '-1-') {
        headers.Authorization = userStore.token
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截
service.interceptors.response.use(
  (response: AxiosResponse): Promise<any> => {
    const { config } = response
    const configHeaders = config.headers as AxiosRequestHeaders
    const disposition = response.headers['content-disposition']

    // 对项目内置的api做拦截处理
    if (
      config.url?.includes('/jiumu-koa2-ts-test/') ||
      config.url?.includes('/jiumu-koa2-ts-prod') ||
      config.url?.startsWith('/pc/')
    ) {
      const data: ResponseData = response.data
      if (data.code === Code.success) {
        // 正常
        return Promise.resolve(data)
      } else if (data.code === Code.authLogin) {
        // token 过期需要重新登录 清空数据后跳转到登录页
        return Promise.resolve(data)
      } else if (data.code === Code.authRefresh && !configHeaders['retransmission']) {
        // token 重新刷新
        return _retransmit(response)
      } else {
        // 判断是否为文件
        if (disposition && disposition.includes('attachment;')) return Promise.resolve(response)
        return _handleError(data, data.message)
      }
    } else {
      // 非项目内置api不做拦截处理
      // 判断是否为文件
      if (disposition && disposition.includes('attachment;')) return Promise.resolve(response)
      return Promise.resolve(response.data)
    }
  },
  (error) => _handleError(error)
)

// 处理详情错误
function _handleError(data: any, message?: string | string[]): Promise<any> {
  if (isArray(message)) message = message.join(',')
  // ElMessage({
  //   type: 'error',
  //   message: <string>message || '请求发生错误'
  // })
  console.error(data)
  return Promise.reject(data)
}

// 重发刷新token
async function _retransmit(response: AxiosResponse): Promise<any> {
  const { config, data } = response
  const userStore = useUserStore()
  // const res: any = await service({
  //   url: '/pc/user/update/token',
  //   method: 'post',
  //   headers: {
  //     Authorization: userStore.tokenRefresh,
  //     retransmission: '-1-'
  //   }
  // })
  const res = await updateToken(userStore.tokenRefresh)
  if (res) {
    userStore.setToken(res)
    ;(config.headers as AxiosRequestHeaders).Authorization = res.token
    ;(config.headers as AxiosRequestHeaders).retransmission = '-2-'
    return service({
      ...config
    })
  } else return _handleError(data)
}

export default service
