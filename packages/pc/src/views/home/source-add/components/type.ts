/**
 * @description 组件参数
 * @author cpl
 * @create 2023-03-10 17:17:39
 */

import { buildProps, EmitFn } from '@jiumu/utils'
import { ExtractPropTypes, PropType } from 'vue'
import { isArray } from 'lodash-es'

export const uploadSourceProps = buildProps({
  modelValue: {
    type: Array as PropType<DataSourceLink[]>,
    default: () => []
  }
} as const)

export type UploadSourceProps = ExtractPropTypes<typeof uploadSourceProps>

export const uploadSourceEmit = {
  'update:modelVavlue': (data: DataSourceLink[]) => isArray(data),
  change: (data: DataSourceLink[]) => isArray(data)
}

export type UploadSourceEmit = EmitFn<typeof uploadSourceEmit>
