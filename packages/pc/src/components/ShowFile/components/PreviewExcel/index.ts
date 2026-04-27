import { useComponentByjs } from '@jiumu/utils'
import { PreviewProps } from '../type'
import { defineAsyncComponent } from 'vue'

const PreviewExcel = defineAsyncComponent(() => import('./index.vue'))

export default function (props: PreviewProps) {
  const comp = useComponentByjs(PreviewExcel, {
    name: 'custom-preview-excel',
    props: {
      ...props,
      close: () => {
        comp.unmount()
      }
    }
  })
}
