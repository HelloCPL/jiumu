import { buildProps, EmitFn } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'

export const previewExcelProps = buildProps({
  url: {
    type: String,
    require: true,
    default: ''
  }
} as const)

export type PreviewExcelProps = ExtractPropTypes<typeof previewExcelProps>

export const previewExcelEmits = {
  close: () => true
}

export type PreviewExcelEmits = EmitFn<typeof previewExcelEmits>
