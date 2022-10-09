/*
 * aomao 编辑器处理逻辑
 */

import { EditorAoMaoProps, EditorAoMaoEmits } from '../type'
import Engine, { $, EngineInterface, isMobile, removeUnit } from '@aomao/engine'
import { onMounted, onUnmounted, ref } from 'vue'
import { handleEditorAoMapConfig } from './handle-editor-aomao-config'

export const useEditorAoMaoIndex = (props: EditorAoMaoProps, emit: EditorAoMaoEmits) => {
  const refEditorAoMao = ref<HTMLDivElement | null>(null)
  // 编辑器引擎
  const engine = ref<EngineInterface | null>(null)
  // 初始化编辑器
  const initEngine = () => {
    if (refEditorAoMao.value) {
      const engineInstance = new Engine(refEditorAoMao.value, {
        ...handleEditorAoMapConfig()
      })
    }
  }

  onMounted(initEngine)
  onUnmounted(() => {
    if (engine.value) engine.value.destroy()
  })
  return {
    refEditorAoMao,
    engine
  }
}
