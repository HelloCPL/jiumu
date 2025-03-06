import { ThemeValue, FontFamilyValue, FontSizeValue } from '@/enumerations'

declare global {
  interface ThemeState {
    theme: ThemeValue
    fontSize: FontSizeValue
    fontFamily: FontFamilyValue
    colors: KeyValue<string, string>[]
  }
  
   interface ThemeActions {
    reset: () => void
    toggleFontFamily: (family?: FontFamilyValue) => void
    toggleFontSize: (font?: FontSizeValue) => void
    getRootFontSize: (size: number) => number
    toggleTheme: (theme?: ThemeValue) => void
    getRootColor: (key: string) => string
  }
  
}

