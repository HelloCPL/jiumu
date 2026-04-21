import dayjs from 'dayjs'
import { isObject, isString } from 'lodash-es'
import { storage } from './storage'
import { getCurrentInstance } from 'vue'

/**
 * 返回格式后的路径
 * 如 member/list 或 member/list/ ==> /member/list
 * @param arg 路径参数
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
 * @param date 日期
 * @param format 格式化字符串
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
 * @param arr 目标数组
 * @param key 键名
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
 * @param html 富文本 html 字符串
 */
export const getText = (html: string): string => {
  if (!html) return ''
  return html.replace(/<\/?[^>]*>|(\n|\t|\r)|(\s)/g, '')
}

/**
 * 获取后缀
 * @param str 目标字符串
 * @param separator 分隔符
 * @param includeSeparator 是否包含分隔符
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

/**
 * 格式化文件大小
 * @param size 文件大小 单位字节
 * @param len 小数位数
 */
export const formatFileSize = (size: number, len = 1): string => {
  if (!size) return '0B'
  const units = ['B', 'KB', 'M', 'G', 'T', 'P']
  let i = 0
  while (size >= 1024) {
    size /= 1024
    ++i
  }
  return size.toFixed(len) + units[i]
}

/**
 * 根据 url 获取文件名
 * @param url 文件 url
 * @param includeSuffix 是否包含后缀
 */
export const getFileName = (url: string, includeSuffix = true) => {
  if (!url || typeof url !== 'string') return ''

  try {
    let cleanUrl = url.split('?')[0].split('#')[0]
    while (cleanUrl.endsWith('/')) {
      cleanUrl = cleanUrl.slice(0, -1)
    }
    let fileName = cleanUrl.substring(cleanUrl.lastIndexOf('/') + 1)
    if (!includeSuffix) {
      const lastIndex = fileName.lastIndexOf('.')
      if (lastIndex > 0) {
        fileName = fileName.substring(0, lastIndex)
      }
    }
    return fileName ? decodeURIComponent(fileName) : ''
  } catch (error) {
    return ''
  }
}

/**
 * 获取随机id
 * @param prefix 前缀
 * @param len 随机长度
 */
export const getRandomId = (prefix = 'yfs', len = 6): string => {
  const str = 'abcdefghijklmnopqrstuvwxzy'
  let id: string = prefix
  id += new Date().valueOf()
  for (let i = 0; i < len; i++) {
    const s = Math.floor(Math.random() * 26)
    id += str.substr(s, 1)
  }
  return id
}

type DataDiff = {
  id: string
  [x: string]: any
}
/**
 * 拼接数据 排除相同的id
 * @param origin 原始数据
 * @param target 目标数据
 */
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

/**
 * 数字转中文
 * 仅支持整数 最大万亿
 * @param num 目标数字
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
 * 将 JSON 格式文本转为对象
 * @param text 文本
 * @returns 返回转换后的对象
 */
export const toParse = (text: string): ObjectAny | null => {
  try {
    if (isObject(text)) return text as unknown as ObjectAny
    if (text && isString(text)) return JSON.parse(text)
    return null
  } catch (e) {
    return null
  }
}

/**
 * 将对象转为 JSON 格式文本
 * @param obj 要转换的对象或数组
 * @returns 返回转换后的文本
 */
export const toStringify = (obj: any): string => {
  try {
    if (isObject(obj)) return JSON.stringify(obj, null, 2)
    return obj
  } catch (e) {
    return ''
  }
}

interface ParamsTarget extends ObjectAny {
  id: string
}
/**
 * 合并数组 去除id相同项
 * @param origin 源数组
 * @param origin 目标数组（即要被添加的数组）
 */
export const mergeArray = <T extends ParamsTarget[]>(origin: T, target: T): T => {
  const findOne = (id: string, arr: T) => arr.find((item) => item.id === id)
  if (Array.isArray(target)) {
    target.forEach((item) => {
      const flag = findOne(item.id, origin)
      if (!flag) {
        origin.push(item)
      }
    })
  }
  return origin
}

/**
 * 获取序号
 * @param index 当前索引
 * @param pageNo 当前页码
 * @param pageSize 每页条数
 */
export const getIndex = (index: number, pageNo?: number, pageSize?: number) => {
  if (index === -1) return ''
  let total = index + 1
  if (pageNo && pageSize) total += (pageNo - 1) * pageSize
  return total
}

/**
 * 按比例获取 px 大小
 * @param size 当前值
 */
export function getPx(size: number): number
export function getPx(size: string): string
export function getPx(size: number | string): number | string {
  const theme = storage.getItem('Theme', { prefix: 'pinia', type: 'local' })
  const fontSize = theme?.fontSize || 14

  if (typeof size === 'number') {
    return (size * fontSize) / 14
  }
  const reg = /^(\d+)(px|rem|em)$/
  const m = size.match(reg)
  if (m && m.length === 3) {
    const num = Number(m[1])
    if (num > 0) {
      return (num * fontSize) / 14 + m[2]
    }
  }
  return size
}

export function isSetup() {
  return !!getCurrentInstance()
}
