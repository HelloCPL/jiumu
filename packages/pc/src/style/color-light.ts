/**
 * 明亮主题颜色
 */

import { ColorsFile } from './color.interface'

/**
 * 主题颜色变量 主要用于定义主题色 会直接注入到tailwindcss colors 变量中
 * primary success warning danger info 对标element-plus
 * 50 主要用于浅色边框
 * 100 主要用于阴影
 * 200 主要用于背景
 * 300 主要用于边框
 * 400 为该色系的浅色系
 * 500 为该色系的主要色系
 * 600 为该色系的深色系
 */
const colors: KeyValue<string, KeyValue<number | string, string>[]>[] = [
  {
    key: 'info',
    value: [
      { key: 50, value: '#f4f4f5' },
      { key: 100, value: '#e9e9eb' },
      { key: 200, value: '#dedfe0' },
      { key: 300, value: '#c8c9cc' },
      { key: 400, value: '#b1b3b8' },
      { key: 500, value: '#909399', desc: '提示类 info' },
      { key: 600, value: '#73767a' }
    ],
    desc: '灰色'
  },
  {
    key: 'primary',
    value: [
      { key: 50, value: '#ecf5ff' },
      { key: 100, value: '#d9ecff' },
      { key: 200, value: '#c6e2ff' },
      { key: 300, value: '#a0cfff' },
      { key: 400, value: '#79BBFF' },
      { key: 500, value: '#409EFF', desc: '主题颜色 primary' },
      { key: 600, value: '#337ECC' }
    ],
    desc: '蓝色'
  },
  {
    key: 'success',
    value: [
      { key: 50, value: '#f0f9eb' },
      { key: 100, value: '#e1f3d8' },
      { key: 200, value: '#d1edc4' },
      { key: 300, value: '#b3e19d' },
      { key: 400, value: '#95d475' },
      { key: 500, value: '#67C23A', desc: '成功类 success' },
      { key: 600, value: '#529b2e' }
    ],
    desc: '绿色'
  },
  {
    key: 'warning',
    value: [
      { key: 50, value: '#fdf6ec' },
      { key: 100, value: '#faecd8' },
      { key: 200, value: '#f8e3c5' },
      { key: 300, value: '#f3d19e' },
      { key: 400, value: '#eebe77' },
      { key: 500, value: '#E6A23C', desc: '警告类 warning' },
      { key: 600, value: '#b88230' }
    ],
    desc: '橙色'
  },
  {
    key: 'danger',
    value: [
      { key: 50, value: '#fef0f0' },
      { key: 100, value: '#fde2e2' },
      { key: 200, value: '#fcd3d3' },
      { key: 300, value: '#fab6b6' },
      { key: 400, value: '#f89898' },
      { key: 500, value: '#F56C6C', desc: '错误类 error/danger' },
      { key: 600, value: '#c45656' }
    ],
    desc: '红色'
  },
  {
    key: 'base',
    value: [
      { key: 'white', value: '#ffffff' },
      { key: 'black', value: '#000000' },
      { key: 'transparent', value: 'transparent' }
    ],
    desc: '黑 白 透明'
  }
]

/**
 * 中性色用于文本、背景和边框颜色 不会注入colors 而是作为新的功能类注册
 */
const neutralColors: KeyValue<string, string>[] = [
  {
    key: 'text-default',
    alias: 'text',
    value: '#303133',
    desc: '默认文本颜色 Primary Text'
  },
  {
    key: 'text-light',
    value: '#606266',
    desc: '提示文本颜色 Regular Text'
  },
  {
    key: 'text-lighter',
    value: '#909399',
    desc: '注释文本颜色 Secondary Text'
  },
  {
    key: 'text-placeholder',
    value: '#A8ABB2',
    desc: '输入框未输入状态文本 Placeholder Text'
  },
  {
    key: 'text-disabled',
    value: '#C0C4CC',
    desc: '禁用状态文本颜色 Disabled Text'
  },
  {
    key: 'border-darker',
    value: '#CDD0D6',
    desc: '二级深色边框颜色 Darker Border'
  },
  {
    key: 'border-dark',
    value: '#D4D7DE',
    desc: '一级深色边框颜色 Dark Border'
  },
  {
    key: 'border-default',
    alias: 'border',
    value: '#DCDFE6',
    desc: '默认边框颜色 Base Border'
  },
  {
    key: 'border-light',
    value: '#E4E7ED',
    desc: '一级浅色边框颜色 Light Border'
  },
  {
    key: 'border-lighter',
    value: '#EBEEF5',
    desc: '二级浅色边框颜色 Lighter Border'
  },
  {
    key: 'border-light-extra',
    value: '#F2F6FC',
    desc: '特别浅色的边框颜色 Extra-light Border'
  },
  {
    key: 'fill-darker',
    value: '#E6E8EB',
    desc: '二级深色填充颜色 Darker Fill'
  },
  {
    key: 'fill-dark',
    value: '#EBEDF0',
    desc: '一级深色填充颜色 Dark Fill'
  },
  {
    key: 'fill-default',
    alias: 'fill',
    value: '#F0F2F5',
    desc: '默认填充颜色 Base Fill'
  },
  {
    key: 'fill-light',
    value: '#F5F7FA',
    desc: '一级浅色填充颜色 Light Fill'
  },
  {
    key: 'fill-lighter',
    value: '#FAFAFA',
    desc: '一级浅色填充颜色 Lighter Fill'
  },
  {
    key: 'fill-light-extra',
    value: '#FAFCFF',
    desc: '特别浅色的填充颜色 Extra-light Fill'
  },
  {
    key: 'fill-blank',
    value: '#ffffff',
    desc: '空白填充颜色 Blank Fill'
  },
  {
    key: 'bg-default',
    alias: 'bg',
    value: '#F2F3F5',
    desc: '默认背景颜色 Page Background'
  },
  {
    key: 'bg-white',
    value: '#FFFFFF',
    desc: '白色背景颜色 Base Background'
  },
  {
    key: 'bg-overlay',
    value: '#ffffff',
    desc: '弹窗页面颜色 Overlay Background'
  },
  {
    key: 'overlay-default',
    alias: 'overlay',
    value: 'rgba(0, 0, 0, .8)',
    desc: '默认黑色遮罩层颜色'
  },
  {
    key: 'overlay-light',
    value: 'rgba(0, 0, 0, .7)',
    desc: '一级浅的黑色遮罩层颜色'
  },
  {
    key: 'overlay-lighter',
    value: 'rgba(0, 0, 0, .5)',
    desc: '二级浅的黑色遮罩层颜色'
  },
  {
    key: 'mask-default',
    alias: 'mask',
    value: 'rgba(0, 0, 0, .9)',
    desc: '白色遮罩层颜色'
  },
  {
    key: 'mask-light-extra',
    value: 'rgba(0, 0, 0, .3)',
    desc: '特别浅的白色遮罩层颜色'
  }
]

export default {
  colors,
  neutralColors
} as ColorsFile
