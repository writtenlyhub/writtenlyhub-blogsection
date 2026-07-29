'use client'

import React from 'react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

export interface DataGraphBlockProps {
  data: {
    title: string
    chartType: 'bar' | 'line' | 'pie'
    xAxisLabel?: string
    yAxisLabel?: string
    dataPoints: { label: string; value: number }[]
  }
}

const COLORS = ['#F97316', '#3B82F6', '#10B981', '#8B5CF6', '#F43F5E', '#EAB308']

export function DataGraphBlock({ data }: DataGraphBlockProps) {
  if (!data?.dataPoints || data.dataPoints.length === 0) return null

  const { title, chartType, xAxisLabel, yAxisLabel, dataPoints } = data

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <BarChart data={dataPoints} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis dataKey="label" stroke="#888" label={{ value: xAxisLabel, position: 'insideBottom', offset: -10, fill: '#888' }} />
            <YAxis stroke="#888" label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', fill: '#888' }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Bar dataKey="value" fill="#F97316" radius={[4, 4, 0, 0]} />
          </BarChart>
        )
      case 'line':
        return (
          <LineChart data={dataPoints} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis dataKey="label" stroke="#888" label={{ value: xAxisLabel, position: 'insideBottom', offset: -10, fill: '#888' }} />
            <YAxis stroke="#888" label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', fill: '#888' }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Line type="monotone" dataKey="value" stroke="#F97316" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
          </LineChart>
        )
      case 'pie':
        return (
          <PieChart>
            <Tooltip
              contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: '#888' }} />
            <Pie
              data={dataPoints}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              nameKey="label"
              label={({ cx, cy, midAngle = 0, innerRadius, outerRadius, value, index }) => {
                const RADIAN = Math.PI / 180;
                const radius = 25 + innerRadius + (outerRadius - innerRadius);
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                return (
                  <text x={x} y={y} fill="#888" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {dataPoints[index].label} ({value})
                  </text>
                );
              }}
            >
              {dataPoints.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        )
      default:
        return null
    }
  }

  return (
    <div className="my-10 w-full rounded-xl border border-outline-variant/30 bg-surface-container-lowest/50 shadow-sm max-w-[85ch] mx-auto lg:mx-0 p-6">
      {title && <h4 className="font-headline-sm font-semibold text-primary mb-6 text-center">{title}</h4>}
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  )
}
