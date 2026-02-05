/**
 * 弹窗左右两侧组件参数类型
 */

import { buildProps, EmitFn } from '@jiumu/utils'
import { isString } from 'lodash-es'
import { ExtractPropTypes } from 'vue'

export const popupTwoProps = buildProps({
  keyword: {
    // 左侧搜索关键字
    type: String,
    default: ''
  },
  moreLeft: {
    // 左侧是否有更多
    type: Boolean,
    default: false
  },
  showLeftTop: {
    // 是否显示左侧头部
    type: Boolean,
    default: true
  },
  showLeft: {
    // 是否显示左侧
    type: Boolean,
    default: true
  },
  spanLeft: {
    type: Number,
    default: 12
  },
  total: {
    // 右侧总数
    type: Number,
    default: 0
  },
  showDelete: {
    // 右侧是否展示清空按钮
    type: Boolean,
    default: true
  },
  moreRight: {
    // 右侧是否有更多
    type: Boolean,
    default: false
  },
  showRightTop: {
    // 是否显示右侧头部
    type: Boolean,
    default: true
  },
  showRight: {
    // 是否显示右侧
    type: Boolean,
    default: true
  },
  // 右侧栅格数
  spanRight: {
    type: Number,
    default: 12
  },
  // 组件高度
  height: {
    type: String,
    default: '55vh'
  },
  // 是否显示更多
  showMore: {
    type: Boolean,
    default: true
  }
} as const)

export type PopupTwoProps = ExtractPropTypes<typeof popupTwoProps>

export const popupTwoEmits = {
  scrollLeft: () => true,
  scrollRight: () => true,
  'update:keyword': (val: string) => isString(val),
  search: (val: string) => isString(val),
  delete: () => true
}

export type PopupTwoEmits = EmitFn<typeof popupTwoEmits>
