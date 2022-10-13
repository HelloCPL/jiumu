import { buildProps, EmitFn } from '@jiumu/utils'
import { isString } from 'lodash-es'
import { ExtractPropTypes } from 'vue'

export const roleInfoProps = buildProps({
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

export type RoleInfoProps = ExtractPropTypes<typeof roleInfoProps>

export const roleAddEmits = {
  close: () => true,
  confirm: (type: 'add' | 'update') => isString(type)
}

export type RoleAddEmits = EmitFn<typeof roleAddEmits>
