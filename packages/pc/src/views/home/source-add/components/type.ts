/**
 * @description 组件参数
 * @author cpl
 * @create 2023-03-10 17:17:39
 */

import { buildProps, EmitFn } from '@jiumu/utils'
import { ExtractPropTypes, PropType } from 'vue'
import { isArray } from 'lodash-es'

export const uploadSourceProps = buildProps({
  value: {
    type: Array as PropType<Array<DataSourceLink | ParamsSourceLinkAdd>>,
    default: () => []
  }
} as const)

export type UploadSourceProps = ExtractPropTypes<typeof uploadSourceProps>

export const uploadSourceEmit = {
  change: (data: Array<DataSourceLink | ParamsSourceLinkAdd>) => isArray(data)
}

export type UploadSourceEmit = EmitFn<typeof uploadSourceEmit>

// 封面图
export const coverImgProps = buildProps({
  // 内部文件封面图
  coverImg1: {
    type: Object as PropType<DataBaseFile | null>,
    default: null
  },
  // 外部链接封面图
  coverImg2: {
    type: String,
    default: ''
  }
})

export type CoverImgProps = ExtractPropTypes<typeof coverImgProps>

export const coverImgEmit = {
  close: () => true,
  confirm: (file: DataBaseFile | string, type: '1' | '2') => true
}

export type CoverImgEmit = EmitFn<typeof coverImgEmit>
