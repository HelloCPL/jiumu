import { useComponentByjs } from '@jiumu/utils'
import { PreviewProps } from '../type'
import { defineAsyncComponent } from 'vue'
import { app } from '@/app'
import { getMermaid } from '../../../Editor/components/EditorMd/hooks/load-mermaid'

const PreviewMd = defineAsyncComponent(() => import('./index.vue'))

export default function (props: PreviewProps) {
  getMermaid().then(() => {
    import('../../../Editor/components/EditorMd/hooks/use-markdown-init').then(
      ({ useMarkdownPreviewInit }) => {
        useMarkdownPreviewInit(app)
        const comp = useComponentByjs(PreviewMd, {
          name: 'custom-preview-markdown',
          props: {
            ...props,
            close: () => {
              comp.unmount()
            }
          },
          inheritApp: app
        })
      }
    )
  })
}
