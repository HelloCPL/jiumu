/**
 * @describe: 粒子生成器
 * 注意 生成器仅提供方法，具体执行操作放在外部
 * @author: cpl
 * @create: 2023-08-20 16:22:05
 */
import { useThemeStore } from '@/store'

export default class Particle {
  ctx: CanvasRenderingContext2D
  color: string
  x: number
  y: number
  size: number

  constructor(ctx: CanvasRenderingContext2D, color?: string) {
    this.ctx = ctx
    this.color = getColor(color)
    const r = Math.min(ctx.canvas.width, ctx.canvas.height) / 2
    const cx = ctx.canvas.width / 2
    const cy = ctx.canvas.height / 2
    const rad = (getRandom(0, 360) * Math.PI) / 180
    this.x = cx + Math.cos(rad) * r
    this.y = cy + Math.sin(rad) * r
    this.size = getRandom(1, 2)
  }

  draw() {
    this.ctx.beginPath()
    this.ctx.fillStyle = this.color
    this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    this.ctx.fill()
  }

  /**
   * @describe: 移动
   * @author: cpl
   * @param tx 目标 x坐标
   * @param ty 目标 y坐标
   */
  moveTo(tx: number, ty: number) {
    const duration = 500
    const sx = this.x
    const sy = this.y
    const xSpeed = (tx - sx) / duration
    const ySpeed = (ty - sy) / duration
    const startTime = Date.now()
    const _move = () => {
      const t = Date.now() - startTime
      this.x = sx + xSpeed * t
      this.y = sy + ySpeed * t
      if (t >= duration) {
        this.x = tx
        this.y = ty
        return
      }
      requestAnimationFrame(_move)
    }
    _move()
  }
}

function getRandom(min = 0, max = 360): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getColor(color?: string): string {
  color = color || '--jm-color-warning-500'
  if (color.startsWith('--jm-color')) {
    const themeStore = useThemeStore()
    return themeStore.getRootColor(color)
  }
  return color
}
