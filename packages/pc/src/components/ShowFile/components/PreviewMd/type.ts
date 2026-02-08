import { buildProps, EmitFn } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'

export const previewMdProps = buildProps({
  url: {
    type: String,
    require: true,
    default: ''
  }
} as const)

export type PreviewMdProps = ExtractPropTypes<typeof previewMdProps>

export const previewMdEmits = {
  close: () => true
}

export type PreviewMdEmits = EmitFn<typeof previewMdEmits>
