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
  const _find = (arr: any[], key) => {
    const item = arr[0]
    console.log('item', item)
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
