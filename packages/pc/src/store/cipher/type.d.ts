/*
 * 口令状态相关类型
 */

interface CipherState {
  code: string
}

interface CipherAction {
  reset: () => void
  setCode: (code: string) => void
}
