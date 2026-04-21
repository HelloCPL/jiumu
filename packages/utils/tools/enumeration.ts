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

export type CodeValue = 200 | 500 | 400 | 404 | 403 | 401 | 205 | 206 | 423
export type CodeType = keyof typeof Code

/**
 * 主题类型
 */
export enum Theme {
  '明亮' = 'light',
  '暗黑' = 'drak'
}

export type ThemeValue = 'light' | 'drak'
export type ThemeType = keyof typeof Theme

/**
 * 字体大小
 */
export enum FontSize {
  '特小' = 12,
  '小' = 13,
  '常规' = 14,
  '大' = 16,
  '特大' = 18
}

export type FontSizeValue = 12 | 13 | 14 | 16 | 18
export type FontSizeType = keyof typeof FontSize

/**
 * 字体类型
 * 默认 PingFang 简体 可选 宋 繁体
 */
export enum FontFamily {
  '简体' = 'PingFang',
  '繁体' = 'Traditional'
}

export type FontFamilyValue = 'PingFang' | 'Traditional'
export type FontFamilyType = keyof typeof FontFamily

// 根据枚举的值查找对应的key
export function findEnumKeyByValue<T extends Record<string, any>>(
  record: T,
  value: T[keyof T],
  compare: (a: T[keyof T], b: T[keyof T]) => boolean = (a, b) => a === b
): keyof T | undefined {
  const entries = Object.entries(record) as [keyof T, T[keyof T]][]
  for (const [key, val] of entries) {
    if (compare(val, value)) return key
  }
  return undefined
}

// -------------------- 用法 -----------------------

/**
 * 获取某个枚举的值 如
 * Code.success // 200
 * Code['success'] // 200
 */

/**
 * 根据某个枚举的值获取对应的key
 * findEnumKeyByValue(Code, 200) // success
 */
