import dayjs from 'dayjs'

/**
 * 返回格式后的路径
 * 如 member/list 或 member/list/ ==> /member/list
 */
export function toPath(...arg: string[]): string {
  const getPath = (path: string) => {
    if (!path) return ''
    if (path.search(/http:\/*$/g) !== -1) {
      path = path.replace(/http:\/*$/g, 'http://')
    }
    if (path.search(/https:\/*$/g) !== -1) {
      path = path.replace(/https:\/*$/g, 'https://')
    }
    if (!path.startsWith('/')) path = '/' + path
    if (path.endsWith('/')) path = path.substring(0, path.length - 1)
    if (path.startsWith('/http:') || path.startsWith('/https:')) path = path.substring(1)
    return path
  }
  return arg.map((item) => getPath(item)).join('')
}

/**
 * 格式化时间
 */
export const formatDate = (date: any, format = 'YYYY-MM-DD HH:mm:ss'): any => {
  if (!date) return ''
  try {
    return dayjs(date).format(format)
  } catch (e) {
    return ''
  }
}

/**
 * 寻找最外层的第一个值
 */
export const findChildrenFirst = (arr: any[] = [], key = 'code') => {
  let target = ''
  const _find = (arr: any[], key: any) => {
    const item = arr[0]
    if (item) {
      if (item.children && item.children.length) {
        _find(item.children, key)
      } else {
        target = item[key]
      }
    }
  }
  _find(arr, key)
  return target
}

/**
 * 清除富文本 html标签 空格 换行
 */
export const getText = (html: string): string => {
  if (!html) return ''
  return html.replace(/<\/?[^>]*>|(\n|\t|\r)|(\s)/g, '')
}

/**
 * 获取后缀
 * suffix 字符 separator 指定分隔符 返回目标是否包含指定分隔符
 */
export const getSuffix = (str: string, separator = '.', includeSeparator = false): string => {
  let suffix: string = ''
  if (!str) return suffix
  let i = str.lastIndexOf(separator)
  if (!includeSeparator) i = i + separator.length
  suffix = str.substring(i)
  const i2 = suffix.indexOf('?')
  if (i2 !== -1) suffix = suffix.substring(0, i2)
  return suffix
}
