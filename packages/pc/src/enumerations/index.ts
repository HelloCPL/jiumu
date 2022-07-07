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
  '暗黑' = 'drak',
  '火红' = 'fireRed'
}

export type ThemeValue = 'light' | 'drak' | 'fireRed'
export type ThemeType = keyof typeof Theme

/**
 * 字体大小
 */
export enum FontSize {
  '小' = 12,
  '常规' = 14,
  '大' = 16,
  '超大' = 18
}

export type FontSizeValue = 12 | 14 | 16 | 18
export type FontSizeType = keyof typeof FontSize

/**
 * 字体类型
 */
export enum FontFamily {
  '平方' = 'PingFang',
  '雅黑' = 'YaHei',
  '宋体' = 'Song',
  '繁体' = 'Traditional'
}

export type FontFamilyValue = 'PingFang' | 'YaHei' | 'Song' | 'Traditional'
export type FontFamilyType = keyof typeof FontFamily

// 根据枚举的值查找对应的key
type Compare<T, U> = (a: T, b: U) => boolean
export function findEnumKeyByValue<T, U extends T[keyof T]>(
  record: T,
  value: U,
  compare: Compare<T[keyof T], U> = (a, b) => a === b
): keyof T | undefined {
  return (Object.keys(record) as Array<keyof T>).find((k) => compare(record[k], value))
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
