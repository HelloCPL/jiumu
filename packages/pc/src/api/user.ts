/**
 * @author chen
 * @description 用户相关接口
 * @update 2022-07-04 01:07:06
 */

import { post } from '@/utils/api-methods'

// 登录接口
export const login = async (params: LoginParams): Promise<LoginOptions | void> => {
  const res = await post('/pc/user/login', params).catch((err) => err)
  if (res.code === 200) return res.data
}

// 更新token
export const updateToken = async (tokenRefresh: string): Promise<LoginOptions | void> => {
  const res = await post(
    '/pc/user/update/token',
    {},
    {
      headers: {
        Authorization: tokenRefresh,
        retransmission: '-1-'
      }
    }
  ).catch((err) => err)
  if (res.code === 200) return res.data
}
