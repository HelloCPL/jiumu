/**
 * @author chen
 * @description 请求方法集合
 * @update 2022-07-03 22:34:36
 */

import service from '@/hooks/use-axios-instance'
import QS from 'qs'
import { AxiosRequestConfig } from 'axios'

/**
 * get请求
 */
export const get = (url: string, params?: ObjectAny, config: AxiosRequestConfig = {}): Promise<any> => {
  return service({
    ...config,
    method: 'get',
    url,
    params
  })
}

/**
 * post 表单请求 key value 形式
 */
export const post = (url: string, params?: ObjectAny, config: AxiosRequestConfig = {}): Promise<any> => {
  return service.post(url, QS.stringify(params), config)
}

/**
 * postForm 发送 JSON 数据、文件上传
 */
export const postForm = (url: string, params?: ObjectAny, config: AxiosRequestConfig = {}): Promise<any> => {
  const headers = config.headers || {}
  if (!headers['Content-Type'] && params) {
    const isFormData = params instanceof FormData
    headers['Content-Type'] = isFormData ? 'multipart/form-data' : 'application/json'
  }
  return service.post(url, params, {
    ...config,
    headers
  })
}
