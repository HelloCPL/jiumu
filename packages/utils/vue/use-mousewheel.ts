import { ref } from 'vue'

export const useMousewheel = () => {
  const refDiv = ref<HTMLDivElement>()
  console.log('window.onmousewheel', window.onmousewheel)
  console.log('document.addEventListener', document.addEventListener)

  return {
    refDiv
  }
}

function addEvent(fn: Function): void {
  if (window.onmousewheel === null) {
    window.addEventListener('onmousewheel', fn)
  } else {
    window.addEventListener('DOMMouseScroll', fn)
  }
}
