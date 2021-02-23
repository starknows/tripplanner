//戰術圖
import React from 'react'
import { Line } from '@reactchartjs/react-chart.js'

const data = {
  labels: [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
  ],
  datasets: [
    {
      label: '# of Votes',
      data: [22, 48, 18, 27, 13, 30, 52, 59, 53, 43, 32, 24],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
}

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

const LineChart = () => (
  <>
    <div className="header">
      <div className="links"></div>
    </div>
    <Line data={data} options={options} />
  </>
)

export default LineChart
