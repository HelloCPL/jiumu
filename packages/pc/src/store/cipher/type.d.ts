/*
 * 口令状态相关类型
 */

interface CipherState {
  code: boolean
}

interface CipherAction {
  reset: () => void
  setCode: (bol: boolean) => void
}
