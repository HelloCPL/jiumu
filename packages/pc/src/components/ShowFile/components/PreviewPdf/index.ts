import { useComponentByjs } from '@jiumu/utils'
import { PreviewProps } from '../type'
import { defineAsyncComponent } from 'vue'

const PreviewPdf = defineAsyncComponent(() => import('./index.vue'))

export default function (props: PreviewProps) {
  const comp = useComponentByjs(PreviewPdf, {
    name: 'custom-preview-pdf',
    props: {
      ...props,
      close: () => {
        comp.unmount()
      }
    }
  })
}
