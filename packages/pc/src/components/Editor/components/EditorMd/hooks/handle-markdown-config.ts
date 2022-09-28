/*
 * markdown 编辑器默认配置
 */
import { EditorMarkdownProps, ToolbarConfig } from '../type'

export const getToolbarConfig = (config: ToolbarConfig): ToolbarConfig => {
  const options: ToolbarConfig = {}
  return options
}

export const handleMarkdownConfig = (props: EditorMarkdownProps) => {
  const includeLevel = [1, 2, 3, 4, 5]
  const leftToolbar: string =
    'undo redo | h bold italic strikethrough quote hr ul ol code link image table sync-scroll toc preview fullscreen'

  return {
    includeLevel,
    leftToolbar,
    rightToolbar: ''
  }
}
