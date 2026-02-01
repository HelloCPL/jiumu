import { computed, ref } from 'vue'

const width = ref(0)

const setWidth = () => {
  width.value = document.documentElement.clientWidth || window.innerWidth
}

setWidth()

window.addEventListener('resize', () => {
  setWidth()
})

const tableFixed = computed(() => {
  if (width.value <= 768) return false
  return 'right'
})

export const useWidth = () => {
  return { width, tableFixed }
}
