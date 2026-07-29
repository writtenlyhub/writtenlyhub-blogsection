'use client'

import React from 'react'

export interface TableBlockProps {
  data: {
    title?: string
    columns?: { name: string }[]
    rows?: Record<string, string>[]
  }
}

export function TableBlock({ data }: TableBlockProps) {
  if (!data?.columns || data.columns.length === 0) return null

  return (
    <div className="my-10 w-full overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-lowest/50 shadow-sm max-w-[85ch] mx-auto lg:mx-0">
      {data.title && (
        <div className="bg-surface-container-highest/10 px-6 py-4 border-b border-outline-variant/30">
          <h4 className="font-headline-sm font-semibold text-primary">{data.title}</h4>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-body-md text-on-surface">
          <thead className="bg-surface-container/20 text-on-surface-variant">
            <tr>
              {data.columns.map((col, idx) => (
                <th key={idx} className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">
                  {col.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {data.rows?.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-surface-container-lowest transition-colors">
                {data.columns?.map((_, colIndex) => {
                  const cellValue = row[`col${colIndex + 1}`]
                  return (
                    <td key={colIndex} className="px-6 py-4 whitespace-pre-wrap">
                      {cellValue}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
