/*
 * markdown 编辑器逻辑处理
 */
import { handleMarkdownConfig } from './handle-markdown-config'
import { EditorMarkdownProps } from '../type'

export const useMarkdownIndex = (props: EditorMarkdownProps) => {
  const { includeLevel, leftToolbar } = handleMarkdownConfig(props)
  return {
    includeLevel,
    leftToolbar
  }
}
