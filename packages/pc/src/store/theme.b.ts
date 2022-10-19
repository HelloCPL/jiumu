import { ThemeValue, FontFamilyValue, FontSizeValue } from '@/enumerations'

export interface ThemeState {
  theme: ThemeValue
  fontSize: FontSizeValue
  fontFamily: FontFamilyValue
  colors: KeyValue<string, string>[]
}

export interface ThemeActions {
  reset: () => void
  toggleFontFamily: (family?: FontFamilyValue) => void
  toggleFontSize: (font?: FontSizeValue) => void
  getRootFontSize: (size: number) => number
  toggleTheme: (theme?: ThemeValue) => void
  getRootColor: (key: string) => string
}
