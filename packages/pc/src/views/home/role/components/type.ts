import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'

export const roleInfoProps = buildProps({
  id: {
    type: String,
    require: true,
    default: ''
  }
} as const)

export type RoleInfoProps = ExtractPropTypes<typeof roleInfoProps>
