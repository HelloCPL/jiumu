/**
 * 动态引入 public 的资源
 */
import { toPath } from '@jiumu/utils'
const { VITE_PUBLIC_PATH } = import.meta.env

/**
 * 动态加载 script 标签
 * @param url 路径
 * @param callback 回调
 */
export function dynamicScriptLoader(url: string, callback?: Function) {
  const script = document.createElement('script')
  if (url.startsWith('http')) {
    script.src = url
  } else {
    script.src = toPath(VITE_PUBLIC_PATH, url)
  }
  // script.async = true
  script.onload = () => {
    callback && callback()
  }
  document.head.appendChild(script)
}

/**
 * 动态加载 link 标签
 */
export function dynamicLinkLoader(url: string, callback?: Function) {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  if (url.startsWith('http')) {
    link.href = url
  } else {
    link.href = toPath(VITE_PUBLIC_PATH, url)
  }
  link.media = 'print'
  link.onload = () => {
    link.media = 'all' // 更改 media 属性以应用样式
    callback && callback()
  }
  document.head.appendChild(link)
}

let isLoadMermaid = false
/**
 * 动态加载 mermaid
 */
export const loadMermaid = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!isLoadMermaid && !window.mermaid?.initialize) {
      dynamicScriptLoader('/lib/mermaid.min.js', () => {
        isLoadMermaid = true
        const flag = window.mermaid?.initialize ? true : false
        resolve(flag)
      })
    } else {
      const flag = window.mermaid?.initialize ? true : false
      resolve(flag)
    }
  })
}

const luckysheetLinks = [
  {
    isLoad: false,
    url: 'https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/css/pluginsCss.css'
  },
  {
    isLoad: false,
    url: 'https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/plugins.css'
  },
  {
    isLoad: false,
    url: 'https://cdn.jsdelivr.net/npm/luckysheet/dist/css/luckysheet.css'
  },
  {
    isLoad: false,
    url: 'https://cdn.jsdelivr.net/npm/luckysheet/dist/assets/iconfont/iconfont.css'
  }
]
/**
 * 动态加载 luckysheet link 资源
 */
export const loadLuckysheetLinks = () => {
  for (let i = 0; i < luckysheetLinks.length; i++) {
    const item = luckysheetLinks[i]
    if (!item.isLoad) {
      dynamicLinkLoader(item.url, () => {
        item.isLoad = true
      })
    }
  }
}

const luckysheetScripts = [
  {
    isLoad: false,
    url: 'https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/js/plugin.js'
  },
  {
    isLoad: false,
    url: 'https://cdn.jsdelivr.net/npm/luckysheet/dist/luckysheet.umd.js'
  }
]
/**
 * 动态加载 luckysheet scripts 资源
 */
export const loadLuckysheetScripts = (): Promise<number> => {
  return new Promise((resolve) => {
    let total = 0
    const r = () => {
      if (total >= luckysheetScripts.length) {
        resolve(total)
      }
    }
    for (let i = 0; i < luckysheetScripts.length; i++) {
      const item = luckysheetScripts[i]
      if (!item.isLoad) {
        dynamicScriptLoader(item.url, () => {
          item.isLoad = true
          ++total
          r()
        })
      } else {
        ++total
        r()
      }
    }
  })
}

let isLoadLuckyexcel = false
/**
 * 动态加载 luckyexcel
 */
export const loadLuckyexcel = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!isLoadLuckyexcel) {
      dynamicScriptLoader('https://cdn.jsdelivr.net/npm/luckyexcel/dist/luckyexcel.umd.js', () => {
        isLoadLuckyexcel = true
        const flag = window.LuckyExcel ? true : false
        resolve(flag)
      })
    } else {
      const flag = window.LuckyExcel ? true : false
      resolve(flag)
    }
  })
}
