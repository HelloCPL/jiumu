import $ from 'jquery'
import mousewheel from 'jquery-mousewheel'

let isLoadMousewheel = false

export const getJQuery = () => {
  return new Promise((resolve) => {
    if (!window.$) {
      window.$ = $
    }
    if (!window.jQuery) {
      window.jQuery = $
    }
    // 手动挂载 mousewheel
    if (!isLoadMousewheel) {
      if (typeof mousewheel === 'function') {
        mousewheel(window.$)
        isLoadMousewheel = true
      } else if (mousewheel && typeof mousewheel.default === 'function') {
        mousewheel.default(window.$)
        isLoadMousewheel = true
      }
    }
    // 验证是否挂载成功
    if ($.fn?.mousewheel) {
      resolve(true)
    } else {
      resolve(false)
    }
  })
}
