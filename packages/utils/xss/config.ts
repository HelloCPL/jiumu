/**
 * xss 过滤配置
 */

import { escapeAttrValue, whiteList } from 'xss'
import { getSuffix } from '../tools'

/**
 * 危险的标签直接过滤
 */
const dangerousTags = [
  'script',
  'iframe',
  'object',
  'embed',
  'frame',
  'frameset',
  'meta',
  'link',
  'base',
  'style'
]

/**
 * 通用的安全标签属性白名单
 */
const attributeWhitelist = [
  'width',
  'height',
  'title',
  'bgcolor',
  'align',
  'alt',
  'color',
  'border',
  'colspan',
  'rowspan',
  'cellpadding',
  'cellspacing',
  'type',
  'name',
  'size',
  'disabled',
  'checked',
  'readonly',
  'maxlength',
  'hidden',
  'multiple',
  'direction',
  'dir',
  'face',
  'scrollamount',
  'scrolldelay',
  'autostart',
  'startime',
  'volume',
  'controls',
  'usemap',
  'tabindex',
  'accept',
  'draggable',
  'loading',
  'referrerpolicy',
  'decoding',
  'spellcheck',
  'contenteditable',
  'translate',
  'accesskey'
]

/**
 * 指定标签的安全属性白名单
 */

const tagAttributeWhitelist = [
  {
    tags: ['a'],
    attributeWhitelist: ['href', 'target', 'rel', 'title', 'download', 'hreflang', 'type', 'referrerpolicy']
  },
  {
    tags: ['img'],
    attributeWhitelist: [
      'src',
      'alt',
      'title',
      'width',
      'height',
      'loading',
      'decoding',
      'referrerpolicy',
      'sizes',
      'srcset'
    ]
  },
  {
    tags: ['table', 'thead', 'tbody', 'tfoot', 'tr', 'td', 'th'],
    attributeWhitelist: [
      'border',
      'cellpadding',
      'cellspacing',
      'colspan',
      'rowspan',
      'align',
      'valign',
      'scope',
      'headers'
    ]
  },
  {
    tags: ['form'],
    attributeWhitelist: ['action', 'method', 'enctype', 'target', 'novalidate']
  },
  {
    tags: ['input', 'textarea', 'select', 'button'],
    attributeWhitelist: [
      'name',
      'value',
      'placeholder',
      'required',
      'disabled',
      'readonly',
      'maxlength',
      'minlength',
      'pattern',
      'autocomplete',
      'autofocus',
      'rows',
      'cols',
      'selected',
      'multiple'
    ]
  },
  {
    tags: ['ol', 'ul', 'li'],
    attributeWhitelist: ['type', 'start', 'reversed', 'value']
  },
  {
    tags: ['blockquote'],
    attributeWhitelist: ['cite']
  },
  {
    tags: ['video', 'audio'],
    attributeWhitelist: [
      'src',
      'controls',
      'autoplay',
      'loop',
      'muted',
      'preload',
      'poster',
      'width',
      'height',
      'playsinline'
    ]
  },
  {
    tags: ['source'],
    attributeWhitelist: ['src', 'type', 'srcset', 'sizes', 'media']
  },
  {
    tags: ['details', 'summary'],
    attributeWhitelist: ['open']
  }
]

// 构建标签白名单
export const buildTagWhitelist = () => {
  const newWhitelist: any = {
    ...whiteList
  }
  // 先添加通用属性
  for (const key in newWhitelist) {
    const tag = newWhitelist[key]
    let newTag
    if (Array.isArray(tag)) {
      newTag = tag
    } else if (tag && typeof tag === 'string') {
      newTag = [tag]
    } else {
      newTag = []
    }
    newWhitelist[key] = [...new Set([...newTag, ...attributeWhitelist])]
  }
  // 再添加指定标签的标签
  tagAttributeWhitelist.forEach((config) => {
    config.tags.forEach((tag) => {
      if (newWhitelist[tag]) {
        newWhitelist[tag] = [...new Set([...newWhitelist[tag], ...config.attributeWhitelist])]
      } else {
        newWhitelist[tag] = [...new Set([...attributeWhitelist, ...config.attributeWhitelist])]
      }
    })
  })
  return newWhitelist
}

