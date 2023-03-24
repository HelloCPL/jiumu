/*
 * 口令状态相关类型
 */

export interface CipherState {
  code: boolean
}

export interface CipherAction {
  reset: () => void
  setCode: (bol: boolean) => void
}
