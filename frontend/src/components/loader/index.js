import React from 'react'
import { Svg } from './elements'

export default function Loader({ size = 16, strokeWidth = 3, dark = false }) {
  const radius = (size - strokeWidth) / 2
  const offset = Math.round(Math.PI * 2 * radius)

  const t = strokeWidth / 2
  const transform = `translate(${t}px, ${t}px)`

  return (
    <Svg height={size} width={size}>
      <style>{`circle { --offset: ${offset}px; }`}</style>
      <circle
        cx={radius}
        cy={radius}
        r={radius}
        stroke={dark ? '#000' : '#fff'}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={offset}
        strokeDashoffset={offset}
        style={{ transform }}
      />
    </Svg>
  )
}
