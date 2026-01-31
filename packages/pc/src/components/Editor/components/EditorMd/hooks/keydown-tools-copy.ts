/**
 * @describe: 处理快捷键相关方法
 * @author: cpl
 * @create: 2023-04-24 18:45:31
 */

type P = {
  value: string
  startIndex: number // 此段第一个字符索引
  endIndex: number // 此段最后一个字符索引 包括此段的换行符
  isEndNewline: boolean // 最后一个字符是否为换行符
  isExist: boolean // 此段落是否存在
}
type PReturn = {
  p: P
  pUp: P
  pDown: P
}
/**
 * 获取当前光标 上 下 及本身的段落
 */
export const getP = (value: string, startIndex: number): PReturn => {
  const p = _getP(value, startIndex)
  const pUp = _getP(value, p.startIndex - 1)
  const pDown = _getP(value, p.endIndex + 1)
  return {
    p,
    pUp,
    pDown
  }
}

export const _getP = (value: string, index: number): P => {
  const p = {
    value: '',
    startIndex: -1,
    endIndex: -1,
    isEndNewline: false,
    isExist: false
  }
  if (index >= 0 && index <= value.length) {
    p.isExist = true
    p.startIndex = value.lastIndexOf('\n', index - 1) + 1
    const i2 = value.indexOf('\n', index)
    if (i2 === -1) {
      p.endIndex = value.length
    } else {
      p.endIndex = i2
      p.isEndNewline = true
    }
    let val = ''
    for (let i = p.startIndex; i < p.endIndex; i++) {
      val += value[i]
    }
    p.value = val
  }
  return p
}

type RegOption = {
  value: string
  type?: string
  reg?: string
  prefix?: string
}
/*
 * 判断是否符合指定的格式
 * reg 指定的正则规则
 * type 默认的 reg
 */
export const judgeStartReg = (option: RegOption): boolean => {
  const reg: string | RegExp = option.reg || _regObj[option.type || ''] || ''
  return option.value.search(reg) !== -1
}

/*
 * 判断是否以空格开头，并排除指定的字符
 */
export const judgeStartSpace = (str: string, sym: string = '*,-,+') => {
  const arr = sym.split(',')
  let flag1 = false
  let flag2 = true
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ') flag1 = true
    else {
      if (arr.indexOf(str[i]) !== -1) flag2 = false
      break
    }
  }
  return flag1 && flag2
}

/*
 * 获取指定格式的字符串
 */
export const getStartReg = (option: RegOption): string => {
  const prefix = option.prefix || ''
  let str: string = ''
  const reg: string | RegExp = option.reg || _regObj[option.type || ''] || ''
  const arr = option.value.match(reg)
  if (arr && arr.length) str = arr[0]
  return prefix + str
}

/*
 * 清除指定格式的字符串，并返回格式后的字符串
 */
export const clearStartReg = (option: RegOption): string => {
  const reg: string | RegExp = option.reg || _regObj[option.type || ''] || ''
  return option.value.replace(reg, '')
}

/*
 * 获取指定长度的字符串
 */
export const getSubstring = (value: string, startIndex: number, endIndex?: number): string => {
  if (startIndex < 0 || (endIndex && endIndex < 0)) return ''
  if (endIndex || endIndex === 0) return value.substring(startIndex, endIndex)
  return value.substring(startIndex)
}

/*
 * 查找指定字符出现次数
 */
export const findCountReeg = (value: string, reg = /\n/gi): number => {
  const arr = value.match(reg)
  if (arr && arr.length) return arr.length
  return 0
}

const _regObj: ObjectAny = {
  a1: /^\s*[\*\+-]{1}\s+/g, // 匹配以任意数量空白开头，后跟 *、+ 或 -，再跟一个或多个空白
  a2: /^\s*[\*\+-]{1}\s{1}/g, // 类似 a1，但符号后的空白必须严格为 一个
  a3: /^\s*[\*\+-]{1}\s+$/g, // 匹配整行为空白 + 符号 + 一个或多个空白
  a4: /^\s*[\*\+-]{1}\s{1}$/g, // 类似 a3，但符号后只能有一个空格
  b1: /^\s*\+{1}\s+/g, // 匹配以 + 开头（允许空白前缀），后跟一个或多个空格
  b2: /^\s*\+{1}\s{1}/g, // 类似 b1，但 + 后必须为单空格
  b3: /^\s*\+{1}\s+$/g, // 匹配整行为 + 后跟多个空格的行
  b4: /^\s*\+{1}\s{1}$/g, // 严格匹配 + 后单空格的行尾
  c1: /^\s+/g, // 匹配行首的任意空白（空格、制表符等）
  c2: /^\x20+/g, // 纯空格
  c3: /^\s+$/g // 匹配整行仅为空白（空格、制表符等）
}
