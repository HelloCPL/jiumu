/**
 * @description html 预览组件
 * @author cpl
 * @create 2023-04-18 10:32:16
 */

import { EditorWangPreviewProps } from './type'
import { getRandomId } from '@jiumu/utils'
import { createEditor, IDomEditor } from '@wangeditor/editor'
import { nextTick, onUnmounted, watch, ref, computed } from 'vue'
import { TitleCatalogType } from '@/components/Editor/components/EditorWang/components/type'
import { getTitleData } from '@/components/Editor/components/EditorWang/hooks/use-title-catalog'
import gsap from 'gsap'
import $ from 'jquery'
import { useWidth } from '@/hooks/use-width'

export const useIndex = (props: EditorWangPreviewProps) => {
  let editor: IDomEditor | null = null
  const id = ref<string>(getRandomId())

  // 销毁
  const destroyEditor = () => {
    if (editor) {
      editor.destroy()
      editor = null
      id.value = getRandomId()
    }
  }

  // 初始化预览组件
  const initEditorPreview = (html: string) => {
    nextTick(() => {
      destroyEditor()
      editor = createEditor({
        selector: `#editor-preview-${id.value}`,
        html,
        config: {
          readOnly: true,
          autoFocus: false,
          onCreated() {
            findTitleData()
          }
        }
      })
    })
  }

  // 获取标题数据
  const width = ref(0)
  const { width: screenWidth } = useWidth()
  const contentWidth = computed(() => {
    if (screenWidth.value <= 768) return '100%'
    return `calc(100% - ${width.value}px)`
  })
  const previewTitleClass = computed(() => {
    if (screenWidth.value <= 768) {
      return 'h-full absolute top-0 right-0 shadow-lg'
    }
    return ''
  })
  const isReload = ref(false)
  let i = 0
  const titleData = ref<TitleCatalogType[]>([])
  const findTitleData = () => {
    setTimeout(() => {
      if (editor) {
        titleData.value = getTitleData(editor.getElemsByTypePrefix('header'))
        isReload.value = true
        setTimeout(() => {
          isReload.value = false
        }, 100)
      } else if (!editor && i < 5) {
        i++
        findTitleData()
      }
    }, 300)
  }
  const handleTitleItem = (index: number) => {
    if (editor) {
      const item = titleData.value[index]
      const dom = $(`#${item.id}`)
      if (dom && dom.length === 1) {
        dom[0].scrollIntoView({
          behavior: 'smooth'
        })
      }
    }
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

  watch(
    () => props.value,
    (val) => {
      initEditorPreview(val)
    },
    { immediate: true }
  )
  onUnmounted(() => {
    destroyEditor
  })

  return {
    id,
    width,
    contentWidth,
    previewTitleClass,
    isReload,
    titleData,
    handleTitleItem,
    handleClickArrow
  }
}
