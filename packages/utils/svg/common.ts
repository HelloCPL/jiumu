/**
 * 项目常用的 svg 图标
 */

import { VNode } from 'vue'
import { getFileName } from '../tools'

interface SvgVNode extends VNode {
  props: Record<string, any>
}

const svgs: Record<string, SvgVNode> = {}

// 自动导入
const allSvgs = import.meta.glob('./icons/*.tsx', { eager: true })
Object.entries(allSvgs).forEach(([k, v]: [string, any]) => {
  const name = getFileName(k, false)
  if (name && v?.default) {
    svgs[name] = v.default as SvgVNode
  }
})

type SvgOption = {
  width: number | string
  height: number | string
  fill?: string
}

/**
 * 获取指定的 svg 图标
 * @param name 图标名称
 * @param option 配置项
 */
export const getSvg = (name: string, option: SvgOption): VNode => {
  const width = option.width || 14
  const height = option.height || option.width || 14
  const fill = option.fill || 'var(--jm-color-text-lighter)'
  const svg = svgs[name] || ''
  if (svg) {
    svg.props.width = width
    svg.props.height = height
    if (svg.props?.class && !svg.props.class.includes('shrink-0')) {
      svg.props.class += ' shrink-0'
    }
    if (Array.isArray(svg.children)) {
      svg.children.forEach((item: any) => {
        if (item.props) item.props.fill = fill
      })
    }
  }
  return svg as VNode
}

/**
 * ----- 图标集合 -----
 * address 地址
 * api 接口
 * author 作者
 * book 书籍
 * button 按钮
 * close 关闭
 * closeFull 关闭
 * collection 收藏
 * comment 评论
 * copy 复制
 * date 日期
 * delete 删除
 * email 邮箱
 * fontSize 字体大小
 * formatLang 格式化代码
 * fullScreen 全屏
 * github GitHub
 * lang 代码语言
 * like 点赞
 * note 笔记
 * pc 电脑
 * pcManagement 后台管理
 * phone 手机
 * preview 预览
 * professional 职业
 * program 小程序
 * remark 备注
 * role 角色
 * source 数据来源
 * tag 标签
 * theme 主题颜色
 * time 时间
 * title 标题图标
 * unauthorized 无权限
 * wechat 微信
 * word 文字
 */
