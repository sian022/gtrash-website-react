import React, { useEffect } from 'react'

import { Doughnut } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'

function DoughnutChart({chartData, widthAndHeight}) {
  return (
    <div>
        <Doughnut
        data={chartData}
        height={widthAndHeight}
        width={widthAndHeight}
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