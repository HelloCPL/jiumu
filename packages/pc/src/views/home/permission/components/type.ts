import { buildProps } from '@jiumu/utils'
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
