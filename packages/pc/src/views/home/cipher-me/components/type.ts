/**
 * @description 组件参数
 * @author cpl
 * @create 2023-03-24 11:58:07
 */

import { buildProps, EmitFn } from '@jiumu/utils'
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
  confirm: () => true,
  toAddCipherCode: () => true
}
export type CipherAddEmits = EmitFn<typeof cipherAddEmits>

export const cipherCodeAddEmits = {
  close: () => true,
  confirm: () => true
}
export type CipherCodeAddEmits = EmitFn<typeof cipherCodeAddEmits>
