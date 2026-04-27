import { useComponentByjs } from '@jiumu/utils'
import { PreviewProps } from '../type'
import { defineAsyncComponent } from 'vue'

const PreviewWord = defineAsyncComponent(() => import('./index.vue'))

export default function (props: PreviewProps) {
  const comp = useComponentByjs(PreviewWord, {
    name: 'custom-preview-word',
    props: {
      ...props,
      close: () => {
        comp.unmount()
      }
    }
  })
}
