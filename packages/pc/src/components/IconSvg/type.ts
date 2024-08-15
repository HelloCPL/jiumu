/**
 * 参数
 */

import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'

export const iconSvgProps = buildProps({
  name: {
    type: String,
    required: true
  },
  width: {
    type: [String, Number]
  },
  height: {
    type: [String, Number]
  },
  size: {
    type: [String, Number]
  },
  fill: {
    type: String
  },
  hoverFill: {
    type: String
  }
} as const)

export type IconSvgProps = ExtractPropTypes<typeof iconSvgProps>
