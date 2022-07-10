/**
 * @author chen
 * @description 角色相关接口
 * @update 2022-07-10 13:04:18
 */

import { post } from '@/utils/api-methods'

// 获取我的所有角色列表
export const getRoleListAllSelf = async (): Promise<DataOptions<DataRole[]>> => {
  return await post('/pc/role/get/list/self', { pageSize: 1000 }).catch((err) => err)
}
