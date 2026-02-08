/**
 * pdfjs 组件参数类型
 */

import { EmitFn, buildProps } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'

export const previewPdfProps = buildProps({
  url: {
    type: String,
    require: true,
    default: ''
  }
} as const)

export type PreviewPdfProps = ExtractPropTypes<typeof previewPdfProps>

export const previewPdfEmit = {
  close: () => true
}

export type PreviewPdfEmit = EmitFn<typeof previewPdfEmit>
