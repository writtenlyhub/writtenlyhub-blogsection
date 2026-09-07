'use client'

import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const chartData = [
  { date: '9/4/25', fullDate: 'Thursday, Sept 4', impressions: 4200, clicks: 120 },
  { date: '9/27/25', fullDate: 'Saturday, Sept 27', impressions: 5100, clicks: 155 },
  { date: '10/10/25', fullDate: 'Friday, Oct 10', impressions: 6800, clicks: 210 },
  { date: '10/23/25', fullDate: 'Thursday, Oct 23', impressions: 6100, clicks: 190 },
  { date: '11/5/25', fullDate: 'Wednesday, Nov 5', impressions: 7900, clicks: 310 },
  { date: '11/18/25', fullDate: 'Tuesday, Nov 18', impressions: 10272, clicks: 425 },
  { date: '12/1/25', fullDate: 'Monday, Dec 1', impressions: 12500, clicks: 580 },
  { date: '12/14/25', fullDate: 'Sunday, Dec 14', impressions: 11800, clicks: 510 },
  { date: '12/27/25', fullDate: 'Saturday, Dec 27', impressions: 15400, clicks: 760 },
  { date: '1/9/26', fullDate: 'Friday, Jan 9', impressions: 18200, clicks: 920 },
  { date: '1/22/26', fullDate: 'Thursday, Jan 22', impressions: 22400, clicks: 1250 },
  { date: '2/4/26', fullDate: 'Wednesday, Feb 4', impressions: 28900, clicks: 1850 },
  { date: '2/17/26', fullDate: 'Tuesday, Feb 17', impressions: 34500, clicks: 2400 },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 border border-border-subtle z-50">
        <p className="text-[#6b7280] text-sm font-medium mb-3">{data.fullDate}</p>
        
        {payload.map((entry: any, index: number) => (
          <div key={index} className="mb-2 last:mb-0">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-4 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <p className="text-[#374151] font-bold text-sm capitalize">{entry.name}</p>
            </div>
            <p className="text-2xl font-extrabold text-[#111827] mt-1 ml-3.5">
              {entry.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export function AnalyticsChartBlock() {
  const [activeMetrics, setActiveMetrics] = React.useState({
    clicks: false,
    impressions: true
  })

  const toggleMetric = (metric: 'clicks' | 'impressions') => {
    setActiveMetrics(prev => {
      // Prevent turning off both
      if (prev[metric] && !prev[metric === 'clicks' ? 'impressions' : 'clicks']) {
        return prev;
      }
      return { ...prev, [metric]: !prev[metric] };
    })
  }

  // Determine Y-axis domain max dynamically based on active metrics
  const maxValue = activeMetrics.impressions ? 38000 : 3000;
  const tickValues = activeMetrics.impressions 
    ? [0, 13000, 25000, 38000]
    : [0, 1000, 2000, 3000];

  const yAxisColor = activeMetrics.impressions ? '#fd5a0a' : '#0052cc';

  return (
    <div className="w-full bg-[#fcfcfc] rounded-[32px] p-4 md:p-8 border border-border-subtle shadow-sm relative overflow-hidden">
      {/* Top Labels */}
      <div className="flex items-center gap-4 mb-10 ml-0 md:ml-[70px]">
        <button 
          onClick={() => toggleMetric('clicks')}
          className={`text-sm font-bold px-4 py-1.5 rounded-full shadow-sm transition-all duration-300 cursor-pointer ${
            activeMetrics.clicks 
              ? 'bg-[#0052cc] text-white' 
              : 'bg-transparent text-[#6b7280] hover:bg-gray-100'
          }`}
        >
          Clicks
        </button>
        <button 
          onClick={() => toggleMetric('impressions')}
          className={`text-sm font-bold px-4 py-1.5 rounded-full shadow-sm transition-all duration-300 cursor-pointer ${
            activeMetrics.impressions 
              ? 'bg-[#fd5a0a] text-white' 
              : 'bg-transparent text-[#6b7280] hover:bg-gray-100'
          }`}
        >
          Impressions
        </button>
      </div>

      <div className="relative w-full h-[250px] md:h-[350px]">
        <ResponsiveContainer width="100%" height="100%" className="relative z-10">
          <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }}
              dy={15}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: yAxisColor, fontSize: 14, fontWeight: 700 }}
              ticks={tickValues}
              domain={[0, maxValue]}
              tickFormatter={(value) => value === 0 ? '0' : `${value / 1000}k`}
              dx={-5}
              width={50}
            />
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ stroke: '#d1d5db', strokeWidth: 1, strokeDasharray: '4 4' }}
              isAnimationActive={false}
            />
            
            {activeMetrics.impressions && (
              <Line 
                type="monotone" 
                dataKey="impressions" 
                name="impressions"
                stroke="#fd5a0a" 
                strokeWidth={3} 
                dot={false}
                activeDot={{ r: 6, fill: '#fd5a0a', stroke: '#ffffff', strokeWidth: 3 }}
                animationDuration={1000}
              />
            )}
            
            {activeMetrics.clicks && (
              <Line 
                type="monotone" 
                dataKey="clicks" 
                name="clicks"
                stroke="#0052cc" 
                strokeWidth={3} 
                dot={false}
                activeDot={{ r: 6, fill: '#0052cc', stroke: '#ffffff', strokeWidth: 3 }}
                animationDuration={1000}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
