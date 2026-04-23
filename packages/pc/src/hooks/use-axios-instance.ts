/**
 * @author chen
 * @description 请求拦截
 * @update 2022-07-03 15:55:45
 */

import axios, { AxiosInstance, AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { toPath, toStringify } from '@jiumu/utils'
import { useUserStore, useTokenRefreshStore, useResetStore } from '@/store'
import { Code } from '@jiumu/utils'
import { isArray } from 'lodash-es'
import { updateToken } from '@/api/user'
import router from '@/router'
import { Message, useLoading } from '@jiumu/utils'
import { _saveFile } from '@jiumu/utils'
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
 *   downloadWhenAttachment 当返回文件格式时是否立即下载 默认 true
 */
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.showErrorMessage = config.showErrorMessage !== false
    config.downloadWhenAttachment = config.downloadWhenAttachment !== false
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
      const showErrorMessage = config.showErrorMessage
      if (data.code === Code.success) {
        // 正常
        return Promise.resolve(data)
      } else if (data.code === Code.authLogin) {
        console.error(data)
        // token 过期需要重新登录 清空数据后跳转到登录页
        if (showErrorMessage) {
          Message({
            message: data.message,
            type: 'error'
          })
        }
        relogin()
        return Promise.resolve(data)
      } else if (data.code === Code.authRefresh && !configHeaders['retransmission']) {
        // token 重新刷新
        return handleRetransmit(response)
      } else {
        // 判断是否为文件
        if (disposition && disposition.includes('attachment;')) {
          if (response?.config?.downloadWhenAttachment) {
            handleFileDownload(response)
          }
          return Promise.resolve(response)
        }
        return handleRejectError(data, showErrorMessage, data.message)
      }
    } else {
      // 非项目内置api不做拦截处理
      // 判断是否为文件
      if (disposition && disposition.includes('attachment;')) {
        if (response?.config?.downloadWhenAttachment) {
          handleFileDownload(response)
        }
        return Promise.resolve(response)
      }
      return Promise.resolve(data)
    }
  },
  (error) => {
    hideLoading()
    let showErrorMessage = true
    if (error && error.code === 'ERR_CANCELED') showErrorMessage = false
    else if (error && error.config && error.config) showErrorMessage = error.config.showErrorMessage
    return handleRejectError(error, showErrorMessage)
  }
)

/**
 * 处理错误
 */
function handleRejectError(data: any, showErrorMessage?: boolean, message?: string | string[]): Promise<any> {
  if (showErrorMessage) {
    let msg: string = ''
    if (message && typeof message === 'string') msg = message
    if (isArray(message)) msg = message.join(',')
    Message({
      type: 'error',
      message: msg || '请求发生错误'
    })
  }
  if (!(data && data.code === 'ERR_CANCELED')) console.error(data)
  return Promise.reject(data)
}

/**
 * 重发刷新token
 */
async function handleRetransmit(response: AxiosResponse): Promise<any> {
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
  } else return handleRejectError(data, config.showErrorMessage)
}

/**
 * 文件下载处理
 */
function handleFileDownload(response: AxiosResponse) {
  let blob: Blob
  if (response.data instanceof Blob) {
    blob = response.data
  } else {
    const text = toStringify(response.data)
    blob = new Blob([text])
  }
  // 从 content-disposition 头中提取文件名
  let filename = 'download-file'
  const disposition = response.headers['content-disposition']
  if (disposition && disposition.includes('filename=')) {
    const filenameMatch = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)
    if (filenameMatch && filenameMatch[1]) {
      filename = filenameMatch[1].replace(/['"]/g, '')
      try {
        filename = decodeURIComponent(filename)
      } catch {}
    }
  }
  _saveFile(blob, filename)
}

let isRelogging = false
/**
 * 重新登录
 */
function relogin() {
  if (isRelogging) return
  isRelogging = true
  const resetStore = useResetStore()
  resetStore.reset()
  router
    .replace({
      path: '/login',
      query: {
        redirect: location.pathname + location.search
      }
    })
    .finally(() => {
      isRelogging = false
    })
}

export default service
