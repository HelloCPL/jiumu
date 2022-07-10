/**
 * 明亮主题颜色
 */

import { ColorsFile } from './color.b'

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
 * 生成变量规则
 *   非base
 *     --jm-color-[key1]-[key2] 如 --jm-color-info-50
 *     rgb 为真时 --jm-rgb-[key1]-[key2] 如 --jm-rgb-info-50
 *     default 为真时 --jm-color-[key1] 如 --jm-color-info
 *   base
 *     --jm-color-[key1] 如 --jm-color-white
 *     rgb 为真时 --jm-rgb-[key1] 如 --jm-rgb-white
 */
const colors: KeyValue<string, KeyValue<number | string, string>[]>[] = [
  {
    key: 'info',
    value: [
      { key: 50, value: '#f4f4f5', rgb: '244, 244, 245' },
      { key: 100, value: '#e9e9eb', rgb: '233, 233, 235' },
      { key: 200, value: '#dedfe0', rgb: '222, 223, 224' },
      { key: 300, value: '#c8c9cc', rgb: '200, 201, 204' },
      { key: 400, value: '#b1b3b8', rgb: '177, 179, 184' },
      { key: 500, value: '#909399', rgb: '144, 147, 153', default: true, desc: '提示类 info' },
      { key: 600, value: '#73767a', rgb: '115, 118, 122' },
      { key: 8, value: 'rgba(144, 147, 153, 0.8)' },
      { key: 6, value: 'rgba(144, 147, 153, 0.6)' },
      { key: 4, value: 'rgba(144, 147, 153, 0.4)' },
      { key: 2, value: 'rgba(144, 147, 153, 0.2)' },
      { key: 1, value: 'rgba(144, 147, 153, 0.1)' }
    ],
    desc: '灰色'
  },
  {
    key: 'primary',
    value: [
      { key: 50, value: '#ecf5ff', rgb: '236, 245, 255' },
      { key: 100, value: '#d9ecff', rgb: '217, 236, 255' },
      { key: 200, value: '#c6e2ff', rgb: '198, 226, 255' },
      { key: 300, value: '#a0cfff', rgb: '160, 207, 255' },
      { key: 400, value: '#79BBFF', rgb: '121, 187, 255' },
      { key: 500, value: '#409EFF', rgb: '64, 158, 255', default: true, desc: '主题颜色 primary' },
      { key: 600, value: '#337ECC', rgb: '51 126 204' },
      { key: 8, value: 'rgba(64, 158, 255, 0.8)' },
      { key: 6, value: 'rgba(64, 158, 255, 0.6)' },
      { key: 4, value: 'rgba(64, 158, 255, 0.4)' },
      { key: 2, value: 'rgba(64, 158, 255, 0.2)' },
      { key: 1, value: 'rgba(64, 158, 255, 0.1)' }
    ],
    desc: '蓝色'
  },
  {
    key: 'success',
    value: [
      { key: 50, value: '#f0f9eb', rgb: '240, 249, 235' },
      { key: 100, value: '#e1f3d8', rgb: '225, 243, 216' },
      { key: 200, value: '#d1edc4', rgb: '209, 237, 196' },
      { key: 300, value: '#b3e19d', rgb: '179, 225, 157' },
      { key: 400, value: '#95d475', rgb: '149, 212, 117' },
      { key: 500, value: '#67C23A', rgb: '103, 194, 58', default: true, desc: '成功类 success' },
      { key: 600, value: '#529b2e', rgb: '82, 155, 46' },
      { key: 8, value: 'rgba(103, 194, 58, 0.8)' },
      { key: 6, value: 'rgba(103, 194, 58, 0.6)' },
      { key: 4, value: 'rgba(103, 194, 58, 0.4)' },
      { key: 2, value: 'rgba(103, 194, 58, 0.2)' },
      { key: 1, value: 'rgba(103, 194, 58, 0.1)' }
    ],
    desc: '绿色'
  },
  {
    key: 'warning',
    value: [
      { key: 50, value: '#fdf6ec', rgb: '253, 246, 236' },
      { key: 100, value: '#faecd8', rgb: '250, 236, 216' },
      { key: 200, value: '#f8e3c5', rgb: '248, 227, 197' },
      { key: 300, value: '#f3d19e', rgb: '243, 209, 158' },
      { key: 400, value: '#eebe77', rgb: '238, 190, 119' },
      { key: 500, value: '#E6A23C', rgb: '230, 162, 60', default: true, desc: '警告类 warning' },
      { key: 600, value: '#b88230', rgb: '184, 130, 48' },
      { key: 8, value: 'rgba(230, 162, 60, 0.8)' },
      { key: 4, value: 'rgba(230, 162, 60, 0.6)' },
      { key: 5, value: 'rgba(230, 162, 60, 0.4)' },
      { key: 2, value: 'rgba(230, 162, 60, 0.2)' },
      { key: 1, value: 'rgba(230, 162, 60, 0.1)' }
    ],
    desc: '橙色'
  },
  {
    key: 'danger',
    value: [
      { key: 50, value: '#fef0f0', rgb: '254, 240, 240' },
      { key: 100, value: '#fde2e2', rgb: '253, 226, 226' },
      { key: 200, value: '#fcd3d3', rgb: '252, 211, 211' },
      { key: 300, value: '#fab6b6', rgb: '250, 182, 182' },
      { key: 400, value: '#f89898', rgb: '248, 152, 152' },
      {
        key: 500,
        value: '#F56C6C',
        rgb: '245, 108, 108',
        default: true,
        desc: '错误类 error/danger'
      },
      { key: 600, value: '#c45656', rgb: '196, 86, 86' },
      { key: 8, value: 'rgba(245, 108, 108, 0.8)' },
      { key: 6, value: 'rgba(245, 108, 108, 0.6)' },
      { key: 4, value: 'rgba(245, 108, 108, 0.4)' },
      { key: 2, value: 'rgba(245, 108, 108, 0.2)' },
      { key: 1, value: 'rgba(245, 108, 108, 0.1)' }
    ],
    desc: '红色'
  },
  {
    key: 'white',
    value: [
      { key: 1, value: 'rgba(255,255,255,0.1)' },
      { key: 2, value: 'rgba(255,255,255,0.2)' },
      { key: 4, value: 'rgba(255,255,255,0.4)' },
      { key: 6, value: 'rgba(255,255,255,0.6)' },
      { key: 8, value: 'rgba(255,255,255,0.8)' },
      {
        key: 500,
        value: 'rgba(255,255,255,1)',
        rgb: '255, 255, 255',
        default: true
      }
    ],
    desc: '白色 作为特殊的主题颜色'
  },
  {
    key: 'black',
    value: [
      { key: 1, value: 'rgba(0,0,0,0.1)' },
      { key: 2, value: 'rgba(0,0,0,0.2)' },
      { key: 4, value: 'rgba(0,0,0,0.4)' },
      { key: 6, value: 'rgba(0,0,0,0.6)' },
      { key: 8, value: 'rgba(0,0,0,0.8)' },
      {
        key: 500,
        value: 'rgba(0,0,0,1)',
        rgb: '0, 0, 0',
        default: true
      }
    ],
    desc: '黑色 作为特殊的主题颜色'
  },
  {
    key: 'base',
    value: [{ key: 'transparent', value: 'transparent' }],
    desc: '黑 白 透明'
  }
]

