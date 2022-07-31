import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'

export const richTextProps = buildProps({
  html: {
    type: String,
    default: ''
  }
} as const)

export type RichTextProps = ExtractPropTypes<typeof richTextProps>
