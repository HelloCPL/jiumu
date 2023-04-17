/**
 * @description markdown 预览组件逻辑处理
 * @author cpl
 * @create 2023-04-17 09:25:39
 */

import { useMarkdownInit } from '@/components/Editor/components/EditorMd/hooks/use-markdown-init'
import { ref, onMounted } from 'vue'
import { xss } from '@jiumu/utils'
import { EditorMdPreviewProps } from './type'

export const useIndex = (props: EditorMdPreviewProps) => {
  useMarkdownInit()

  const refPreview = ref<any>(null)
  const width = ref(220)

  let i = 0
  const titleData = ref<any[]>([])
  const findTitleData = () => {
    setTimeout(() => {
      if (refPreview.value?.$el?.children.length && refPreview.value?.$el?.children[0].children) {
        const children: any[] = refPreview.value?.$el?.children[0].children || []
        titleData.value = getDomsData(children)
      }
      if (!refPreview.value && i < 5) {
        i++
        findTitleData()
      }
    }, 200)
  }
  onMounted(() => {
    if (props.isShowTitle) {
      findTitleData()
    }
  })

  // 点击标题
  const handleTitleItem = (index: number) => {
    const dom = titleData.value[index]
    dom.el.scrollIntoView({
      behavior: 'smooth'
    })
  }

  return {
    refPreview,
    width,
    titleData,
    handleTitleItem
  }
}

// 获取节点
function getDomsData(doms: any[]): any[] {
  const arr: any[] = []
  const h = ['h1', 'h2', 'h3', 'h4', 'h5']
  let min = 4
  doms.forEach((item) => {
    const i = h.indexOf(item.localName)
    if (i !== -1) {
      arr.push({
        html: xss.process(item.innerText),
        el: item,
        indent: i
      })
      if (i < min) min = i
    }
  })
  arr.forEach((item) => {
    item.indent = item.indent - min
    item.html = `<span style="padding-left: ${item.indent * 16}px">${item.html}</span>`
  })

  return arr
}
