import { useComponentByjs } from '@jiumu/utils'
import { PreviewProps } from '../type'
import { defineAsyncComponent } from 'vue'

const PreviewImage = defineAsyncComponent(() => import('./index.vue'))

export default function (props: PreviewProps) {
  const comp = useComponentByjs(PreviewImage, {
    name: 'custom-preview-image',
    props: {
      ...props,
      close: () => {
        comp.unmount()
      }
    }
  })
}
