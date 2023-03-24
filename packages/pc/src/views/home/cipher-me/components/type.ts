/**
 * @description 组件参数
 * @author cpl
 * @create 2023-03-24 11:58:07
 */

import { buildProps, EmitFn } from '@jiumu/utils'
import { isObject, isString } from 'lodash-es'
import { ExtractPropTypes } from 'vue'

// 口令相关
export const cipherAddProps = buildProps({
  id: {
    type: String,
    default: ''
  }
} as const)
export type CipherAddProps = ExtractPropTypes<typeof cipherAddProps>

export const cipherAddEmits = {
  close: () => true,
  confirm: (type?: string) => isString(type)
}
export type CipherAddEmits = EmitFn<typeof cipherAddEmits>

// 口令code相关
export const cipherCodeAddProps = buildProps({
  type: {
    type: String,
    default: ''
  }
} as const)
export type CipherCodeAddProps = ExtractPropTypes<typeof cipherCodeAddProps>

type CipherCodeOption = {
  key: 'close' | 'refresh'
  type?: string
}
export const cipherCodeAddEmits = {
  close: (params: CipherCodeOption) => isObject(params)
}
export type CipherCodeAddEmits = EmitFn<typeof cipherCodeAddEmits>
