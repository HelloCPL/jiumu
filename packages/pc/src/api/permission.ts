/**
 * @describe: 权限相关接口
 * @author: cpl
 * @create: 2022-07-06 11:48:27
 */
import { get } from '@/utils/api-methods'

// 获取我的权限列表
export const getPermissionListAllSelf = async (): Promise<DataOptions<DataPermission>> => {
  return await get('/pc/permission/get/all/self', { pageSize: 1000 }).catch((err) => err)
}
