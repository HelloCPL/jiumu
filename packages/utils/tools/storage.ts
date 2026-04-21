/**
 * @author chen
 * @description 缓存方法
 * @update 2022-07-02 13:44:22
 */
import { isRef, isProxy, toRaw } from 'vue'
import { isObject, isNaN, isNull, isUndefined, isBoolean, isNumber, isArray } from 'lodash-es'
import { decrypt, encrypt } from './crypto'
import cookies, { VueCookies } from 'vue-cookies'

const vueCookies = cookies as unknown as VueCookies

export type StorageType = 'local' | 'session' | 'cookies'

export interface StorageOption {
  type?: StorageType // 缓存类型 默认 local
  prefix?: string // 缓存key前缀
  expire?: number // 缓存有效期 单位 s 每次获取或设置自动更新有效期
  encrypt?: boolean // 缓存内容是否加密
}

interface StorageRemoveOption {
  type?: StorageType // 缓存类型 默认 local
  prefix?: string // 缓存key前缀
}

abstract class StroageAbstractClass {
  static setItem: (key: string, value: any, option?: StorageOption) => void
  static getItem: (key: string, option?: StorageOption) => any
  static removeItem: (key: string, option?: StorageRemoveOption) => void
  static clear: (type?: StorageType) => void
}

// 缓存集合方法类
export class storage implements StroageAbstractClass {
  /**
   * 缓存任意类型的值
   * 可指定缓存有效期 默认不设置
   * 可选择加密缓存内容 默认不加密
   * 可选 localStorage sessionStorage cookies 默认使用 localStorage
   * 如果是 ref 或 reactive 会转成普通对象格式存储
   */
  static setItem(key: string, value: any, option?: StorageOption) {
    const tools = getTool(option?.type)
    key = formatKey(key, option?.prefix ?? '')
    value = _setItemFormat(value)
    if (!value) return null
    if (option?.encrypt) {
      value = encrypt(value)
      value += '__encrypt__'
    }
    value += getExpireTag(option?.expire ?? 0)
    tools.setItem(key, value)
  }

  /**
   * 获取指定的缓存
   * 会自动解构存储数据的类型 无需另外解构
   * 如设置了有效期 有效内获取自动延期 过期过后自动清空
   */
  static getItem(key: string, option?: StorageOption): any {
    const tools = getTool(option?.type)
    const _key = formatKey(key, option?.prefix ?? '')
    let value = tools.getItem(_key)
    if (value === null) return null
    // 处理是否过期
    const expire = validExpire(value)
    if (expire === 0) {
      tools.removeItem(_key)
      return null
    } else {
      value = value.replace(/__exp.*pxe__/g, '')
    }
    // 处理是否加密
    const reg = /__encrypt__/g
    const encrypt = value.search(reg) === -1 ? false : true
    if (encrypt) {
      value = decrypt(value.replace(reg, ''))
    }
    value = _getItemFormat(value)
    // 更新缓存时间
    if (expire > 0)
      storage.setItem(key, value, {
        type: option?.type,
        prefix: option?.prefix,
        expire: option?.expire || expire,
        encrypt: option?.encrypt || encrypt
      })
    return value
  }

  /**
   * 清除某个指定的缓存
   */
  static removeItem(key: string, option?: StorageRemoveOption) {
    const tools = getTool(option?.type)
    key = formatKey(key, option?.prefix ?? '')
    tools.removeItem(key)
  }

  /**
   * 清空所有缓存 慎用
   */
  static clear(type?: StorageType) {
    const tools = getTool(type)
    tools.clear()
  }
}

/**
 * 获取对应的缓存方法
 * @param type 指定缓存工具类型
 */
function getTool(type?: StorageType): Storage {
  if (type === 'cookies') {
    return {
      setItem: (key: string, value: any) => vueCookies.set(key, value, -1),
      getItem: (key: string) => vueCookies.get(key),
      removeItem: (key: string) => vueCookies.remove(key),
      clear: () => {
        const keys = vueCookies.keys()
        if (isArray(keys) && keys.length) {
          keys.forEach((key) => {
            vueCookies.remove(key)
          })
        }
      }
    } as unknown as Storage
  } else if (type === 'session') {
    return sessionStorage
  } else {
    return localStorage
  }
}

/**
 * 格式化key名称
 * @param key
 * @param prefix 指定前缀
 */
function formatKey(key: string, prefix?: string): string {
  const { VITE_DIR, VITE_MODE } = import.meta.env
  return `${prefix || ''}_${VITE_DIR}_${VITE_MODE}_${key}`
}

/**
 * 获取有效时长标记
 * @param second 有效时长 单位 s 小于等于 0 不设置有效期
 */
function getExpireTag(second: number): string {
  if (second > 0) {
    return `__exp${encrypt(new Date().valueOf()) + 'e&&e' + encrypt(second)}pxe__`
  }
  return ''
}

/**
 * 校验所给数据是否设置有效期
 * @param value 缓存的原始数据
 * @returns -1 未设置时间 0 已过期 > 0 设置的有效期 单位 s
 */
function validExpire(value: string): number {
  let num = -1
  if (typeof value === 'string' && value.search(/__exp.*pxe__/g) !== -1) {
    const start = value.indexOf('__exp')
    const end = value.indexOf('pxe__')
    const d = value.substring(start + 5, end)
    const arr = d.split('e&&e')
    if (arr.length >= 2) {
      const t1 = Number(decrypt(arr[0]))
      const t2 = Number(decrypt(arr[1]))
      if (t1 && t2) {
        num = t1 + t2 * 1000 > new Date().valueOf() ? t2 : 0
      }
    }
  }
  return num
}

// 格式化存储数据
function _setItemFormat(value: any): string {
  if (isRef(value)) {
    value = { value: value.value }
  } else if (isProxy(value)) {
    value = toRaw(value)
  }
  if (isNaN(value)) return '__NaN__'
  else if (isNull(value)) return '__Null__'
  else if (isUndefined(value)) return '__Undefined__'
  else if (isBoolean(value)) return `__Boolean__${value.toString()}`
  else if (isNumber(value)) return `__Number__${value.toString()}`
  else if (isObject(value)) return JSON.stringify(value)
  return value as string
}

// 解构存储数据格式
function _getItemFormat(value: any): any {
  const reg = /^-?\d+(?:\.\d*)?$/
  const specialArr = ['false', 'true', 'undefined', 'null', 'NaN', 'Infinity', '-Infinity']
  if (!value || typeof value === 'object') return value
  else if (value === '__NaN__') return NaN
  else if (value === '__Null__') return null
  else if (value === '__Undefined__') return undefined
  else if (value === '__Boolean__true') return true
  else if (value === '__Boolean__false') return false
  else if (value.startsWith('__Number__')) return Number(value.substring(10))
  else if (reg.test(value) || specialArr.includes(value)) return value
  try {
    value = JSON.parse(value)
  } catch (e) {}
  return value
}
