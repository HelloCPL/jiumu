import dayjs from 'dayjs'
import { isArray, isFunction } from 'lodash-es'

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

// 获取随机id
export const getRandomId = (prefix = 'jiumu', len = 6): string => {
  const str = 'abcdefghijklmnopqrstuvwxzy'
  let id: string = prefix
  id += new Date().valueOf()
  for (let i = 0; i < len; i++) {
    const s = Math.floor(Math.random() * 26)
    id += str.substr(s, 1)
  }
  return id
}

// 拼接数据 排除相同的id
type DataDiff = {
  id: string
  [x: string]: any
}
export const getDataDiff = <T extends DataDiff>(origin: T[], target: T[]): T[] => {
  const _find = (data: T[], info: T): boolean => {
    let flag = false
    data.find((item) => {
      if (item.id === info.id) {
        flag = true
      }
      return flag
    })
    return flag
  }
  target.forEach((item) => {
    if (!_find(origin, item)) {
      origin.push(item)
    }
  })
  return origin
}

/*
 * 数字转中文
 * 仅支持整数 最大万亿
 */
export const toChineseNumber = (num: number): string => {
  let n: number = Number(num)
  if (n === 0) return '零'
  if (n) {
    const arr1: string[] = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    const arr2: string[] = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万']
    let str: string = ''
    let i = Math.floor(n % 10)
    n = Math.floor(n / 10)
    let u = arr2.shift()
    while (n > 9) {
      str = arr1[i] + u + str
      u = arr2.shift()
      i = Math.floor(n % 10)
      n = Math.floor(n / 10)
    }
    if (n === 0) str = arr1[i] + u + str
    else str = arr1[n] + arr2.shift() + arr1[i] + u + str
    str = str
      .replace(/零[十百千]/g, '零')
      .replace(/零+/g, '零')
      .replace(/零万/g, '万')
      .replace(/零亿/g, '亿')
      .replace(/^一十/, '十')
      .replace(/零$/, '')
    return str
  }
  return ''
}

/**
 * 获取目标索引
 */
export const findIndex = <T>(arr: T[], value: (item: T) => boolean | T): number => {
  let targetIndex = -1
  if (isArray(arr)) {
    if (!isFunction(value)) {
      const _value = value
      value = (item: any) => {
        return item === _value
      }
    }
    arr.find((item: any, index) => {
      if (value(item)) {
        targetIndex = index
        return true
      }
      return false
    })
  }
  return targetIndex
}
