import { AxiosRequestConfig } from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    isloading?: boolean // 请求过程是否显示加载
    showErrorMessage?: boolean // 请求错误是否提示信息
    [x: string]: any
  }
}