/**
 * 中性色用于文本、背景和边框颜色 不会注入colors 而是作为新的功能类注册
 * 生成变量规则
 *   --jm-color-[alias || key] 如 --jm-color-text --jm-color-text-light
 *   rgb 为真时 --jm-rgb-[key] 如 --jm-rgb-text --jm-rgb-text-light
 */
const neutralColors: KeyValue<string, string>[] = [
  {
    key: 'text-default',
    alias: 'text',
    value: '#303133',
    rgb: '48, 49, 51',
    desc: '默认文本颜色 Primary Text'
  },
  {
    key: 'text-light',
    value: '#606266',
    rgb: '96, 98, 102',
    desc: '提示文本颜色 Regular Text'
  },
  {
    key: 'text-lighter',
    value: '#909399',
    rgb: '144, 147, 153',
    desc: '注释文本颜色 Secondary Text'
  },
  {
    key: 'text-placeholder',
    value: '#A8ABB2',
    rgb: '168, 171, 178',
    desc: '输入框未输入状态文本 Placeholder Text'
  },
  {
    key: 'text-disabled',
    value: '#C0C4CC',
    rgb: '192, 196, 204',
    desc: '禁用状态文本颜色 Disabled Text'
  },
  {
    key: 'border-darker',
    value: '#CDD0D6',
    rgb: '205, 208, 214',
    desc: '二级深色边框颜色 Darker Border'
  },
  {
    key: 'border-dark',
    value: '#D4D7DE',
    rgb: '212, 215, 222',
    desc: '一级深色边框颜色 Dark Border'
  },
  {
    key: 'border-default',
    alias: 'border',
    value: '#DCDFE6',
    rgb: '220, 223, 230',
    desc: '默认边框颜色 Base Border'
  },
  {
    key: 'border-light',
    value: '#E4E7ED',
    rgb: '228, 231, 237',
    desc: '一级浅色边框颜色 Light Border'
  },
  {
    key: 'border-lighter',
    value: '#EBEEF5',
    rgb: '235, 238, 245',
    desc: '二级浅色边框颜色 Lighter Border'
  },
  {
    key: 'border-light-extra',
    value: '#F2F6FC',
    rgb: '242, 246, 252',
    desc: '特别浅色的边框颜色 Extra-light Border'
  },
  {
    key: 'fill-darker',
    value: '#E6E8EB',
    rgb: '230, 232, 235',
    desc: '二级深色填充颜色 Darker Fill'
  },
  {
    key: 'fill-dark',
    value: '#EBEDF0',
    rgb: '235, 237, 240',
    desc: '一级深色填充颜色 Dark Fill'
  },
  {
    key: 'fill-default',
    alias: 'fill',
    value: '#F0F2F5',
    rgb: '240, 242, 245',
    desc: '默认填充颜色 Base Fill'
  },
  {
    key: 'fill-light',
    value: '#F5F7FA',
    rgb: '245, 247, 250',
    desc: '一级浅色填充颜色 Light Fill'
  },
  {
    key: 'fill-lighter',
    value: '#FAFAFA',
    rgb: '250, 250, 250',
    desc: '一级浅色填充颜色 Lighter Fill'
  },
  {
    key: 'fill-light-extra',
    value: '#FAFCFF',
    rgb: '250, 252, 255',
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
    rgb: '242, 243, 245',
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
    value: 'rgba(255, 255, 255, .9)',
    desc: '白色遮罩层颜色'
  },
  {
    key: 'mask-light-extra',
    value: 'rgba(255, 255, 255, .3)',
    desc: '特别浅的白色遮罩层颜色'
  }
]

export default {
  colors,
  neutralColors
} as ColorsFile
