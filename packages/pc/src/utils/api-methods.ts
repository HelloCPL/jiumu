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
  return new Promise((resolve, reject) => {
    service({
      ...config,
      method: 'get',
      url,
      params
    })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * post 请求 key value 形式
 */
export const post = (url: string, params?: ObjectAny, config: AxiosRequestConfig = {}): Promise<any> => {
  return new Promise((resolve, reject) => {
    service
      .post(url, QS.stringify(params), config)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * postForm 传递 json 对象 如上次文件
 */
export const postForm = (url: string, params?: ObjectAny, config: AxiosRequestConfig = {}): Promise<any> => {
  return new Promise((resolve, reject) => {
    service
      .post(url, params, config)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
