/**
 * 返回指定颜色的透明度值
 */
export function getRgba(r: string, g: string, b: string) {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  return nums.map((num) => {
    return { key: num, value: `rgba(${r}, ${g}, ${b}, 0.${num})` }
  })
}
