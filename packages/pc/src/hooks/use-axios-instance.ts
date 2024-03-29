/**
 * @author chen
 * @description 请求拦截
 * @update 2022-07-03 15:55:45
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios'
import { toPath } from '@jiumu/utils'
import { useUserStore, useTokenRefreshStore, useResetStore } from '@/store'
import { Code } from '@/enumerations'
import { isArray } from 'lodash-es'
import { updateToken } from '@/api/user'
import router from '@/router'
import { Message, useLoading } from '@/utils/interaction'
const { VITE_TIME_OUT, VITE_API_URL } = import.meta.env

// 创建axios实例
const service: AxiosInstance = axios.create({
  timeout: VITE_TIME_OUT,
  timeoutErrorMessage: '请求超时了',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

const { showLoading, hideLoading } = useLoading()

/**
 * 请求拦截
 * config
 *   isloading 请求过程是否显示加载效果 默认 false
 *   showErrorMessage 请求错误是否显示错误信息 默认 true
 */
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.showErrorMessage = config.showErrorMessage !== false
    if (config.isloading) showLoading()
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
    hideLoading()
    const { config, data } = response
    const configHeaders = config.headers as AxiosRequestHeaders
    const disposition = response.headers['content-disposition']
    // 对项目内置的api做拦截处理
    if (
      config.url?.includes('/jiumu-koa2-ts-test/') ||
      config.url?.includes('/jiumu-koa2-ts-prod') ||
      config.url?.startsWith('/pc/')
    ) {
      if (data.code === Code.success) {
        // 正常
        return Promise.resolve(data)
      } else if (data.code === Code.authLogin) {
        console.log('过期了', data)
        // token 过期需要重新登录 清空数据后跳转到登录页
        const resetStore = useResetStore()
        resetStore.reset()
        router.replace({
          path: '/login',
          query: {
            redirect: location.pathname + location.search
          }
        })
        return Promise.resolve(data)
      } else if (data.code === Code.authRefresh && !configHeaders['retransmission']) {
        // token 重新刷新
        return _retransmit(response)
      } else {
        // 判断是否为文件
        if (disposition && disposition.includes('attachment;')) return Promise.resolve(response)
        return _handleError(data, config.showErrorMessage, data.message)
      }
    } else {
      // 非项目内置api不做拦截处理
      // 判断是否为文件
      if (disposition && disposition.includes('attachment;')) return Promise.resolve(response)
      return Promise.resolve(data)
    }
  },
  (error) => {
    hideLoading()
    let showErrorMessage = true
    if (error && error.code === 'ERR_CANCELED') showErrorMessage = false
    else if (error && error.config && error.config) showErrorMessage = error.config.showErrorMessage
    return _handleError(error, showErrorMessage)
  }
)

// 处理详情错误
function _handleError(data: any, showErrorMessage?: boolean, message?: string | string[]): Promise<any> {
  if (showErrorMessage) {
    let msg: string
    if (message) {
      if (typeof message === 'string') msg = message
      else msg = message.join(',')
    } else msg = '请求发生错误'
    if (message && typeof message === 'string') msg
    if (isArray(message)) message = message.join(',')
    Message({
      type: 'error',
      message: <string>message || '请求发生错误'
    })
  }
  if (!(data && data.code === 'ERR_CANCELED')) console.error(data)
  return Promise.reject(data)
}

// 重发刷新token
async function _retransmit(response: AxiosResponse): Promise<any> {
  const { config, data } = response
  const tokenRefreshStore = useTokenRefreshStore()
  const res = await updateToken(tokenRefreshStore.tokenRefresh)
  if (res.code === 200) {
    tokenRefreshStore.setTokenRefresh(res.data.tokenRefresh)
    ;(config.headers as AxiosRequestHeaders).Authorization = res.data.token
    ;(config.headers as AxiosRequestHeaders).retransmission = '-2-'
    return service({
      ...config
    })
  } else return _handleError(data, config.showErrorMessage)
}

export default service
