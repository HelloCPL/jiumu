import { buildProps } from '@jiumu/utils'
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
  spanRight: {
    type: Number,
    default: 12
  },
  height: {
    type: String,
    default: '50vh'
  },
  showMore: {
    type: Boolean,
    default: true
  }
} as const)

export type PopupTwoProps = ExtractPropTypes<typeof popupTwoProps>
