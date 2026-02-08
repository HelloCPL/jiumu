export interface ParagraphInfo {
  value: string // 当前段落内容
  startIndex: number // 当前段落内容开始索引
  endIndex: number // 当前段落内容最后一个字符索引 +1 的索引（即仅跟着的换行符索引，若不存在则文本长度）
  isEndNewLine: boolean // 当前段落最后一个字符是否为换行符
  isExist: boolean // 当前段落是否存在
}

export interface ParagraphContext {
  p: ParagraphInfo
  pUp: ParagraphInfo
  pDown: ParagraphInfo
}

export interface RegMatchOptions {
  value: string // 文本内容
  type?: RegMatchType // 内置的正则类型
  reg?: string // 自定义的正则类型
  prefix?: string // 要添加的前缀
}

export type RegMatchType =
  | 'unordered-list' // 匹配无序列表(`+-*`)，符号后一个或多个空白（空格、制表符）
  | 'unordered-list-strict' // 匹配严格的无序列表，符号后仅一个空白
  | 'unordered-list-trailing-whitespace' // 整行：无序列表 + 队尾一个或多个空白
  | 'unordered-list-trailing-whitespace-single' // 整行：无序列表 + 队尾仅一个空白
  | 'unordered-list-add' // 同上，但仅限 `+`
  | 'unordered-list-add-strict'
  | 'unordered-list-add-trailing-whitespace'
  | 'unordered-list-add-trailing-whitespace-single'
  | 'leading-whitespace' // 行首一个或多个空白
  | 'leading-space' // 行首一个或多个空格
  | 'blank-line' // 整行为一个或多个空白

const REGEXP_PATTERNS: Record<RegMatchType, RegExp> = {
  'unordered-list': /^\s*[\+\-\*]\s+/g,
  'unordered-list-strict': /^\s*[\+\-\*]\s{1}/g,
  'unordered-list-trailing-whitespace': /^\s*[\+\-\*]\s+$/g,
  'unordered-list-trailing-whitespace-single': /^\s*[\+\-\*]\s{1}$/g,
  'unordered-list-add': /^\s*[\+]\s+/g,
  'unordered-list-add-strict': /^\s*[\+]\s{1}/g,
  'unordered-list-add-trailing-whitespace': /^\s*[\+]\s+$/g,
  'unordered-list-add-trailing-whitespace-single': /^\s*[\+]\s{1}$/g,
  'leading-whitespace': /^\s+/g,
  'leading-space': /^\x20+/g,
  'blank-line': /^\s+$/g
}

export function getParagraphInfo(value: string, index: number): ParagraphInfo {
  const p: ParagraphInfo = {
    value: '',
    startIndex: -1,
    endIndex: -1,
    isEndNewLine: false,
    isExist: false
  }
  if (index >= 0 && index <= value.length) {
    let _start: number
    let _end: number
    if (index === 0) {
      _start = 0
      _end = value.indexOf('\n')
    } else if (value[index - 1] === '\n') {
      _start = index
      _end = value.indexOf('\n', index)
    } else {
      _start = value.lastIndexOf('\n', index - 1) + 1
      _end = value.indexOf('\n', index)
    }
    p.startIndex = _start
    if (_end === -1) {
      p.endIndex = value.length
    } else {
      p.endIndex = _end
      p.isEndNewLine = true
    }
    if (p.startIndex !== -1 && p.startIndex <= p.endIndex) {
      p.value = value.substring(p.startIndex, p.endIndex)
      p.isExist = true
    }
  }
  return p
}

/**
 * 获取当前光标所在行、上一行、下一行的段落信息
 * @params value 文本内容
 * @params startIndex 光标所在起始索引
 */
export function getParagraphContext(value: string, startIndex: number): ParagraphContext {
  const p = getParagraphInfo(value, startIndex)
  const pUp = getParagraphInfo(value, p.startIndex - 1)
  const pDown = getParagraphInfo(value, p.endIndex + 1)
  return {
    p,
    pUp,
    pDown
  }
}

/**
 * 获取光标起始覆盖的多行段落信息
 * @params value 文本内容
 * @params startIndex 光标起始索引
 * @params endIndex 光标结束索引
 */
export function getParagraphLines(value: string, startIndex: number, endIndex: number): ParagraphInfo[] {
  const lines: ParagraphInfo[] = []
  const pStart = getParagraphInfo(value, startIndex)
  const pEnd = getParagraphInfo(value, endIndex)
  let currentPos = pStart.startIndex
  while (currentPos <= pEnd.startIndex) {
    const p = getParagraphInfo(value, currentPos)
    if (p.isExist) {
      lines.push(p)
      currentPos = p.endIndex + 1
    } else {
      break
    }
  }
  return lines
}

