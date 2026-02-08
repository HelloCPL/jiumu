import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes, PropType } from 'vue'

export const previewImageProps = buildProps({
  // 其他参数与ElImageViewer保持一致
  urlList: {
    type: Array as PropType<string[]>,
    require: true,
    default: () => []
  },
  teleported: {
    type: Boolean,
    default: true
  },
  infinite: {
    type: Boolean,
    default: false
  },
  zIndex: {
    type: Number,
    default: 999
  }
} as const)

export type PreviewImageProps = ExtractPropTypes<typeof previewImageProps>
