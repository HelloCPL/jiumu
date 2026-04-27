import { isObject } from 'lodash-es'
import { EmitFn, ExtractPropTypes } from 'vue'

export type TitleCatalogType = {
  text: string
  id: string
  type: string
  paddingLeft?: string
  indent: number
}

export const titleCatalogProps = {
  headers: {
    // 标题列表
    type: Array,
    default: () => []
  }
} as const

export type TitleCatalogProps = ExtractPropTypes<typeof titleCatalogProps>

export const titleCatalogEmit = {
  change: (item: TitleCatalogType) => isObject(item)
}

export type TitleCatalogEmit = EmitFn<typeof titleCatalogEmit>
