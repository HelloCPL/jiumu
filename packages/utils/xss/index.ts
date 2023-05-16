/**
 * 自定义 xss 过滤规则 常用于 v-html 富文本展示
 */

import { FilterXSS, escapeAttrValue } from 'xss'

// 通用属性不过滤
export const onTagAttr = (tag: any, name: any, value: any) => {
  const attribute = [
    'width',
    'height',
    'style',
    'title',
    'bgcolor',
    'background',
    'align',
    'alt',
    'color',
    'border',
    'bordercolor',
    'bordercolorlight',
    'bordercolordark',
    'clos',
    'rows',
    'colspan',
    'rowspan',
    'cellpadding',
    'cellspacing',
    'type',
    'name',
    'size',
    'disabled',
    'checked',
    'readonly',
    'maxlength',
    'hidden',
    'multiple',
    'direction',
    'dir',
    'face',
    'scrollamount',
    'scrolldelay',
    'autostart',
    'startime',
    'volume',
    'controls',
    'usemap',
    'tabindex',
    'accept',
    'draggable'
  ]
  const flag =
    attribute.indexOf('name') !== -1 ||
    name.substr(0, 5) === 'data-' ||
    (tag === 'img' &&
      (name === 'src' || name === 'filter' || name === 'alpha' || name === 'opacity' || name === 'rules')) ||
    ((tag === 'frame' || tag === 'frameset') &&
      (name === 'frameborder' ||
        name === 'framespacing' ||
        name === 'scrolling' ||
        name === 'noresize' ||
        name === 'marginhight' ||
        name === 'marginwidth' ||
        name === 'target')) ||
    (tag === 'marquee' &&
      (name === 'behavior' ||
        name === 'scrollamount' ||
        name === 'scrolldelay' ||
        name === 'scrollheight' ||
        name === 'scrollleft' ||
        name === 'scrolltop' ||
        name === 'truespeed')) ||
    (tag === 'form' &&
      (name === 'action' ||
        name === 'method' ||
        name === 'enctype' ||
        name === 'onsubmit' ||
        name === 'noreset' ||
        name === 'target'))
  if (flag) return name + '="' + escapeAttrValue(value) + '"'
}

export const xss = new FilterXSS({
  css: false,
  onTagAttr,
  escapeHtml: (html) => html
})
