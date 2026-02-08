import { buildProps, EmitFn } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'

export const previewWordProps = buildProps({
  url: {
    type: String,
    require: true,
    default: ''
  }
} as const)

export type PreviewWordProps = ExtractPropTypes<typeof previewWordProps>

export const previewWordEmits = {
  close: () => true
}

export type PreviewWordEmits = EmitFn<typeof previewWordEmits>
