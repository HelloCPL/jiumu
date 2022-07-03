/**
 * 返回格式后的路径
 * 如 member/list 或 member/list/ ==> /member/list
 */
export function toPath(...arg: string[]): string {
  const getPath = (path: string) => {
    if (!path) return ''
    if (path.search(/http:\/*$/g) !== -1) {
      path = path.replace(/http:\/*$/g, 'http://')
    }
    if (path.search(/https:\/*$/g) !== -1) {
      path = path.replace(/https:\/*$/g, 'https://')
    }
    if (!path.startsWith('/')) path = '/' + path
    if (path.endsWith('/')) path = path.substring(0, path.length - 1)
    if (path.startsWith('/http:') || path.startsWith('/https:')) path = path.substring(1)
    return path
  }
  return arg.map((item) => getPath(item)).join('')
}
