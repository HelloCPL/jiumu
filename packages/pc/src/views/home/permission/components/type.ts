import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'

export const permissionInfoProps = buildProps({
  id: {
    type: String,
    require: true,
    default: ''
  }
} as const)

export type PermissionInfoProps = ExtractPropTypes<typeof permissionInfoProps>
