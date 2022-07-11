/**
 * @author chen
 * @description 加密解密方法
 * @update 2022-07-02 12:13:24
 */

import CryptoJS from 'crypto-js'
import { createSecret } from '../../config/secret'

/**
 * crypto-js 加密方法
 */
export function encrypt(str: string | number, keyStr?: string, ivStr?: string): string {
  if (!str) return str.toString()
  try {
    const { CRYPTOJS_KEY, CRYPTOJS_IV } = createSecret(import.meta.env.VITE_MODE)
    str = str.toString()
    keyStr = keyStr ? keyStr : CRYPTOJS_KEY
    ivStr = ivStr ? ivStr : CRYPTOJS_IV
    const key = CryptoJS.enc.Utf8.parse(keyStr)
    const iv = CryptoJS.enc.Utf8.parse(ivStr)
    const srcs = CryptoJS.enc.Utf8.parse(str)
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
    keyStr = keyStr ? keyStr : CRYPTOJS_KEY
    ivStr = ivStr ? ivStr : CRYPTOJS_IV
    const key = CryptoJS.enc.Utf8.parse(keyStr)
    const iv = CryptoJS.enc.Utf8.parse(ivStr)
    const descyptStr = CryptoJS.AES.decrypt(str, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    }).toString(CryptoJS.enc.Utf8)
    // return _formatStr(descyptStr)
    return descyptStr
  } catch (e) {
    return ''
  }
}

// 将多余空格去除
// function _formatStr(str: string): string {
//   if (!str) return ''
//   const strArr = str.split('')
//   let targetStr = ''
//   for (let i = 0, len = strArr.length; i < len; i++) {
//     const item = strArr[i].trim()
//     if (item && item != '\x00' && item != '\x02') {
//       targetStr += item
//     }
//   }
//   return targetStr
// }
