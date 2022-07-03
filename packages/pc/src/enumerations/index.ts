/**
 * 返回数据状态码
 */
export enum Code {
  success = 200,
  error = 500,
  parameter = 400,
  notFound = 404,
  forbidden = 403, // 权限不足
  authFailed = 401, // 授权失败
  authLogin = 205, // 重新登录
  authRefresh = 206, // token 失效需重新刷新
  locked = 423 // 静态资源被锁定，用于不返回日志信息
}

export type CodeType = keyof typeof Code
