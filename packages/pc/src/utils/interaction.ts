/**
 * 交互方法集合
 */

import {
  ElMessage,
  MessageParams,
  MessageHandler,
  LoadingOptionsResolved,
  ElLoading,
  LoadingParentElement,
  ElMessageBox,
  ElMessageBoxOptions,
  MessageBoxData
} from 'element-plus'
import { ComponentPublicInstance, ComponentOptionsBase, Ref } from 'vue'

/**
 * 重写 Message 提示
 * 用法跟 ElMessage 保持一致
 */
export const Message = (message: string | MessageParams): MessageHandler => {
  if (typeof message === 'string') {
    const _options: MessageParams = {
      type: 'warning',
      message,
      duration: 2500,
      showClose: true
    }
    return ElMessage(_options)
  } else {
    const _options: MessageParams = Object.assign(
      {
        type: 'warning',
        duration: 2500,
        showClose: true
      },
      message
    )
    return ElMessage(_options)
  }
}

/**
 * 重写 Loading 加载提示
 * 用法跟 ElLoading.service 保持一致
 */
type LoadingOptions = Partial<
  Omit<LoadingOptionsResolved, 'target' | 'parent'> & {
    target: string | HTMLElement
    body: boolean
  }
>
type LoadingReturn = {
  setText: (text: string) => void
  removeElLoadingChild: () => void
  close: () => void
  handleAfterLeave: () => void
  vm: ComponentPublicInstance<
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    false,
    ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>
  >
  $el: HTMLElement
  originalPosition: Ref<string>
  originalOverflow: Ref<string>
  visible: Ref<boolean>
  parent: Ref<LoadingParentElement>
  background: Ref<string>
  svg: Ref<string>
  svgViewBox: Ref<string>
  spinner: Ref<string | boolean>
  text: Ref<string>
  fullscreen: Ref<boolean>
  lock: Ref<boolean>
  customClass: Ref<string>
  target: Ref<HTMLElement>
  beforeClose?: Ref<(() => boolean) | undefined> | undefined
  closed?: Ref<(() => void) | undefined> | undefined
}
export const Loading = (options?: string | LoadingOptions): LoadingReturn => {
  if (!options || typeof options === 'string') {
    const _options: LoadingOptions = {
      text: options || '拼命加载中，请稍后...',
      background: 'var(--jm-color-overlay-lighter)',
      fullscreen: true,
      body: true
    }
    return ElLoading.service(_options)
  } else {
    const _options: LoadingOptions = Object.assign(
      {
        text: '拼命加载中，请稍后...',
        background: 'var(--jm-color-overlay-lighter)',
        fullscreen: true,
        body: true
      },
      options
    )
    return ElLoading.service(_options)
  }
}

/**
 * 重写 Alert 确认提示
 * 配置跟 ElMessageBox.alert 保持一致
 */
export const Alert = (message?: string | ElMessageBoxOptions): Promise<MessageBoxData> => {
  let _options: ElMessageBoxOptions = {
    autofocus: false,
    title: '提示',
    type: 'warning',
    confirmButtonText: '确认',
    closeOnClickModal: false,
    closeOnPressEscape: false,
    draggable: true
  }
  let msg: any = ''
  if (typeof message === 'string') {
    msg = message
  } else {
    msg = message?.message
    _options = Object.assign(_options, message)
  }
  return ElMessageBox.alert(msg, _options)
}

/**
 * 重写 Confirm 取消确认提示
 * 配置跟 ElMessageBox.confirm 保持一致
 */

export const Confirm = (message?: string | ElMessageBoxOptions): Promise<MessageBoxData> => {
  let _options: ElMessageBoxOptions = {
    autofocus: false,
    title: '提示',
    type: 'warning',
    showCancelButton: true,
    cancelButtonText: '取消',
    confirmButtonText: '确认',
    closeOnClickModal: false,
    closeOnPressEscape: false,
    draggable: true
  }
  let msg: any = ''
  if (typeof message === 'string') {
    msg = message
  } else {
    msg = message?.message
    _options = Object.assign(_options, message)
  }
  return ElMessageBox.confirm(msg, _options)
}
