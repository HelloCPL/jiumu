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
  console.log('value', value, value.length)
  console.log('startIndex', startIndex)

  const p = _getP(value, startIndex)
  const pUp = _getP(value, p.startIndex - 1)
  const pDown = _getP(value, p.endIndex + 1)

  console.log('p', p)
  console.log('pUp', pUp)
  console.log('pDown', pDown)
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