/**
 * 安全的域名白名单
 */
const safeDomains = [
  'https://www.jiumublog.cn/',
  'data:', // base64图片
  'blob:' // blob数据
]

/**
 * 安全文件类型白名单
 */
const safeFileExtensions = [
  // 图片格式
  'jpg',
  'jpeg',
  'png',
  'gif',
  'webp',
  'bmp',
  'svg',
  'ico',
  'tiff',
  'tif',
  // 文档格式
  'pdf',
  'doc',
  'docx',
  'xls',
  'xlsx',
  'ppt',
  'pptx',
  'txt',
  'md',
  'csv',
  'rtf',
  // 视频格式
  'mp4',
  'webm',
  'ogg',
  'mov',
  'avi',
  'wmv',
  'mkv',
  'm4v',
  'mpeg',
  // 音频格式
  'mp3',
  'wav',
  'ogg',
  'm4a',
  'flac',
  // 压缩文件
  'zip',
  'rar',
  '7z',
  'tar',
  'gz',
  'bz2'
]

/**
 * 检查URL是否在白名单域名内
 * @param url 要检查的URL
 */
const isSafeUrl = (url: string): boolean => {
  if (!url) return false
  if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) {
    return true
  }
  // 检查data URL 只允许图片类型的data URL
  if (url.startsWith('data:')) {
    return url.startsWith('data:image/')
  }
  // 检查blob URL
  if (url.startsWith('blob:')) {
    return true
  }
  // 检查mailto和tel协议
  if (url.startsWith('mailto:') || url.startsWith('tel:')) {
    return true
  }
  // 检查hash链接
  if (url.startsWith('#')) {
    return true
  }
  // 检查是否在白名单域名内
  const isInSafeDomain = safeDomains.some((domain) => {
    if (domain.endsWith('/')) {
      return url.startsWith(domain)
    }
    return url.startsWith(domain + '/')
  })
  if (isInSafeDomain) {
    return true
  }
  //  检查文件扩展名
  const suffix = getSuffix(url)
  if (safeFileExtensions.includes(suffix)) {
    return true
  }
  return false
}

/**
 * 检查样式是否安全
 * @param styleValue 样式值
 */
const isSafeStyle = (styleValue: string): boolean => {
  // 过滤危险的样式表达式
  const dangerousPatterns = [
    /expression\s*\(/i,
    /javascript\s*:/i,
    /vbscript\s*:/i,
    /url\s*\(\s*['"]?\s*javascript:/i,
    /@import/i,
    /behavior\s*:/i,
    /\bcalc\s*\([^)]*--/i // 避免CSS变量注入
  ]
  return !dangerousPatterns.some((pattern) => pattern.test(styleValue))
}

/**
 * tag 标签过滤
 */
export const handleTag = (tag: string) => {
  const lowerTag = tag.toLowerCase()
  if (dangerousTags.includes(lowerTag)) {
    return ''
  }
  // 其他情况交给 xss 内部处理
}

/**
 * 标签属性处理
 */
export const handleTagAttr = (tag: string, name: string, value: string) => {
  // 1. 过滤事件
  if (name.startsWith('on')) {
    return ''
  }
  // 2. 处理data-*属性（允许所有安全的data属性）
  if (name.startsWith('data-')) {
    return `${name}="${escapeAttrValue(value)}"`
  }
  // 3. 处理 style 属性
  if (name === 'style') {
    if (isSafeStyle(value)) {
      return `style="${escapeAttrValue(value)}"`
    }
    return ''
  }
  // 4. 处理 href 和 src 属性
  if (name === 'href' || name === 'src' || name === 'action') {
    if (isSafeUrl(value)) {
      return `${name}="${escapeAttrValue(value)}"`
    }
    return ''
  }
  // 5. 检查通用属性白名单
  if (attributeWhitelist.includes(name)) {
    return `${name}="${escapeAttrValue(value)}"`
  }
  // 6. 检查标签特定属性白名单
  const tagConfig = tagAttributeWhitelist.find((item) => item.tags.includes(tag.toLowerCase()))
  if (tagConfig && tagConfig.attributeWhitelist.includes(name)) {
    return `${name}="${escapeAttrValue(value)}"`
  }
  // 其他情况交给 xss 内部处理
}
