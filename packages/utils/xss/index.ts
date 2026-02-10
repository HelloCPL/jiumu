/**
 * 自定义 xss 过滤规则 常用于 v-html 富文本展示
 */

import { FilterXSS } from 'xss'

import { buildTagWhitelist, handleTag, handleTagAttr } from './config'

// 创建安全的XSS过滤器
export const xss = new FilterXSS({
  // 不启用CSS过滤，通过 onTagAttr 过滤
  css: false,
  whiteList: buildTagWhitelist(),
  // 仅过滤配置了的危险标签
  onTag: handleTag,
  onIgnoreTag: handleTag,

  // 属性过滤钩子
  onTagAttr: handleTagAttr,
  onIgnoreTagAttr: handleTagAttr,

  // html 标签不做转换
  escapeHtml: (html) => html
})

export { buildTagWhitelist, handleTag, handleTagAttr }
