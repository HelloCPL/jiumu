import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'

export const menuInfoProps = buildProps({
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

export type MenuInfoProps = ExtractPropTypes<typeof menuInfoProps>
