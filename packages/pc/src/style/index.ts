import { colors } from './color-light'
import { ThemeValue } from '@/enumerations'

const toggleTheme = (theme: ThemeValue): void => {
  document.documentElement.classList.add('dark')
  document.documentElement.style.setProperty('--theme-blue', 'green')
}

export const getTailwindColors = (): ObjectAny => {
  const cols: ObjectAny = {}
  colors.forEach((item) => {
    if (!cols[item.key]) cols[item.key] = {}
    item.value.forEach((list) => {
      cols[item.key][list.key] = `--jiumu-${item.key}-${list.key}`
    })
  })
  return cols
}
