import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'

export const tagInfoProps = buildProps({
  id: {
    type: String,
    require: true,
    default: ''
  },
  code: {
    type: String,
    default: ''
  }
} as const)

export type TagInfoProps = ExtractPropTypes<typeof tagInfoProps>
