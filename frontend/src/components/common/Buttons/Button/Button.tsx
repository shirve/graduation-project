import React from 'react'
import styles from './Button.module.scss'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  onClick: () => void
  fullWidth?: boolean
}

const Button = ({ children, onClick, fullWidth, ...props }: Props) => {
  return (
    <button
      type={props.type ?? 'button'}
      className={`${styles.button} ${fullWidth && styles.fullWidth}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
