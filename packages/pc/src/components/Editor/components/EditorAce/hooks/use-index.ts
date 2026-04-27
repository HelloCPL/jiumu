import { Ace } from 'ace-builds'
import extBeautify from 'ace-builds/src-noconflict/ext-beautify'
import { computed, ref } from 'vue'
import { EditorAceEmits, EditorAceProps } from '../type'
import { LanguagesKey, ThemesKey } from './utils'
import { useBodyLocked } from '@jiumu/utils'
import { loadAceLang, loadAceTheme } from './load-ace'

export const useIndex = (props: EditorAceProps, emit: EditorAceEmits) => {
  const refEditor = ref<Ace.Editor | null>(null)

  const _lang = ref<LanguagesKey>(props.lang || 'json')
  const _theme = ref<ThemesKey>(props.theme || 'monokai')
  const _options = computed(() => {
    const obj = {
      useWorker: true, // 使用辅助对象
      enableBasicAutocompletion: true, // 启用基本自动完成
      enableSnippets: true, // 启用代码段
      enableLiveAutocompletion: true, // 启用实时自动完成
      showPrintMargin: false,
      tabSize: 2,
      fontSize: 14
    }
    if (props.options) {
      return { ...obj, ...props.options }
    }
    return obj
  })

  const handleLangLoad = () => {
    loadAceLang(_lang.value)
    if (refEditor.value) {
      refEditor.value.session.setMode(`ace/mode/${_lang.value}`)
    }
  }

  const handleThemeLoad = () => {
    loadAceTheme(_theme.value)
    if (refEditor.value) {
      refEditor.value.session.setMode(`ace/theme/${_theme.value}`)
    }
  }

  const changeLang = (key: LanguagesKey) => {
    if (_lang.value !== key) {
      _lang.value = key
      handleLangLoad()
    }
  }

  const changeTheme = (key: ThemesKey) => {
    if (_theme.value !== key) {
      _theme.value = key
      handleThemeLoad()
    }
  }

  const init = (editor: Ace.Editor) => {
    refEditor.value = editor
    setTimeout(() => {
      handleLangLoad()
      handleThemeLoad()
    }, 100)
    if (props.isEmitMounted) {
      emit('change', props.modelValue, editor)
    }
  }

  const beautify = () => {
    if (refEditor.value) {
      try {
        extBeautify.beautify(refEditor.value.session)
      } catch (e) {}
    }
  }

  const updateValue = (value: string) => {
    emit('update:modelValue', value)
    emit('change', value, refEditor.value as Ace.Editor)
  }

  let _isFocus = false
  const focus = (e: any, editor: Ace.Editor) => {
    emit('focus', e.target.value, editor)
    _isFocus = true
  }
  const blur = (e: any, editor: Ace.Editor) => {
    emit('blur', e.target.value, editor)
    beautify()
    _isFocus = false
  }

  const keydown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.keyCode === 83 && _isFocus && !props.readonly) {
      e.preventDefault()
      emit('save', props.modelValue)
    }
  }

  const isFullScreen = ref(false)
  const { lockScroll, unlockScroll } = useBodyLocked()
  const toggleFullScreen = () => {
    isFullScreen.value = !isFullScreen.value
    if (isFullScreen.value) {
      lockScroll()
    } else {
      unlockScroll()
    }
  }

  return {
    refEditor,
    _lang,
    _theme,
    _options,
    changeLang,
    changeTheme,
    init,
    beautify,
    updateValue,
    blur,
    focus,
    keydown,
    isFullScreen,
    toggleFullScreen
  }
}
