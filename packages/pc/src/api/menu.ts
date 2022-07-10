/**
 * @author chen
 * @description c菜单相关接口
 * @update 2022-07-10 13:04:18
 */

import { post } from '@/utils/api-methods'

// 获取我的所有菜单（树级结构）
export const getMenuAllSelf = async (isTree: string = '1'): Promise<DataOptions<DataMenu[]>> => {
  return await post('/pc/menu/get/all/self', { isTree, pageSize: 1000 }).catch((err) => err)
}
