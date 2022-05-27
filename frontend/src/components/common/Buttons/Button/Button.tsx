import React from 'react'
import './Button.scss'

interface Props {
  children: React.ReactNode
  onClick: () => void
}

const Button = ({ children, onClick }: Props) => {
  return (
    <button type='button' className='default-button' onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
