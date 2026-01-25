import { AxiosRequestConfig } from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    isloading?: boolean // 请求过程是否显示加载 默认 false
    showErrorMessage?: boolean // 请求错误是否提示信息 默认 true
    downloadWhenAttachment?: boolean // 当返回文件格式时是否立即下载 默认 true
    [x: string]: any
  }
}