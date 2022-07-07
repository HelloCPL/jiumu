import { ThemeValue, FontFamilyValue, FontSizeValue } from '@/enumerations'

export interface ThemeColorsOption {
  key: string
  colors: KeyValue<string, string>[]
  desc?: string
}

export interface ThemeState {
  theme: ThemeValue
  fontSize: FontSizeValue
  fontFamily: FontFamilyValue
  colors: ThemeColorsOption[]
}
