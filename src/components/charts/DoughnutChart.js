import React from 'react'

import { Doughnut } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'

function DoughnutChart({chartData}) {
  return (
    <div>
        <Doughnut
        data={chartData}
        height="220px"
        width="220px"
        options={{ 
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'left'
                }
            }
        }}
        />
    </div>
  )
}

export default DoughnutChart