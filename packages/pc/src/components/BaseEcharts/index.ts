/**
 * echarts 基础组件逻辑处理
 */

import { computed, ref, watch, onUnmounted } from 'vue'
import { BaseEchartsProps, BaseEchartsEmit } from './type'
import * as echarts from 'echarts/lib/echarts'
// 引入柱状图图表
import { BarChart, LineChart, PieChart, ScatterChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系组件
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent,
  TransformComponent,
  GraphicComponent,
  RadarComponent,
  PolarComponent
} from 'echarts/components'
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  GraphicComponent,
  RadarComponent,
  BarChart,
  PieChart,
  LineChart,
  ScatterChart,
  LegendComponent,
  TitleComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  PolarComponent
])

export const useIndex = (props: BaseEchartsProps, emit: BaseEchartsEmit) => {
  const refChart = ref<HTMLDivElement | null>()
  const w = computed(() => {
    if (Number(props.width)) return Number(props.width) + 'px'
    return props.width
  })
  const h = computed(() => {
    if (Number(props.height)) return Number(props.height) + 'px'
    return props.height
  })

  let chart: any = null

  const resize = () => {
    if (chart) {
      chart.resize({
        width: 'auto',
        height: 'auto'
      })
    }
  }

  const _drawChart = (params: ObjectAny) => {
    chart.clear()
    chart.setOption(params)
    emit('change', chart)
    resize()
  }

  const drawChart = (params = {}) => {
    if (!chart) {
      setTimeout(() => {
        if (!chart) chart = echarts.init(refChart.value, 'chalk')
        _drawChart(params)
      })
    } else _drawChart(params)
  }

  watch(
    () => props.option,
    (val) => {
      drawChart(val)
    },
    { deep: true, immediate: true }
  )

  const dispose = () => {
    if (chart) {
      chart.dispose()
      chart = null
    }
  }
  onUnmounted(dispose)

  return {
    refChart,
    w,
    h
  }
}
