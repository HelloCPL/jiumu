/**
 * 文件上传逻辑处理
 */

import { UploadProps } from '../type'
import { ref, computed } from 'vue'

export const useIndex = (props: UploadProps, emit: any) => {
  const _accecp = computed(() => {
    if (props.accept) return props.accept
    else if (props.type === 'image') return 'images/*'
    return ''
  })
  return {
    _accecp
  }
}
