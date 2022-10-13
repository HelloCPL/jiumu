import { buildProps, EmitFn } from '@jiumu/utils'
import { isString } from 'lodash-es'
import { ExtractPropTypes } from 'vue'
import { PropType } from 'vue'

export const tagInfoProps = buildProps({
  id: {
    type: String,
    require: true,
    default: ''
  },
  code: {
    type: String,
    default: ''
  }
} as const)

export type TagInfoProps = ExtractPropTypes<typeof tagInfoProps>

export const tagAddProps = buildProps({
  id: {
    type: String,
    default: ''
  },
  parentCode: {
    type: String,
    default: ''
  },
  options: {
    type: Array as PropType<DataTag[]>,
    default: () => []
  }
} as const)

export type TagAddProps = ExtractPropTypes<typeof tagAddProps>

export const tagAddEmits = {
  close: () => true,
  confirm: (type: 'add' | 'update') => isString(type)
}

export type TagAddEmits = EmitFn<typeof tagAddEmits>
