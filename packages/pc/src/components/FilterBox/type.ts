/**
 * 筛选容器参数类型
 */

import { EmitFn } from '@jiumu/utils'

export const filterBoxEmits = {
  search: () => true,
  reset: () => true
}

export type FilterEmits = EmitFn<typeof filterBoxEmits>
