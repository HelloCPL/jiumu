import { useComponentByjs } from '@jiumu/utils'
import { PreviewCommonProps } from '../type'
import { defineAsyncComponent } from 'vue'

const PreviewCommon = defineAsyncComponent(() => import('./index.vue'))

export default function (props: PreviewCommonProps) {
  const comp = useComponentByjs(PreviewCommon, {
    name: 'custom-preview-common',
    props: {
      ...props,
      close: () => {
        comp.unmount()
      }
    }
  })
}
