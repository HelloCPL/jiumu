import * as mermaid from 'mermaid'

const Mermaid = mermaid?.default || mermaid
export const getMermaid = () => {
  return new Promise((resolve) => {
    if (!window.mermaid) {
      window.mermaid = Mermaid
    }
    resolve(true)
  })
}
