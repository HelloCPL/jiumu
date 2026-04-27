import * as pdfjs from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.js?raw'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

export { pdfjs, pdfjsWorker }
