import { ref, watchEffect } from 'vue'
import { getSvg } from '@/assets/svg'

type Props = {
  name: string
  width?: number | string
  height?: number | string
  fill?: string
}

const render = (props: Props) => {
  const iconSvg = ref<string>('')
  watchEffect(() => {
    iconSvg.value = getSvg(props.name, {
      width: props.width,
      height: props.height,
      fill: props.fill
    })
  })
  return iconSvg.value
}

export default render
