import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'

export const userInfoProps = buildProps({
  id: {
    type: String,
    require: true,
    default: ''
  }
} as const)

export type UserInfoProps = ExtractPropTypes<typeof userInfoProps>
