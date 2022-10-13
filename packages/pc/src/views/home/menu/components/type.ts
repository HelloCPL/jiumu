import { buildProps, EmitFn } from '@jiumu/utils'
import { isString } from 'lodash-es'
import { ExtractPropTypes } from 'vue'
import { PropType } from 'vue'

export const menuInfoProps = buildProps({
  id: {
    type: String,
    require: true,
    default: ''
  },
  label: {
    type: String,
    default: ''
  }
} as const)

export type MenuInfoProps = ExtractPropTypes<typeof menuInfoProps>

export const menuAddProps = buildProps({
  id: {
    type: String,
    default: ''
  },
  parentCode: {
    type: String,
    default: ''
  },
  options: {
    type: Array as PropType<DataMenu[]>,
    default: () => []
  }
} as const)

export type MenuAddProps = ExtractPropTypes<typeof menuAddProps>

export const menuAddEmits = {
  close: () => true,
  confirm: (type: 'add' | 'update') => isString(type)
}

export type MenuAddEmits = EmitFn<typeof menuAddEmits>