/**
 * 判断所给内容是否符合指定的格式
 * @params value 待判断内容
 * @params option?.reg 自定义正则规则或字符串
 * @params option?.type 使用默认的正则类型
 */
export const isMatchReg = (option: RegMatchOptions): boolean => {
  let reg: string | RegExp = ''
  if (option.reg) reg = option.reg
  else if (option.type) reg = REGEXP_PATTERNS[option.type]
  return option.value.search(reg) !== -1
}

/**
 * 判断所给内容是否以空格开头，并排除指定的字符
 * @params value 待判断内容
 * @params sym 排除指定的字符
 */
export const isMatchSpace = (value: string, sym: string = '*,-,+') => {
  const arr = sym.split(',')
  let flag1 = false
  let flag2 = true
  for (let i = 0; i < value.length; i++) {
    if (value[i] === ' ') flag1 = true
    else {
      if (arr.indexOf(value[i]) !== -1) flag2 = false
      break
    }
  }
  return flag1 && flag2
}

/**
 * 获取指定格式的字符串
 * @params option.value 待匹配内容
 * @params option.reg 自定义正则规则或字符串
 * @params option.type 使用默认的正则类型
 * @params option.prefix 匹配成功时要添加的前缀
 */
export const getMatchReg = (option: RegMatchOptions): string => {
  let prefix = ''
  let str: string = ''
  let reg: string | RegExp = ''
  if (option.reg) reg = option.reg
  else if (option.type) reg = REGEXP_PATTERNS[option.type]
  if (reg) {
    const arr = option.value.match(reg)
    if (arr && arr.length) {
      str = arr[0]
      prefix = option.prefix || ''
    }
  }
  return prefix + str
}

/**
 * 替换指定格式的字符串并返回
 * @params option.value 待匹配内容
 * @params option.reg 自定义正则规则或字符串
 * @params option.type 使用默认的正则类型
 * @params replaceValue 要替换的内容，默认 ''
 */
export const replaceMatchReg = (option: RegMatchOptions, replaceValue = '') => {
  let reg: string | RegExp = ''
  if (option.reg) reg = option.reg
  else if (option.type) reg = REGEXP_PATTERNS[option.type]
  if (reg) {
    return option.value.replace(reg, replaceValue)
  }
  return option.value
}

/**
 * 获取指定长度的字符串
 * @params value 所给内容
 * @params startIndex 起始索引（包含），必须 >= 0
 * @params endIndex 结束索引（不包含），可选，若提供则必须 >= 0
 */
export const getSubstring = (value: string, startIndex: number, endIndex?: number): string => {
  if (startIndex < 0 || !Number.isInteger(startIndex)) {
    return ''
  }
  if (endIndex !== undefined) {
    if (endIndex < 0 || !Number.isInteger(endIndex)) {
      return ''
    }
    return value.substring(startIndex, endIndex)
  }
  return value.substring(startIndex)
}

/**
 * 统计字符串中匹配指定正则表达式的次数
 * @param value 源字符串
 * @param reg 用于匹配的正则表达式（必须带 global 标志，否则只匹配一次）
 * @returns 匹配次数
 */
export const countMatchReg = (value: string, reg: RegExp = /\n/g): number => {
  if (!value) return 0
  // 确保正则带有 global 标志，否则 match 只返回第一个匹配
  const globalRegex = reg.global ? reg : new RegExp(reg.source, reg.flags + 'g')
  const matches = value.match(globalRegex)
  return matches ? matches.length : 0
}

/**
 * markdown 内容格式化
 * 1. 所给文本为图片链接，则返回图片格式文本，如 ![http://xxx.png](http://xxx.png)
 * 2. 所给文本为链接，则返回链接格式文本，如 [http://xxx.com](http://xxx.com)
 * 3. 所给文本为特殊内容，转换对应的markdown描述格式
 * 4. 所给文本为普通文本，则返回普通文本格式
 */
export const formatMarkdownText = (text: string) => {
  if (/\s/.test(text)) {
    return {
      type: 'text',
      text
    }
  }
  const imageReg = /^(https?:\/\/[^\s]+\/[^?#]*\.(png|jpg|jpeg|gif|svg))(\?[^#]*)?(#.*)?$/i
  if (imageReg.test(text)) {
    return {
      type: 'image',
      text: `![${text}](${text})`
    }
  }
  const urlReg = /^(https?:\/\/[^\s]+)$/i
  if (urlReg.test(text)) {
    return {
      type: 'url',
      text: `[${text}](${text})`
    }
  }
  return {
    type: 'text',
    text
  }
}
