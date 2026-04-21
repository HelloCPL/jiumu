import { storage } from './storage'
/**
 * 获取浏览器id
 * 登录相关接口用到
 */
export function getSSOClientId(): string {
  let clientId = storage.getItem('clientID')
  if (!clientId) {
    clientId = crypto.randomUUID() // 上面的标准函数
    storage.setItem('clientID', clientId)
  }
  return clientId
}

/**
 * 保存浏览器id
 */
export function saveSSOClientId(clientId: string) {
  const invalidClientId = ['null', 'undefined', 'false', '0', 'true']
  if (clientId && !invalidClientId.includes(clientId)) {
    storage.setItem('clientID', clientId)
  }
}
