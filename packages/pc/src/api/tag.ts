/**
 * @author chen
 * @description 标签相关接口
 * @update 2022-07-10 13:04:18
 */

import { post } from '@/utils/api-methods'

// 获取我的所有特殊标签列表
export const getTagAllSelf = async (): Promise<DataOptions<DataTag[]>> => {
  return await post('/pc/tag/get/all/self').catch((err) => err)
}
