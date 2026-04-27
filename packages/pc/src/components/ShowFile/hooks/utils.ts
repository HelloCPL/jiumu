/**
 * 获取可预览的文件类型
 */
export const getPreviewFileType = (suffix: string) => {
  const list = [
    { key: 'image', suffixs: ['png', 'jpg', 'jpeg', 'gif'] },
    { key: 'pdf', suffixs: ['pdf'] },
    { key: 'word', suffixs: ['docx', 'doc'] },
    { key: 'excel', suffixs: ['xls', 'xlsx'] },
    { key: 'markdown', suffixs: ['md'] },
    { key: 'text', suffixs: ['txt'] },
    { key: 'json', suffixs: ['json', 'jsonc'] },
    // { key: 'javascript', suffixs: ['js', 'jsx'] },
    { key: 'typescript', suffixs: ['js', 'jsx', 'ts', 'tsx'] },
    { key: 'html', suffixs: ['html'] },
    { key: 'vue', suffixs: ['vue'] },
    { key: 'xml', suffixs: ['xml'] },
    { key: 'sass', suffixs: ['css', 'scss', 'less', 'sass', 'styl'] },
    { key: 'java', suffixs: ['java', 'jsp'] },
    { key: 'base', suffixs: ['sh', 'bash', 'zsh', 'ksh', 'csh', 'tcsh'] },
    { key: 'python', suffixs: ['py', 'pyc'] },
    { key: 'php', suffixs: ['php', 'phtml'] },
    { key: 'c', suffixs: ['c', 'h', 'cpp', 'hpp'] }
  ]
  let type = ''
  list.find((item) => {
    if (item.suffixs.includes(suffix)) {
      type = item.key
      return true
    }
    return false
  })
  return type
}

/**
 * 获取展示图标类型
 */
export const getIconType = (suffix: string) => {
  const list = [
    { key: 'rar', suffixs: ['rar'] },
    { key: 'zip', suffixs: ['zip', 'arj'] },
    {
      key: 'video',
      suffixs: ['mp4', 'mov', 'avi', 'm3u8', 'flv', 'wmv', 'mpg', 'mpeg', 'rm', 'ram', 'swf', 'mkv', 'webm']
    }
  ]
  let type = ''
  list.find((item) => {
    if (item.suffixs.includes(suffix)) {
      type = item.key
      return true
    }
    return false
  })
  if (type) return type

  return getPreviewFileType(suffix)
}
