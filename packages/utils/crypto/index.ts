/**
 * @author chen
 * @description 加密解密方法
 * @update 2022-07-02 12:13:24
 */

import CryptoJS from 'crypto-js'
import { createSecret } from '../../../config/secret'

/**
 * crypto-js 加密方法
 */
export function encrypt(str: string | number, keyStr?: string, ivStr?: string): string {
  if (!str) return ''
  try {
    const { CRYPTOJS_KEY, CRYPTOJS_IV } = createSecret(import.meta.env.VITE_MODE)
    const word = str + ''
    const key = CryptoJS.enc.Utf8.parse(keyStr || CRYPTOJS_KEY)
    const iv = CryptoJS.enc.Utf8.parse(ivStr || CRYPTOJS_IV)
    const srcs = CryptoJS.enc.Utf8.parse(word)
    return CryptoJS.AES.encrypt(srcs, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    }).toString()
  } catch (e) {
    return ''
  }
}

/**
 * crypto-js 解密方法
 */
export function decrypt(str: string, keyStr?: string, ivStr?: string): string {
  if (!str) return str
  try {
    const { CRYPTOJS_KEY, CRYPTOJS_IV } = createSecret(import.meta.env.VITE_MODE)
    const key = CryptoJS.enc.Utf8.parse(keyStr || CRYPTOJS_KEY)
    const iv = CryptoJS.enc.Utf8.parse(ivStr || CRYPTOJS_IV)
    const descyptStr = CryptoJS.AES.decrypt(str, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    }).toString(CryptoJS.enc.Utf8)
    return formatStr(descyptStr)
  } catch (e) {
    return ''
  }
}
// 将多余空格去除
function formatStr(str: string): string {
  if (!str) return ''
  try {
    // 方法1: 使用正则表达式直接移除所有不可见控制字符和零宽字符
    // 保留普通空格，移除其他空白和控制字符
    let cleaned = str.replace(/[\x00-\x1F\x7F\u200B\uFEFF]/g, '')
    // 方法2: 特别处理ZeroPadding的尾部空字符
    cleaned = cleaned.replace(/\x00+$/, '')
    // 方法3: 移除字符串开头和结尾的不可见字符
    cleaned = cleaned.replace(/^[\s\x00-\x1F]+|[\s\x00-\x1F]+$/g, '')
    return cleaned
  } catch (e) {
    return str
  }
}
