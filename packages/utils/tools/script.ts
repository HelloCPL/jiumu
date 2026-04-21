
/**
 * 动态加载 script 标签
 * @param url 路径
 * @param callback 回调
 */
export function dynamicScriptLoader(url: string, callback?: Function) {
  const script = document.createElement('script')
  script.src = url
  // script.async = true
  script.onload = () => {
    callback && callback()
  }
  document.head.appendChild(script)
}

/**
 * 动态加载 link 标签
 * @param url 路径
 * @param callback 回调
 */
export function dynamicLinkLoader(url: string, callback?: Function) {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = url
  link.media = 'print'
  link.onload = () => {
    link.media = 'all' // 更改 media 属性以应用样式
    callback && callback()
  }
  document.head.appendChild(link)
}
