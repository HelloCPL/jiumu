import { ref, VNode } from 'vue'
import { getSvg } from '@jiumu/utils'
import { getPx } from '@jiumu/utils'
import { IconSvgBaseProps } from './type'

const render = (props: IconSvgBaseProps) => {
  const iconSvg = ref<VNode | null>(null)
  iconSvg.value = getSvg(props.name!, {
    width: props.width || props.size || getPx(14),
    height: props.height || props.size || getPx(14),
    fill: props.fill
  })
  return iconSvg.value
}

export default render
