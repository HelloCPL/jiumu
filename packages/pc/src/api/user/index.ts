/**
 * @author chen
 * @description 用户相关接口
 * @update 2022-07-04 01:07:06
 */

import { post } from '@/utils/api-methods'

/**
 * 注册接口
 */
export const register = async (params: ParamsLogin): Promise<DataOptions<DataToken>> => {
  return await post('/pc/user/register', params, { isloading: true }).catch((err) => err)
}

/**
 * 登录接口
 */
export const login = async (params: ParamsLogin): Promise<DataOptions<DataToken>> => {
  return await post('/pc/user/login', params, { isloading: true }).catch((err) => err)
}

/**
 * 修改本用户信息
 */
export const updateUserBaseSelf = async (
  params: ParamsUpdateUserBaseSelf = {}
): Promise<DataOptions<null>> => {
  return await post('/pc/user/update/base/self', params).catch((err) => err)
}

/**
 * 修改密码
 */
export const updatePasswordSelf = async (params: ParamsUpdatePassword): Promise<DataOptions<null>> => {
  return await post('/pc/user/update/password/self', params).catch((err) => err)
}

/**
 * 获取本用户信息
 */
export const getUserSelf = async (): Promise<DataOptions<DataUserInfo>> => {
  return await post('/pc/user/get/self').catch((err) => err)
}

/**
 * 获取一个用户信息
 * @param isloading 是否显示加载中
 */
export const getUserOne = async (id: string, isloading?: boolean): Promise<DataOptions<DataUserInfo>> => {
  return await post('/pc/user/get/base', { id }, { isloading }).catch((err) => err)
}

/**
 * 获取所有用户列表
 */
export const getUserList = async (params: ParamsUserList = {}): Promise<DataOptions<DataUserInfo[]>> => {
  return await post('/pc/user/get/list', params).catch((err) => err)
}

/**
 * 更新token
 */
export const updateToken = async (tokenRefresh: string): Promise<DataOptions<DataToken>> => {
  return await post(
    '/pc/user/update/token',
    {},
    {
      headers: {
        Authorization: tokenRefresh,
        retransmission: '-1-'
      }
    }
  ).catch((err) => err)
}

/**
 * 退出登录
 */
export const exitUser = async (TokenRefresh?: string): Promise<DataOptions> => {
  return await post('/pc/user/exit', { TokenRefresh }, { showErrorMessage: false }).catch((err) => err)
}

/**
 * 获取用户登录记录列表
 */
export const getLoginInfoList = async (params: ParamsLoginInfo): Promise<DataOptions<DataLoginInfo[]>> => {
  return await post('/pc/login/info/get/list', params).catch((err) => err)
}
