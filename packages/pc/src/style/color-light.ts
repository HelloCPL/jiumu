/**
 * 明亮主题颜色
 */

import { ThemeColorsOption } from '@/store/theme.interface'

/**
 * 颜色变量，每个色系主要作用功能说明
 * 50 主要用于浅色边框
 * 100 主要用于阴影
 * 200 主要用于背景
 * 300 主要用于边框
 * 400 为该色系的浅色系
 * 500 为该色系的主要色系
 * 600 为该色系的深色系
 */
export const colors: ThemeColorsOption[] = [
  {
    key: 'gray',
    colors: [
      { key: 'gray-50', value: '#EBEEF5', desc: '亮边框' },
      { key: 'gray-100', value: '#e5e7eb', desc: '阴影或背景' },
      { key: 'gray-200', value: '#e4e4e7', desc: '边框' },
      { key: 'gray-300', value: '#909399', desc: '提示文本' },
      { key: 'gray-400', value: '#303133', desc: '主要文本' },
      { key: 'gray-500', value: '#1f2937' }
    ],
    desc: '灰色，仅灰色的50可用'
  },
  {
    key: 'blue',
    colors: [
      { key: 'blue-50', value: '#ecf5ff' },
      { key: 'blue-100', value: '#d9ecff' },
      { key: 'blue-200', value: '#c6e2ff' },
      { key: 'blue-300', value: '#a0cfff' },
      { key: 'blue-400', value: '#79BBFF' },
      { key: 'blue-500', value: '#409EFF', desc: '主题颜色 primary' },
      { key: 'blue-600', value: '#337ECC' }
    ],
    desc: '蓝色'
  },
  {
    key: 'green',
    colors: [
      { key: 'green-50', value: '#f0f9eb' },
      { key: 'green-100', value: '#e1f3d8' },
      { key: 'green-200', value: '#d1edc4' },
      { key: 'green-300', value: '#b3e19d' },
      { key: 'green-400', value: '#95d475' },
      { key: 'green-500', value: '#67C23A', desc: '成功类 success' },
      { key: 'green-600', value: '#529b2e' }
    ],
    desc: '绿色'
  },
  {
    key: 'orange',
    colors: [
      { key: 'orange-50', value: '#fdf6ec' },
      { key: 'orange-100', value: '#faecd8' },
      { key: 'orange-200', value: '#f8e3c5' },
      { key: 'orange-300', value: '#f3d19e' },
      { key: 'orange-400', value: '#eebe77' },
      { key: 'orange-500', value: '#E6A23C', desc: '警告类 warning' },
      { key: 'orange-600', value: '#b88230' }
    ],
    desc: '橙色'
  },
  {
    key: 'red',
    colors: [
      { key: 'red-50', value: '#fef0f0' },
      { key: 'red-100', value: '#fde2e2' },
      { key: 'red-200', value: '#cd3d3' },
      { key: 'red-300', value: '#ab6b6' },
      { key: 'red-400', value: '#89898' },
      { key: 'red-500', value: '#F56C6C', desc: '错误类 error/danger' },
      { key: 'red-600', value: '#c45656' }
    ],
    desc: '红色'
  }
]
