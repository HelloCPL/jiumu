// 颜色文件输出格式
interface ColorsFile {
  colors: KeyValue<string, KeyValue<number | string, string>[]>[]
  neutralColors: KeyValue<string, string>[]
}

interface KeyValue<T = string, U = any> extends ObjectAny {
  key: T,
  value: U
}
