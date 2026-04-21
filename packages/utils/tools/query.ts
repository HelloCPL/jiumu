/**
 * 获取 history.state 参数
 */
export const getHistoryState = (key?: string): any => {
  const state = window.history.state || {}
  if (key) return state[key]
  return state
}
