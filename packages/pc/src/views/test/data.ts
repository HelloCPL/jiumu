
import * as echarts from 'echarts/lib/echarts'

export const getBarData = () : ObjectAny => {
  const data = [
    {name: '哈喽单车', value: 90},
    {name: '小黄单车', value: 108},
    {name: '美团单车', value: 80},
    {name: '小橙单车', value: 120}
  ]
  const option = {
    xAxis: {
      data: data.map(item => item.name),
      axisLine: {
        lineStyle: {
          color: '#283946'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 400,
        margin: 12
      }
    },
    yAxis: {
      // y轴
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 400,
        margin: 12
      },
      splitLine: {
        lineStyle: {
          color: '#283946',
          type: 'dashed'
        }
      }
    },grid: {
      // 容器位置
      containLabel: true,
      top: 16,
      right: 16,
      bottom: 16,
      left: 16
    },
    tooltip: {
      // 指示器
      show: true,
      trigger: 'axis',
      axisPointer: {
        type: 'none'
      },
      formatter: (val: any) => {
        const params = val[0].data

        return getHtml('统计', [
          {
            title: params.name,
          value: params.value,
          unit: '次'
          }

        ])
      },
      padding: 0,

    },
    series: [
      {
        name: '每月单车骑乘种类次数',
        type: 'bar',
        barMinWidth: 24,
        barMaxWidth: 30,
        barMinHeight: 5,
        itemStyle: {
          opacity: 0.8,
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#0080b8'
              },
              {
                offset: 1,
                color: 'rgba(0, 206, 253, 0)'
              }
            ])
          }
        },
        data
      }
    ]
  }
  return option
}

/*
 * 获取自定义弹框
 * data [{title, value, unit?}]
 */

export const getHtml = (title: any, data: any[]) => {
  const _title = title
    ? `<div style="padding: 0 8px 10px 8px; margin-bottom: 14px; border-bottom: 1px solid rgba(84, 181, 255, 1);">${title}</div>`
    : ''
  let list = ''
  data.forEach((item) => {
    list += `
    <div style="margin-bottom: 14px; font-size: 16px;">
      <span style="">${item.title ? item.title + '：' : ''}</span>
      <span style="color: rgba(255, 255, 255, .9)">${item.value}</span>
      ${item.unit ? `<span style="color: rgba(255, 255, 255, .9)">${item.unit}</span>` : ''}
    </div>
    `
  })
  return `
  <div style="padding: 16px 16px 2px 16px; min-width: 220px; color: #54B5FF; font-size: 16px; position: relative; border: 1px solid rgba(84, 181, 255, 0.5); background: rgba(0, 9, 45, 0.85)">
    <div style="position: absolute; left: 0; top: 0; width: 100%; height: 6px; border-left: 6px solid rgba(84, 181, 255, 0.5); border-right: 6px solid rgba(84, 181, 255, 0.5);"></div>
    <div style="position: absolute; left: 0; bottom: 0; width: 100%; height: 6px; border-left: 6px solid rgba(84, 181, 255, 0.5); border-right: 6px solid rgba(84, 181, 255, 0.5);"></div>
    ${_title}
    ${list}
  </div>
  `
}