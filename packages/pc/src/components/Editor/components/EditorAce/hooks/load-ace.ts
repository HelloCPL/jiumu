import ace from 'ace-builds'
import extLanguageTools from 'ace-builds/src-noconflict/ext-language_tools?url'
import { getLanguageInfo, getThemeInfo, LanguagesKey, ThemesKey } from './utils'

ace.config.setModuleUrl('ace/ext-language_tools', extLanguageTools)

const themeLoaded = new Set()
const langLoaded = new Set()
const langWorkerLoaded = new Set()

/**
 * 加载语言
 * @param lang 指定语言
 */
export const loadAceLang = (lang: LanguagesKey) => {
  const langData = getLanguageInfo(lang)
  if (!langLoaded.has(lang)) {
    ace.config.setModuleUrl(`ace/mode/${langData.key}`, langData.value.url)
    langLoaded.add(lang)
  }
  if (!langWorkerLoaded.has(lang)) {
    const workerAlias = langData.value?.workerAlias || langData.key
    ace.config.setModuleUrl(`ace/mode/${workerAlias}_worker`, langData.value.worker)
    langWorkerLoaded.add(workerAlias)
  }
}

export const loadAceTheme = (theme: ThemesKey) => {
  if (!themeLoaded.has(theme)) {
    const themeData = getThemeInfo(theme)
    ace.config.setModuleUrl(`ace/theme/${themeData.key}`, themeData.value)
    themeLoaded.add(themeData.key)
  }
}
