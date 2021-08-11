import './button.css'

import React from 'react'

export function Button(props: {
  children?: React.ReactChild
  style?: React.CSSProperties
  onClick: (event: React.MouseEvent) => void
  isActive: boolean
}) {
  const { style, children, onClick, isActive } = props
  return (
    <button
      className={`button-primary ${isActive ? 'active' : ''}`}
      style={style}
      onClick={(e) => onClick(e)}
    >
      {children}
    </button>
  )
}
