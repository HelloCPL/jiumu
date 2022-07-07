import { ThemeValue, FontFamilyValue, FontSizeValue } from '@/enumerations'

export interface ThemeState {
  theme: ThemeValue
  fontSize: FontSizeValue
  fontFamily: FontFamilyValue
  colors: KeyValue<string, KeyValue<number | string, string>[]>[]
}
