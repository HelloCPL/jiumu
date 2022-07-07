import { colors, neutralColors } from './color-light'

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
