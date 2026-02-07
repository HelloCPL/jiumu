/**
 * @description markdown 预览组件逻辑处理
 * @author cpl
 * @create 2023-04-17 09:25:39
 */

import { ref, computed, watch } from 'vue'
import { xss } from '@jiumu/utils'
import { EditorMdPreviewProps } from './type'
import gsap from 'gsap'
import { Message } from '@/utils/interaction'
import { useWidth } from '@/hooks/use-width'

export const useIndex = (props: EditorMdPreviewProps) => {
  const refPreview = ref<any>(null)
  const width = ref(0)
  const { width: screenWidth } = useWidth()
  const contentWidth = computed(() => {
    if (screenWidth.value <= 768) return '100%'
    return `calc(100% - ${width.value}px)`
  })
  const previewTitleClass = computed(() => {
    if (screenWidth.value <= 768) {
      return 'min-h-full absolute top-0 right-0 shadow-lg'
    }
    return ''
  })

  const isReload = ref(false)

  // 获取标题数据
  let i = 0
  const titleData = ref<any[]>([])
  const findTitleData = () => {
    setTimeout(() => {
      if (
        refPreview.value &&
        refPreview.value?.$el?.children.length &&
        refPreview.value?.$el?.children[0].children
      ) {
        const children: any[] = refPreview.value?.$el?.children[0].children || []

        titleData.value = getDomsData(children)
        isReload.value = true
        setTimeout(() => {
          isReload.value = false
        }, 100)
      } else if (!refPreview.value && i < 5) {
        i++
        findTitleData()
      }
    }, 300)
  }
  watch(
    () => props.text,
    (val: string) => {
      if (props.isShowTitle && val) {
        findTitleData()
      }
    },
    {
      immediate: true
    }
  )

  // 点击标题
  const handleTitleItem = (index: number) => {
    const dom = titleData.value[index]
    dom.el.scrollIntoView({
      behavior: 'smooth'
    })
  }

  const handleClickArrow = () => {
    if (width.value === 0) {
      gsap.to(width, {
        value: 220
      })
    } else {
      gsap.to(width, {
        value: 0
      })
    }
  }

  const handleCopySuccess = () => {
    Message({ message: '复制成功', type: 'success' })
  }

  return {
    isReload,
    refPreview,
    width,
    contentWidth,
    previewTitleClass,
    screenWidth,
    titleData,
    handleTitleItem,
    handleClickArrow,
    handleCopySuccess
  }
}

// 获取节点
function getDomsData(doms: any[]): any[] {
  const arr: any[] = []
  const h = ['h1', 'h2', 'h3', 'h4', 'h5']
  let min = 4
  for (let index = 0, len = doms.length; index < len; index++) {
    const item = doms[index]
    const i = h.indexOf(item.localName)
    if (i !== -1) {
      arr.push({
        html: xss.process(item.innerText),
        el: item,
        indent: i
      })
      if (i < min) min = i
    }
  }
  arr.forEach((item) => {
    item.indent = item.indent - min
    const reg = /[-]{2,}/g
    let style = ''
    if (item.indent === 0) {
      style = 'font-weight: 600;'
    }
    const html = item.html.replace(reg, '')
    item.html = `<span style="padding-left: ${item.indent * 16}px; ${style}">${html}</span>`
  })
  return arr
}
