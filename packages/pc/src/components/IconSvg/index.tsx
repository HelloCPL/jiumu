import { ref } from 'vue'
import { getSvg } from '@/assets/svg'

type Props = {
  name: string
  width?: number | string
  height?: number | string
  size?: number | string
  fill?: string
}

const render = (props: Props) => {
  const iconSvg = ref<any>(null)
  iconSvg.value = getSvg(props.name, {
    width: props.width || props.size,
    height: props.height || props.size,
    fill: props.fill
  })
  return iconSvg.value
}

export default render
