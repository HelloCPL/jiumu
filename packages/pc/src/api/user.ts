/**
 * @author chen
 * @description 用户相关接口
 * @update 2022-07-04 01:07:06
 */

import { post } from '@/utils/api-methods'

// 登录接口
export const login = async (params: ParamsLogin): Promise<DataOptions<DataToken>> => {
  return await post('/pc/user/login', params, { isloading: true }).catch((err) => err)
}

// 更新token
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

// 注册接口
export const register = async (params: ParamsLogin): Promise<DataOptions<DataToken>> => {
  return await post('/pc/user/register', params, { isloading: true }).catch((err) => err)
}

// 获取本用户信息
export const getUserSelf = async (): Promise<DataOptions<DataUserInfo>> => {
  return await post('/pc/user/get/self').catch((err) => err)
}
