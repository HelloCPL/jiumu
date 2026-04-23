/**
 * 参数
 */

import { ExtractPropTypes } from 'vue'

export const iconSvgBaseProps = {
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
  }
}

export type IconSvgBaseProps = ExtractPropTypes<typeof iconSvgBaseProps>

export const iconSvgVueProps = {
  ...iconSvgBaseProps,
  hoverFill: {
    type: String
  }
}

export type IconSvgVueProps = ExtractPropTypes<typeof iconSvgVueProps>
