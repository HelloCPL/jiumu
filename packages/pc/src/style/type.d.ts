// 颜色文件输出格式
interface ColorsFile {
  colors: KeyValue<string, KeyValue<number | string, string>[]>[]
  neutralColors: KeyValue<string, string>[]
}
