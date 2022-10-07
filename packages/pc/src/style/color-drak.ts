/**
 * 暗黑主题颜色
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
 *     --jm-color-[key1]-[key2] 如 --jm-color-info-50
 *     rgb 为真时 --jm-rgb-[key1]-[key2] 如 --jm-rgb-info-50
 *     default 为真时 --jm-color-[key1] 如 --jm-color-info
 */
const colors: KeyValue<string, KeyValue<number | string, string>[]>[] = [
  {
    key: 'info',
    value: [
      { key: 50, value: '#202121', rgb: '32, 33, 33' },
      { key: 100, value: '#2d2d2f', rgb: '45, 45, 47' },
      { key: 200, value: '#393a3c', rgb: '57, 58, 60' },
      { key: 300, value: '#525457', rgb: '82, 84, 87' },
      { key: 400, value: '#6b6d71', rgb: '107, 109, 113' },
      { key: 500, value: '#909399', rgb: '144, 147, 153', default: true, desc: '提示类 info' },
      { key: 600, value: '#a6a9ad', rgb: '166, 169, 173' },
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
      { key: 50, value: '#18222c', rgb: '24, 34, 44' }, // 141414 90
      { key: 100, value: '#1d3043', rgb: '29, 48, 67' }, // 141414 80
      { key: 200, value: '#213d5d', rgb: '33, 61, 93' }, // 141414 70
      { key: 300, value: '#2a598a', rgb: '42, 89, 138' }, // 141414 50
      { key: 400, value: '#3375b9', rgb: '51, 117, 185' }, // 141414 30
      { key: 500, value: '#409EFF', rgb: '64, 158, 255', default: true, desc: '主题颜色 primary' },
      { key: 600, value: '#66b1ff', rgb: '102, 177, 255' }, // white 20
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
      { key: 50, value: '#1c2518', rgb: '28, 37, 24' },
      { key: 100, value: '#25371c', rgb: '37, 55, 28' },
      { key: 200, value: '#2d481f', rgb: '45, 72, 31' },
      { key: 300, value: '#b3e19d', rgb: '179, 225, 157' },
      { key: 400, value: '#4e8e2f', rgb: '78, 142, 47' },
      { key: 500, value: '#67C23A', rgb: '103, 194, 58', default: true, desc: '成功类 success' },
      { key: 600, value: '#85ce61', rgb: '133, 206, 97' },
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
      { key: 50, value: '#292218', rgb: '41, 34, 24' },
      { key: 100, value: '#3e301c', rgb: '62, 48, 28' },
      { key: 200, value: '#533f20', rgb: '83, 63, 32' },
      { key: 300, value: '#7d5b28', rgb: '125, 91, 40' },
      { key: 400, value: '#a77730', rgb: '167, 119, 48' },
      { key: 500, value: '#E6A23C', rgb: '230, 162, 60', default: true, desc: '警告类 warning' },
      { key: 600, value: '#ebb563', rgb: '235, 181, 99' },
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
      { key: 50, value: '#2b1d1d', rgb: '43 29 29' },
      { key: 100, value: '#412626', rgb: '65 38 38' },
      { key: 200, value: '#582e2e', rgb: '88 46 46' },
      { key: 300, value: '#854040', rgb: '133 64 64' },
      { key: 400, value: '#b25252', rgb: '178 82 82' },
      {
        key: 500,
        value: '#F56C6C',
        rgb: '245, 108, 108',
        default: true,
        desc: '错误类 error/danger'
      },
      { key: 600, value: '#f78989', rgb: '247, 137, 137' },
      { key: 8, value: 'rgba(245, 108, 108, 0.8)' },
      { key: 6, value: 'rgba(245, 108, 108, 0.6)' },
      { key: 4, value: 'rgba(245, 108, 108, 0.4)' },
      { key: 2, value: 'rgba(245, 108, 108, 0.2)' },
      { key: 1, value: 'rgba(245, 108, 108, 0.1)' }
    ],
    desc: '红色'
  },
  {
    key: 'purple',
    value: [
      { key: 50, value: '#360861', rgb: '54, 8, 97' },
      { key: 100, value: '#400974', rgb: '64, 9, 116' },
      { key: 200, value: '#520d92', rgb: '82, 13, 146' },
      { key: 300, value: '#5e10a7', rgb: '94, 16, 167' },
      { key: 400, value: '#6d17bd', rgb: '109, 23, 189' },
      {
        key: 500,
        value: '#9333EA',
        rgb: '147, 51, 234',
        default: true,
        desc: '紫色 purple'
      },
      { key: 600, value: '#a959f3', rgb: '169, 89, 243' },
      { key: 8, value: 'rgba(147, 51, 234, 0.8)' },
      { key: 6, value: 'rgba(147, 51, 234, 0.6)' },
      { key: 4, value: 'rgba(147, 51, 234, 0.4)' },
      { key: 2, value: 'rgba(147, 51, 234, 0.2)' },
      { key: 1, value: 'rgba(147, 51, 234, 0.1)' }
    ],
    desc: '紫色'
  },
  {
    key: 'white',
    value: [
      { key: 1, value: 'rgba(20, 20, 20,0.1)' },
      { key: 2, value: 'rgba(20, 20, 20,0.2)' },
      { key: 4, value: 'rgba(20, 20, 20,0.4)' },
      { key: 6, value: 'rgba(20, 20, 20,0.6)' },
      { key: 8, value: 'rgba(20, 20, 20,0.8)' },
      {
        key: 500,
        value: 'rgba(20, 20, 20,1)',
        rgb: '20, 20, 20',
        default: true
      }
    ],
    desc: '白色 作为特殊的主题颜色'
  },
  {
    key: 'black',
    value: [
      { key: 1, value: 'rgba(250, 252, 255,0.1)' },
      { key: 2, value: 'rgba(250, 252, 255,0.2)' },
      { key: 4, value: 'rgba(250, 252, 255,0.4)' },
      { key: 6, value: 'rgba(250, 252, 255,0.6)' },
      { key: 8, value: 'rgba(250, 252, 255,0.8)' },
      {
        key: 500,
        value: 'rgba(250, 252, 255,1)',
        rgb: '250, 252, 255',
        default: true
      }
    ],
    desc: '黑色 作为特殊的主题颜色'
  },
  // 基础颜色不可变 主要兼容element-plus主题 其中黑 白 请用上方颜色
  {
    key: 'basic',
    value: [
      { key: 'black', value: '#000000' },
      { key: 'white', value: '#ffffff' },
      { key: 'transparent', value: 'transparent' }
    ],
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
    value: '#E5EAF3',
    rgb: '229, 234, 243',
    desc: '默认文本颜色 Primary Text'
  },
  {
    key: 'text-light',
    value: '#CFD3DC',
    rgb: '207, 211, 220',
    desc: '提示文本颜色 Regular Text'
  },
  {
    key: 'text-lighter',
    value: '#A3A6AD',
    rgb: '163, 166, 173',
    desc: '注释文本颜色 Secondary Text'
  },
  {
    key: 'text-placeholder',
    value: '#8D9095',
    rgb: '141, 144, 149',
    desc: '输入框未输入状态文本 Placeholder Text'
  },
  {
    key: 'text-disabled',
    value: '#6C6E72',
    rgb: '108, 110, 114',
    desc: '禁用状态文本颜色 Disabled Text'
  },
  {
    key: 'border-darker',
    value: '#636466',
    rgb: '99, 100, 102',
    desc: '二级深色边框颜色 Darker Border'
  },
  {
    key: 'border-dark',
    value: '#58585B',
    rgb: '88, 88, 91',
    desc: '一级深色边框颜色 Dark Border'
  },
  {
    key: 'border-default',
    alias: 'border',
    value: '#4C4D4F',
    rgb: '76, 77, 79',
    desc: '默认边框颜色 Base Border'
  },
  {
    key: 'border-light',
    value: '#414243',
    rgb: '65, 66, 67',
    desc: '一级浅色边框颜色 Light Border'
  },
  {
    key: 'border-lighter',
    value: '#363637',
    rgb: '54, 54, 55',
    desc: '二级浅色边框颜色 Lighter Border'
  },
  {
    key: 'border-light-extra',
    value: '#2B2B2C',
    rgb: '43, 43, 44',
    desc: '特别浅色的边框颜色 Extra-light Border'
  },
  {
    key: 'fill-darker',
    value: '#424243',
    rgb: '66, 66, 67',
    desc: '二级深色填充颜色 Darker Fill'
  },
  {
    key: 'fill-dark',
    value: '#39393A',
    rgb: '57, 57, 58',
    desc: '一级深色填充颜色 Dark Fill'
  },
  {
    key: 'fill-default',
    alias: 'fill',
    value: '#303030',
    rgb: '48, 48, 48',
    desc: '默认填充颜色 Base Fill'
  },
  {
    key: 'fill-light',
    value: '#262727',
    rgb: '38, 39, 39',
    desc: '一级浅色填充颜色 Light Fill'
  },
  {
    key: 'fill-lighter',
    value: '#1D1D1D',
    rgb: '29, 29, 29',
    desc: '一级浅色填充颜色 Lighter Fill'
  },
  {
    key: 'fill-light-extra',
    value: '#191919',
    rgb: '25, 25, 25',
    desc: '特别浅色的填充颜色 Extra-light Fill'
  },
  {
    key: 'fill-blank',
    value: 'transparent',
    desc: '空白填充颜色 Blank Fill'
  },
  {
    key: 'bg-default',
    alias: 'bg',
    value: '#0a0a0a',
    rgb: '10, 10, 10',
    desc: '默认背景颜色 Page Background'
  },
  {
    key: 'bg-white',
    value: '#141414',
    desc: '白色背景颜色 Base Background'
  },
  {
    key: 'bg-overlay',
    value: '#1d1e1f',
    desc: '弹窗页面颜色 Overlay Background'
  },
  {
    key: 'overlay-default',
    alias: 'overlay',
    value: 'rgba(130, 131, 130, .8)',
    desc: '默认黑色遮罩层颜色'
  },
  {
    key: 'overlay-light',
    value: 'rgba(130, 131, 130, .7)',
    desc: '一级浅的黑色遮罩层颜色'
  },
  {
    key: 'overlay-lighter',
    value: 'rgba(130, 131, 130, .5)',
    desc: '二级浅的黑色遮罩层颜色'
  },
  {
    key: 'mask-default',
    alias: 'mask',
    value: 'rgba(0, 0, 0, .8)',
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
