/**
 * @description wang 编辑器标题集合逻辑处理
 * @author cpl
 * @create 2023-04-18 10:41:34
 */

import { ref, watch, onMounted } from 'vue'
import { TitleCatalogProps, TitleCatalogType } from '../components/type'

export const useTitleCatalog = (props: TitleCatalogProps) => {
  const titles = ref<TitleCatalogType[]>([])

  onMounted(() => {
    titles.value = getTitleData(props.headers)
  })

  watch(
    () => props.headers,
    (val) => {
      titles.value = getTitleData(val)
    },
    { deep: true, immediate: true }
  )

  return {
    titles
  }
}

// 格式化处理标题
export function getTitleData(data: any[]): TitleCatalogType[] {
  const titles: TitleCatalogType[] = []
  if (Array.isArray(data)) {
    let min = 4
    const h = ['header1', 'header2', 'header3', 'header4', 'header5']
    data.forEach((item) => {
      const i = h.indexOf(item.type)
      if (item.children && item.children.length && i !== -1) {
        const obj: TitleCatalogType = {
          text: item.children[0].text,
          id: item.id,
          type: item.type,
          indent: i
        }
        titles.push(obj)
        if (i < min) min = i
      }
    })
    titles.forEach((item) => {
      item.indent = item.indent - min
      item.paddingLeft = item.indent * 16 + 'px'
    })
  }

  return titles
}
