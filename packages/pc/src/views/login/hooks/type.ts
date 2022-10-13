/**
 * 登录注册类型
 */

export interface LoginShow {
  show: boolean
  top: number
  opacity: number
}

export interface LoginInfo {
  phone: string
  password: string
  confirmPassword?: string
}
