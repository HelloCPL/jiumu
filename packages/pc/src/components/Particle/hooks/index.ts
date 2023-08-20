/**
 * @describe: 粒子时间逻辑
 * @author: cpl
 * @create: 2023-08-20 15:51:51
 */
import { ParticleProps } from '../type'
import { ref, onMounted, onUnmounted } from 'vue'
import Particle from './particle'

type Point = [number, number]

export const useIndex = (props: ParticleProps) => {
  const box = ref<HTMLCanvasElement | null>(null)
  let ctx: CanvasRenderingContext2D
  const particles: Particle[] = []
  let text = ''
  let pointsLen = 0

  const clear = () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }

  const getPoints = (): Point[] => {
    const { width, height, data } = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
    const points: Point[] = []
    for (let i = 0; i < width; i += props.gap) {
      for (let j = 0; j < height; j += props.gap) {
        const index = (i + j * width) * 4
        const r = data[index]
        const g = data[index + 1]
        const b = data[index + 2]
        const a = data[index + 3]
        if (r === 0 && g === 0 && b === 0 && a === 255) {
          points.push([i, j])
        }
      }
    }
    return points
  }

  const update = () => {
    const newText = getText()
    if (newText === text) return
    text = newText
    ctx.fillStyle = '#000'
    ctx.textBaseline = 'middle'
    ctx.font = `${props.fontSize * devicePixelRatio}px 'DS-Digital',sans-serif`
    const w = (ctx.canvas.width - ctx.measureText(text).width) / 2
    const h = (ctx.canvas.height + (props.fontSize * 1.5) / 2) / 2
    ctx.fillText(text, w, h)
    const points = getPoints()
    pointsLen = points.length
    clear()
    for (let i = 0; i < pointsLen; i++) {
      let p = particles[i]
      if (!p) {
        p = new Particle(ctx, props.color)
        particles.push(p)
      }
      p.moveTo(points[i][0], points[i][1])
    }
  }

  let frameId: any = null
  const cancelFrame = () => {
    if (frameId) {
      cancelAnimationFrame(frameId)
      frameId = null
    }
  }
  onUnmounted(cancelFrame)

  const draw = () => {
    clear()
    update()
    // 重复利用粒子
    for (let i = 0; i < pointsLen; i++) {
      particles[i].draw()
    }
    frameId = requestAnimationFrame(draw)
  }

  const init = () => {
    ctx = <CanvasRenderingContext2D>box.value?.getContext('2d', {
      willReadFrequently: true
    })
    draw()
  }
  onMounted(init)

  return {
    box
  }
}

function getText(): string {
  return new Date().toTimeString().substring(0, 8)
}
