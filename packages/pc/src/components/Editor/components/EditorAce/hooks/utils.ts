import cMode from 'ace-builds/src-noconflict/mode-c_cpp?url'
import cssMode from 'ace-builds/src-noconflict/mode-css?url'
import htmlMode from 'ace-builds/src-noconflict/mode-html?url'
import vueMode from 'ace-builds/src-noconflict/mode-vue?url'
import javaMode from 'ace-builds/src-noconflict/mode-java?url'
import jsMode from 'ace-builds/src-noconflict/mode-javascript?url'
import jsonMode from 'ace-builds/src-noconflict/mode-json?url'
import markdownMode from 'ace-builds/src-noconflict/mode-markdown?url'
import phpMode from 'ace-builds/src-noconflict/mode-php?url'
import pythonMode from 'ace-builds/src-noconflict/mode-python?url'
import sassMode from 'ace-builds/src-noconflict/mode-sass?url'
import shMode from 'ace-builds/src-noconflict/mode-sh?url'
import textMode from 'ace-builds/src-noconflict/mode-text?url'
import tsMode from 'ace-builds/src-noconflict/mode-typescript?url'
import xmlMode from 'ace-builds/src-noconflict/mode-xml?url'
import chromeTheme from 'ace-builds/src-noconflict/theme-chrome?url'
import eclipseTheme from 'ace-builds/src-noconflict/theme-eclipse?url'
import githubTheme from 'ace-builds/src-noconflict/theme-github?url'
import monokaiTheme from 'ace-builds/src-noconflict/theme-monokai?url'
import terminalTheme from 'ace-builds/src-noconflict/theme-terminal?url'
import TNETheme from 'ace-builds/src-noconflict/theme-tomorrow_night_eighties?url'
import baseWorker from 'ace-builds/src-noconflict/worker-base?url'
import cssWorker from 'ace-builds/src-noconflict/worker-css?url'
import htmlWorker from 'ace-builds/src-noconflict/worker-html?url'
import jsWorker from 'ace-builds/src-noconflict/worker-javascript?url'
import jsonWorker from 'ace-builds/src-noconflict/worker-json?url'
import xmlWorker from 'ace-builds/src-noconflict/worker-xml?url'

/**
 * 主题
 */
const SUPPORTED_THEMES = {
  tomorrow_night_eighties: TNETheme,
  chrome: chromeTheme,
  eclipse: eclipseTheme,
  terminal: terminalTheme,
  monokai: monokaiTheme,
  github: githubTheme
}

export type ThemesKey = keyof typeof SUPPORTED_THEMES

type ThemesReturn = {
  key: ThemesKey
  value: any
}

export const getThemeInfo = (theme: ThemesKey = 'monokai'): ThemesReturn => {
  if (theme in SUPPORTED_THEMES) {
    return {
      key: theme,
      value: SUPPORTED_THEMES[theme as ThemesKey]
    }
  }
  return {
    key: 'monokai',
    value: SUPPORTED_THEMES.monokai
  }
}

export const getThemeKeyData = () => {
  const arr: KeyValue[] = []
  for (const key in SUPPORTED_THEMES) {
    arr.push({
      key,
      value: key
    })
  }
  return arr
}

/**
 * 语言
 */
const SUPPORTED_LANGUAGES = {
  javascript: {
    url: jsMode,
    worker: jsWorker
  },
  typescript: {
    url: tsMode,
    worker: jsWorker,
    workerAlias: 'javascript' // worker 别名
  },
  json: {
    url: jsonMode,
    worker: jsonWorker
  },
  text: {
    url: textMode,
    worker: baseWorker, // 没有对应类型使用默认的 worker
    workerAlias: 'base'
  },
  markdown: {
    url: markdownMode,
    worker: baseWorker,
    workerAlias: 'base'
  },
  html: {
    url: htmlMode,
    worker: htmlWorker
  },
  vue: {
    url: vueMode,
    worker: htmlWorker
  },
  xml: {
    url: xmlMode,
    worker: xmlWorker
  },
  css: {
    url: cssMode,
    worker: cssWorker
  },
  sass: {
    url: sassMode,
    worker: cssWorker,
    workerAlias: 'css'
  },
  java: {
    url: javaMode,
    worker: baseWorker,
    workerAlias: 'base'
  },
  base: {
    url: shMode,
    worker: baseWorker
  },
  python: {
    url: pythonMode,
    worker: baseWorker,
    workerAlias: 'base'
  },
  php: {
    url: phpMode,
    worker: baseWorker,
    workerAlias: 'base'
  },
  c: {
    url: cMode,
    worker: baseWorker,
    workerAlias: 'base'
  }
}

export type LanguagesKey = keyof typeof SUPPORTED_LANGUAGES

type LanguageOption = {
  url: any
  worker: any
  workerAlias?: string
}
type LanguageReturn = {
  key: LanguagesKey
  value: LanguageOption
}

export const getLanguageInfo = (lang: LanguagesKey = 'json'): LanguageReturn => {
  if (lang in SUPPORTED_LANGUAGES) {
    return {
      key: lang,
      value: SUPPORTED_LANGUAGES[lang as LanguagesKey]
    }
  }
  return {
    key: 'json',
    value: SUPPORTED_LANGUAGES.json
  }
}

export const getLanguageKeyData = () => {
  const arr: KeyValue[] = []
  for (const key in SUPPORTED_LANGUAGES) {
    arr.push({
      key,
      value: key
    })
  }
  return arr
}
