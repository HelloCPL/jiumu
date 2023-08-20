import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'

export const particleProps = buildProps({
  width: {
    type: Number,
    default: 540
  },
  height: {
    type: Number,
    default: 290
  },
  color: {
    // 字体颜色
    type: String,
    default: '--jm-color-warning'
  },
  fontSize: {
    // 字体大小
    type: Number,
    default: 100
  },
  gap: {
    // 粒子密度，越小越密集
    type: Number,
    default: 2
  }
} as const)

export type ParticleProps = ExtractPropTypes<typeof particleProps>
