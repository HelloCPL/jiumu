import { buildProps } from '@jiumu/utils'
import { ExtractPropTypes } from 'vue'

export const richTextProps = buildProps({
  text: {
    type: String
  }
} as const)

export type RichTextProps = ExtractPropTypes<typeof richTextProps>
