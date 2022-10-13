import { buildProps, EmitFn } from '@jiumu/utils'
import { isString } from 'lodash-es'
import { ExtractPropTypes } from 'vue'

export const permissionInfoProps = buildProps({
  id: {
    type: String,
    require: true,
    default: ''
  },
  label: {
    type: String,
    default: ''
  }
} as const)

export type PermissionInfoProps = ExtractPropTypes<typeof permissionInfoProps>

export const permissionAddEmits = {
  close: () => true,
  confirm: (type: 'add' | 'update') => isString(type)
}

export type PermissionAddEmits = EmitFn<typeof permissionAddEmits>
