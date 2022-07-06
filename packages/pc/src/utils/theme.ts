/**
 * @author chen
 * @description 修改主题 :root 变量
 * @update 2022-07-06 23:19:00
 */

export const changeRootVar = () => {
  document.documentElement.classList.add('dark')
  document.documentElement.style.setProperty('--theme-blue', 'green')
}
